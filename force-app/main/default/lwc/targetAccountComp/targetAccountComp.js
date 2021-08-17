import { LightningElement,track } from 'lwc';
import heading from '@salesforce/label/c.Account_filter';
import searchAccount from '@salesforce/apex/queryComponentController.searchAccount'; 


export default class TargetAccountComp extends LightningElement {
    label = {
        heading
        
    };
    @track queryList;
    condition;
    @track respData;
    @track lstAccount;
    StrMsg;
    renderPagination=false;
    renderTable=false;
    @track data=[];
    recCount;


    executeQuery(){
        console.log('Came to get Query');
        this.queryList=this.template.querySelector("c-query-component").getQueryList(); 
        this.condition=this.template.querySelector("c-query-component").getCondition(); 
        
        console.log(JSON.stringify(this.queryList)); 
        searchAccount({
            queryJson:JSON.stringify(this.queryList),
            logic:this.condition
        }).then(data =>{
         //console.log(JSON.stringify(data));
         this.respData=data;
         this.lstAccount=data.lstAccount;
         this.StrMsg=data.strmsg;
         this.recCount=data.count
         this.renderPagination=true;
        }).catch(error =>{
            console.log('Error'); 
        });
    }

    handleSyncData(event){
        console.log('Handling sync');
        console.log(JSON.stringify(event.detail));
        this.data=event.detail;
        this.renderTable=true;
    }
}