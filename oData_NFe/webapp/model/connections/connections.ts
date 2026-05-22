
import "dhconsulting/fiori/custom/lib/js-yaml.min";
type tFilter = {key:string, operator:string, value1:any, value2:any};
export { tFilter };

export default class Connection{
    static oConfig = {}
    sServiceUrl: string;

    public async init(): Promise<Connection>{
        if(!(Object.keys(Connection.oConfig).length > 0)){        
            // const parse = await import('npm:@yaml');
            const sCaminhoReal = ( sap.ui.require.toUrl("dhconsulting/fiori/model/config/config.yaml") )
            const bConfigYaml = await (await fetch(sCaminhoReal)).text()
            // @ts-ignore
            Connection.oConfig = jsyaml.load(bConfigYaml)
        }
        return this;
    }

    fnConvertOFilterToHeader = (rgFilter: tFilter[]) : string =>{
        const fnConvertFieldType = (anyField: any)=>{
            switch(anyField.constructor.name){
                case("Date"):
                    return anyField.toISOString().split('T')[0]
                case('Number'):
                    return anyField
                default:
                    // para tipos string, as aspas adicionais
                    // são necessárias
                    return `'${anyField}'`
            }
            
        }

        let sReturn = '';
        for (let nIndex = 0; nIndex < rgFilter.length; nIndex++) {
            const oFilter = rgFilter[nIndex];
            
            if(sReturn){
                sReturn += ' and '
            }

            switch (oFilter.operator.toUpperCase()) {
                case "BT":
                    sReturn += `${oFilter.key} gt ${fnConvertFieldType(oFilter.value1)} and ${oFilter.key} lt ${fnConvertFieldType(oFilter.value2)}`;
                    break;
            
                default:
                    sReturn += `${oFilter.key} ${oFilter.operator} ${fnConvertFieldType(oFilter.value1)}`;
                    break;
            }   

        }           
        return '?' + new URLSearchParams({
            $filter: sReturn,
            // $top: '10'
        }).toString()
    }   

    httpParansUrl(sPoint: string, sMethod: string){
        const oPoint = (Connection.oConfig as any)[sPoint];
        return {
            sUrl: oPoint["urlprfix"], 
            oPrefix: oPoint[sMethod]
        };
    }

    async getUrlData(sPoint: string, sCondFilter: string | undefined, rgCondFilter: tFilter[] = []){
        const { sUrl, oPrefix } = this.httpParansUrl(sPoint, "GET")
        const oRequestData = new Request(
            `${sUrl}${oPrefix["PATH"]}${sCondFilter || this.fnConvertOFilterToHeader(rgCondFilter)}`, 
            { method: "GET" }

        )

        const oResponse = await fetch(oRequestData)
        return await oResponse.json();    
    }

    // async postUrlData(){
    //     const oRequestData = new Request(
    //         // `${this.sServiceUrl}${endPoint}${this.fnConvertOFilterToHeader(rgCondFilter)}`, 
    //         // { method: "GET" }
    //     )
    // }
}