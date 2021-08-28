import { api, LightningElement,wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import BOATMC from '@salesforce/messageChannel/QuantityMessageChannel__c';

export default class TableRowComp extends LightningElement {
    @api record;
    @api check;
    @api checkk;
    recId;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        console.log('in connected callback');
        this.recId=this.record.Id;
    }
    renderedCallback() {
        console.log('in render'+this.check);
        if(this.recId!=this.record.Id  ){
            console.log('updated rec id');
            this.template.querySelectorAll('lightning-input').forEach(each => { each.checked = this.check; });
            this.recId=this.record.Id;
        }
    }
    
    handleChange(event){
        let isChecked = event.target.checked;
        const payload = { pId: this.record.Id,isCheckBoxChannel:true,check:isChecked };
        publish(this.messageContext, BOATMC, payload); 

    }

}