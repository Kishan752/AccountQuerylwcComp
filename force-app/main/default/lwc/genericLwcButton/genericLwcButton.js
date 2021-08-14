import { api, LightningElement } from 'lwc';

export default class GenericLwcButton extends LightningElement {
    @api label;
    @api variant;
    @api lisDisbaled=false;
    @api method;

    fireEvent(){
        let clickEvent = new CustomEvent('button', { detail: 'ButtonCalled' });
        this.dispatchEvent(clickEvent);
    }
    callParentMethod(){

        this.method()

    }
}