import { LightningElement, api, track } from 'lwc';
import getLayoutMetaData from '@salesforce/apex/accountEditcompController.getLayoutMetaData';
import getvalidate from '@salesforce/apex/accountEditcompController.getvalidate';
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';

export default class AccountEditcomp extends LightningElement {
    @api recordId;
    isModalOpen=true;
    @track layoutData;
    @track layoutSection;
    recTypeID;

    connectedCallback(){
        this.handleInit();
    }

    handleInit(){
        getLayoutMetaData({
            recId:this.recordId

        }).then(data =>{ 

            console.log("came to then");
           
            this.layoutData=data;
            console.log(this.layoutData);
            
            console.log();
            this.recTypeID=this.layoutData.recordTypeId;
            this.layoutSection=this.layoutData.fieldWrap.lstSection;
            console.log(JSON.stringify(this.layoutSection));
        }).catch(error => {
            console.log("came to Catch");
        });

    }

    closeModal(){
        this.isModalOpen=false;
    }
    submitDetails(){
        console.log('Submitting');
    }

    submitForm(event){
        event.preventDefault(); 
        console.log('Submitting now');
        const fields = event.detail.fields;
        console.log('fields' + JSON.stringify(fields));
        getvalidate({
            recId:this.recordId,
            fields:fields


        }).then(data =>{ 

            this.template.querySelector('lightning-record-edit-form').submit(fields);

        }).catch(error => {
            console.log("came to Catch");
        });
    }

    handleSuccess(event){
        this.isModalOpen=false;
        window.location = '/' + this.recordId;
    }

}