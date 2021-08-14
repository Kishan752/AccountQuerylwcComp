import { LightningElement,track } from 'lwc';
import heading from '@salesforce/label/c.Account_filter';
import searchAccount from '@salesforce/apex/queryComponentController.searchAccount'; 


export default class TargetAccountComp extends LightningElement {
    label = {
        heading
        
    };
    @track queryList;


    executeQuery(){
        console.log('Came to get Query');
        this.queryList=this.template.querySelector("c-query-component").getQueryList(); 
        console.log(JSON.stringify(this.queryList)); 
        searchAccount({
            queryJson:JSON.stringify(this.queryList),
            logic:this.condition
        }).then(data =>{
          console.log('Success');
        }).catch(error =>{
            console.log('Error'); 
        });
    }
}