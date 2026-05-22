// proxy.ts
const TARGET_URL = Deno.env.get("SAP_SERVER_URL") || ""; 
const USERNAME = Deno.env.get("SAP_USERNAME") || "";
const PASSWORD = Deno.env.get("SAP_PASSWORD") || ""
const PORT = Deno.env.get("API_PORTE");

let oToken = { 
  token: "",
  cookie: ""
};

const server = Deno.serve({ port: Number.parseInt(PORT as string) || 3000
  },
  async (req)=>{
    const url = new URL(req.url);
    const proxyUrl = TARGET_URL + url.pathname + url.search;

    //
    // Requisição do Options
    //
    const origin = req.headers.get("origin") || "http://localhost:8080";

    const oAllowHeaderParams = [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-CSRF-Token",
      "Accept",
      "sap-contextid-accept",
      "sap-client",
      "sap-language", 
      "x-sap-cp-session-timeout", 
      "sap-cancel-on-close",
      "maxdataserviceversion",

      // Data response
      "mime-version",
      "odata-maxversion",
      "odata-version"
    ]

    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin, // Em produção, mude para seu domínio
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, PUT, OPTIONS",
          "Access-Control-Allow-Headers": oAllowHeaderParams.toString(),
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Max-Age": "86400"
        },
      });
    }

    //
    // Redirecionamento da Requisição
    //
    try {
      const oResponse :{ body: typeof req.body, header: Headers } 
      = { body: null, header: new Headers()};

      const headers = new Headers(req.headers);
      headers.set("Host", new URL(TARGET_URL).host); // Ajusta o host para o destino
      headers.set("Authorization", `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`)
      headers.set("Accept", "application/json")
      
      if ( !!headers.get("x-csrf-token") == false && oToken.token) {
        headers.set("x-csrf-token", oToken.token);
        headers.set("set-cookie", oToken.cookie);
        
      }
 
      const proxyReq = new Request(proxyUrl, {
        method: req.method,
        headers: headers,
        body: req.body,
        redirect: "follow",
      });

      let response = await fetch(proxyReq);
      oResponse.body = response.body;

      // 3. Adiciona os headers de CORS na resposta que volta do servidor real
      const newHeaders = new Headers(response.headers);
      newHeaders.set("Access-Control-Allow-Origin", origin); 

      if(req.method != "GET" && (response.status === 403 || response.status === 401)){
        // trata o x-csrf-token
        const oHeadersFetch = new Headers();
        oHeadersFetch.set("x-csrf-token", "fetch")
        oHeadersFetch.set("Authorization", `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`)
        // Adicionais 
        oHeadersFetch.set("content-type", 'application/atom+xml')
        oHeadersFetch.set("x-requested-with", 'XMLHttpRequest')

        const oFetchResp = await fetch(
            new Request(proxyUrl, {
              method: "HEAD",
              headers: oHeadersFetch,
            }
          )
        );

        oToken.token = oFetchResp.headers.get("x-csrf-token") || "";
        oToken.cookie = oFetchResp.headers.get("set-cookie") || "";

        // Ajusta a requisição
        const authHeaders = new Headers(req.headers);
        headers.delete("x-csrf-token")
        headers.delete("Cookie")
        headers.set("x-csrf-token", oToken.token)
        headers.set("Cookie", oToken.cookie)
        const authReq = await fetch(
          new Request(proxyUrl, {
            method: req.method,
            headers: headers,
        })); 

        return new Response(authReq.body, {
        status: authReq.status,
        headers: newHeaders,
        
      });;
      }

      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      });
    } catch (e: any) {
      return new Response("Erro no Proxy: " + e.message, { status: 502 });
    }
  },
);

console.log(`Proxy rodando em: localhost:${PORT}`);

