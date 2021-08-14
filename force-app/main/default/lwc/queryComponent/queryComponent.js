import { LightningElement, track } from 'lwc';
import getMetadata from '@salesforce/apex/queryComponentController.getMetadata'; 
import searchAccount from '@salesforce/apex/queryComponentController.searchAccount'; 

export default class QueryComponent extends LightningElement {

    @track tableHeaders;
    @track querycount=[1];
    @track respData;
    @track renderIterator=false;
    btnDisabled=false;
    condition='1';
    @track queryList=[{serialNumber:'1',objectName:'',fieldName:'',Operator:'',value:''}]

    connectedCallback(){
        this.handleinit();
    }
    changehandler(event){
        this.condition=event.target.value;
    }

    handleinit(){
        getMetadata().then(data =>{

            this.respData=data.mapqueryfields;
            console.log(this.respData);
            this.tableHeaders=data.tableHeaders;
            console.log(JSON.stringify(this.tableHeaders));
            console.log(JSON.stringify(data));
            this.renderIterator=true;
        }).catch(error => {


        }); 
    }

    handleAddAttribute(){
        let len=this.querycount.length;
        if(len<5){
            this.querycount.push(++len);
            this.queryList.push({serialNumber:''+len,objectName:'',fieldName:'',Operator:'',value:''});
            this.condition+=" and "+len;
            if(len>=5){
                this.btnDisabled=true;
            }
        }
    }
    handleFilter(event){
        console.log('came to handleFilter');
        //console.log(JSON.stringify(event.detail));
        for(var i=0;i<this.queryList.length;i++){
            if(event.detail.serialNumber==this.queryList[i].serialNumber){
                this.queryList[i].objectName=event.detail.objectName;
                this.queryList[i].fieldName=event.detail.fieldName;
                this.queryList[i].Operator=event.detail.Operator;
                this.queryList[i].value=event.detail.value;
            }
        }

        console.log(JSON.stringify(this.queryList));

    }

    executeQuery(){
        searchAccount({
            queryJson:JSON.stringify(this.queryList),
            logic:this.condition
        }).then(data =>{

        }).catch(error =>{

        });
    }

}