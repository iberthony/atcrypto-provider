import {AtcryptoRequest, requestFactory} from "./request";


export class Paginator{
    response:any
    request:AtcryptoRequest
    data:Array<any>
    firstPageRead:boolean
    dataParser:Function
    private readonly onNextPage:Function
    private readonly hasNextPage:Function
    constructor(request:AtcryptoRequest,response:any,onNextPage:Function,dataParser:Function,hasNextPage:Function) {
        this.request=request
        this.response=response
        this.data=dataParser(response)
        this.firstPageRead=false
        this.onNextPage=onNextPage
        this.dataParser=dataParser
        this.hasNextPage=hasNextPage
    }



    async nextPage(){
        if(!this.hasNextPage(this.response)){
            return []
        }
        const request=await this.onNextPage(this.response)
        const response=await requestFactory(request)
        this.response=response
        this.data=this.dataParser(response)
        return this.data
    }

}
