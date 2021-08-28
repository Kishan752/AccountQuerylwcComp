import { LightningElement,track,api } from 'lwc';
import heading from '@salesforce/label/c.Account_filter';
import searchAccount from '@salesforce/apex/queryComponentController.searchAccount'; 
import createMapping from '@salesforce/apex/queryComponentController.createMapping'; 


export default class TargetAccountComp extends LightningElement {
    @api recordId;
    
    label = {
        heading
        
    };
    selectedRows=[];
    @track queryList;
    condition;
    @track respData;
    @track lstAccount=[];
    StrMsg;
    renderPagination=false;
    renderTable=false;
    @track data=[];
    recCount;


    executeQuery(){
        console.log('Came to get Query');
        this.queryList=this.template.querySelector("c-query-component").getQueryList(); 
        this.condition=this.template.querySelector("c-query-component").getCondition(); 
        
        console.log(this.queryList); 
        searchAccount({
            queryJson:JSON.stringify(this.queryList),
            logic:this.condition
        }).then(data =>{
            console.log('Data----');
         console.log(data);
         this.respData=data;
         //this.lstAccount=data.lstAccount;
         for(let i=0;i<data.lstAccount.length;i++){
           let d={
            check:false,
            Id:data.lstAccount[i].Id,
            Name:data.lstAccount[i].Name
           }
           this.lstAccount.push(d);
         }
         this.StrMsg=data.strmsg;
         this.recCount=data.count;
         this.renderPagination=true;
        }).catch(error =>{
            console.log('Error'); 
        });
    }

    handleSyncData(event){
        this.renderTable=false;
        console.log('Handling sync');
        console.log(JSON.stringify(event.detail));
        this.data=event.detail;
        this.renderTable=true;
        //this.selectedRows = ['0017F00002rtphyQAA','0017F00002rtphzQAA']
    }

    handleSave(){
       let accs=this.template.querySelector("c-generic-pagination").getSelectedAccount();
        console.log('Saving');
        console.log(JSON.stringify(accs));
        createMapping({
            accjson:JSON.stringify(accs),recId:this.recordId
        }).then(data =>{
           
        }).catch(error =>{
            console.log('Error'); 
        });
       
    }
  
}