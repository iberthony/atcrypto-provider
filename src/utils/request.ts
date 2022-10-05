import axios from "axios";

export interface AtcryptoRequest{
    type:string
    url:string,
    params:any
    headers:any
}
export function requestFactory(request:AtcryptoRequest){
    if(request.type==="get"){
        return axios.get(request.url, {
            params: request.params,
            headers: request.headers as Partial<any>
        }).then(response => response.data)
    }
    throw Error("Request factory doest not support this method")
}
