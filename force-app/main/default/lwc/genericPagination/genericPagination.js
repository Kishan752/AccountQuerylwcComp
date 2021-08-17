import { api, LightningElement } from 'lwc';

export default class GenericPagination extends LightningElement {
    @api lstaccount;
    pageNumber=1;
    pageSize=5;
    @api count;

    connectedCallback(){
        this.handleinit();
    }

    get checkfirst(){
        return this.pageNumber==1?true:false;
    }
    get checkNext(){
        return this.count > this.pageNumber * this.pageSize?false:true;
    }
    
    onFirst(){
        let start=0;
        this.pageNumber=1;
        let end=this.pageSize*this.pageNumber;
        let upperLimit=this.count > end ? end : this.count;
        let data=[];
        for(start;start<upperLimit;start++){
            data.push(this.lstaccount[start]);
        }
        
        let clickEvent = new CustomEvent('sync', { detail: data });
        this.dispatchEvent(clickEvent);
        
    }
    onLast(){
        let end=this.count;
        let start=this.count - this.pageSize;
        let data=[];
        this.pageNumber=Math.ceil(this.count/this.pageSize);
        console.log('page number is'+this.pageNumber);
        console.log(start+' @@@@@ '+end);
        for(start;start<end;start++){
            data.push(this.lstaccount[start]);
        }
        let clickEvent = new CustomEvent('sync', { detail: data });
        this.dispatchEvent(clickEvent);
    } 

    onPrev(){
        let pageNum=this.pageNumber-1;
        let end=this.pageSize*pageNum;
        pageNum-=1;
        let start=this.pageSize*pageNum;
        this.pageNumber-=1;
        console.log(start+' @@@@@ '+end);
        console.log('page number is'+this.pageNumber);

        let data=[];
        for(start;start<end;start++){
            data.push(this.lstaccount[start]);
        }
        let clickEvent = new CustomEvent('sync', { detail: data });
        this.dispatchEvent(clickEvent);
        
    }
    onNext(){
        let start=this.pageSize*this.pageNumber;
        this.pageNumber+=1;
        let end=this.pageSize*this.pageNumber;
        let upperLimit=this.count > end ? end : this.count;
        console.log(start+' @@@@@ '+end);
        let data=[];
        for(start;start<upperLimit;start++){
            data.push(this.lstaccount[start]);
        }
        let clickEvent = new CustomEvent('sync', { detail: data });
        this.dispatchEvent(clickEvent);
    }

    handleinit(){
        console.log('Came to init of pagination');
        //console.log(JSON.stringify(this.lstaccount));
        let data=[];
        let upperLimit=this.count > 5 ? 5 : this.count;
        for(let i=0;i<upperLimit;i++){
            data.push(this.lstaccount[i]);
        }
        
        let clickEvent = new CustomEvent('sync', { detail: data });
        this.dispatchEvent(clickEvent);
       
    }


}