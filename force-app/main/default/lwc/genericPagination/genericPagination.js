import { api, LightningElement } from 'lwc';

export default class GenericPagination extends LightningElement {
    @api lstaccount;
    pageNumber=1;
    pageSize=5;

    connectedCallback(){
        this.handleinit();
    }

    get checkfirst(){
        return this.pageNumber==1?true:false;
    }

    onNext(){
        let start=this.pageSize*this.pageNumber;
        this.pageNumber+=1;
        let end=this.pageSize*this.pageNumber;
        
        let data=[];
        for(start;start<end;start++){
            data.push(this.lstaccount[start]);
        }
        let clickEvent = new CustomEvent('sync', { detail: data });
        this.dispatchEvent(clickEvent);
    }

    handleinit(){
        console.log('Came to init of pagination');
        //console.log(JSON.stringify(this.lstaccount));
        let data=[];
        for(let i=0;i<5;i++){
            data.push(this.lstaccount[i]);
        }
        
        let clickEvent = new CustomEvent('sync', { detail: data });
        this.dispatchEvent(clickEvent);
       
    }


}