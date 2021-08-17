import { api, LightningElement } from 'lwc';

export default class GenericLwcButton extends LightningElement {
    @api label;
    @api variant;
    @api lisDisbaled=false;
    @api method;

    
    callParentMethod(){

        this.method()

    }
}