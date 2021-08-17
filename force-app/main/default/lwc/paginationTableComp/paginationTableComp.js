import { api, LightningElement, track } from 'lwc';
import headers from '@salesforce/label/c.AccounttableHeader';

export default class PaginationTableComp extends LightningElement {

    @api accountdata;
    @track myheaders;
    isRender=false;

    connectedCallback(){
        this.handleinit();
    }

    handleinit(){
        this.myheaders = headers.split(",");
        this.isRender=true;
        console.log(JSON.stringify(this.accountdata)); 
    }
}