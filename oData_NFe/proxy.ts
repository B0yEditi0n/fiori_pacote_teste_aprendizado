// proxy.ts
const TARGET_URL = Deno.env.get("SAP_SERVER_URL") || ""; 
const USERNAME = Deno.env.get("SAP_USERNAME") || "";
const PASSWORD = Deno.env.get("SAP_PASSWORD") || ""

const server = Deno.serve({
    port: 3000
  },
  async (req)=>{
    const url = new URL(req.url);
    const proxyUrl = TARGET_URL + url.pathname + url.search;

    // 1. Tratamento do Preflight (OPTIONS)
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
      "maxdataserviceversion"
    ]

    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin, // Em produção, mude para seu domínio
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": oAllowHeaderParams.toString(),
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Max-Age": "86400"
        },
      });
    }

    // 2. Redirecionamento da requisição real
    try {
      const headers = new Headers(req.headers);
      headers.set("Host", new URL(TARGET_URL).host); // Ajusta o host para o destino
      headers.set("Authorization", `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`)

      const proxyReq = new Request(proxyUrl, {
        method: req.method,
        headers: headers,
        body: req.body,
        redirect: "follow",
      });

      const response = await fetch(proxyReq);

      // 3. Adiciona os headers de CORS na resposta que volta do servidor real
      const newHeaders = new Headers(response.headers);
      newHeaders.set("Access-Control-Allow-Origin", origin); 

      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      });
    } catch (e: any) {
      return new Response("Erro no Proxy: " + e.message, { status: 502 });
    }
  },
);

console.log(`Proxy rodando em: localhost:${3000}`);

// Remove se isso for hospedado
// new Deno.Command("ui5", {args: ["serve"]}).output();
