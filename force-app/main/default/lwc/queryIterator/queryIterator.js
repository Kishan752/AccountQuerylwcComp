import { api, LightningElement,track } from 'lwc';

export default class QueryIterator extends LightningElement {
   
    @api responseData;
    @track ObjectNameSet=[];
    @track fieldSet=[];
    @track operatorSet=[];
    @api serialnumber=1
    render=false;
    @track resultdata;
    @track fieldOperatormap=[];
    rendervaluefield=false;
    renderpicklist=false;
    @track pickValues=[];
    filterset={serialNumber:'',objectName:'',fieldName:'',Operator:'',value:''};

    connectedCallback(){
        console.log('Came to Query Iterator');
      //  var fields = Object.keys(this.responseData).map(key=> ({ key: key, ...this.responseData[key] }));
        this.resultdata=this.responseData;
        for(var key in this.resultdata){
          
            this.ObjectNameSet.push(key);
     
        }
        this.render=true;
        console.log(JSON.stringify(this.ObjectNameSet));
    }

    changehandler(event){
        let name=event.target.dataset.name;
        let value = event.target.value;
        console.log('Name is'+name);
        
        console.log('value is'+value);
        switch(name)
        {
            case 'objectName':
                this.fieldSet=[];
                this.fieldOperatormap=[];
                this.operatorSet=[];
                var objectSelected=value;
                for(var i=0;i<this.resultdata[objectSelected].length;i++){
                    this.fieldSet.push(this.resultdata[objectSelected][i].label);   
                    //console.log(JSON.stringify(this.resultdata[objectSelected][i]));
                    this.fieldOperatormap.push({field:this.resultdata[objectSelected][i].label,Operator:this.resultdata[objectSelected][i].typeX,pickValues:this.resultdata[objectSelected][i].picklistValues});
                   }
                   this.filterset.serialNumber=this.serialnumber;
                   this.filterset.objectName=objectSelected;
                   this.filterset.fieldName='';
                   this.filterset.Operator='';
                   this.filterset.value='';

            break;

            case 'fieldName':
                this.operatorSet=[];
                this.pickValues=[];
                
                var fieldSelected=value;

                for(var i=0;i<this.fieldOperatormap.length;i++){
            if(this.fieldOperatormap[i].field == fieldSelected){
               if(this.fieldOperatormap[i].Operator == 'Text'){
                this.operatorSet.push('equals');
                this.operatorSet.push('not equals to');
                this.operatorSet.push('starts with');
                this.operatorSet.push('contains');
                this.renderpicklist=false;
                this.rendervaluefield=true;
               }
               else if(this.fieldOperatormap[i].Operator == 'Picklist'){
                this.operatorSet.push('equals');
                this.operatorSet.push('not equals to');
                this.operatorSet.push('contains');
                this.operatorSet.push('does not contains');
                for(var j=0;j<this.fieldOperatormap[i].pickValues.length;j++){
                    this.pickValues.push(this.fieldOperatormap[i].pickValues[j]);
                }
                this.renderpicklist=true;
                this.rendervaluefield=true;
               }
               else if(this.fieldOperatormap[i].Operator == 'Number'){
                this.operatorSet.push('=');
                this.operatorSet.push('<');
                this.operatorSet.push('>');
                this.operatorSet.push('!=');
                this.renderpicklist=false;
                this.rendervaluefield=true;

               }
                
            }
        }
                   this.filterset.serialNumber=this.serialnumber;
                   
                   this.filterset.fieldName=fieldSelected;
                   this.filterset.Operator='';
                   this.filterset.value='';
            break;
            case 'OperatorName':
                this.filterset.serialNumber=this.serialnumber;
                this.filterset.Operator=value;
                this.filterset.value='';
            break;
            
            case 'textName':
                this.filterset.serialNumber=this.serialnumber;
                this.filterset.value=value;
            break;
            case 'picvalueName':
               this.filterset.serialNumber=this.serialnumber;
               this.filterset.value=value;
            break;
      }
        let clickEvent = new CustomEvent('filter', { detail: this.filterset });
        this.dispatchEvent(clickEvent);


    }

    /*changeHandler(event){
        this.fieldSet=[];
        this.fieldOperatormap=[];
        this.operatorSet=[];
       var objectSelected = event.target.value;
       //console.log(JSON.stringify(this.resultdata[objectSelected]));
       for(var i=0;i<this.resultdata[objectSelected].length;i++){
        this.fieldSet.push(this.resultdata[objectSelected][i].label);   
        //console.log(JSON.stringify(this.resultdata[objectSelected][i]));
        this.fieldOperatormap.push({field:this.resultdata[objectSelected][i].label,Operator:this.resultdata[objectSelected][i].typeX,pickValues:this.resultdata[objectSelected][i].picklistValues});
       }
       
       console.log(JSON.stringify(this.fieldSet));
       console.log(JSON.stringify(this.fieldOperatormap));

       

    }
    changeFieldHandler(event){
        var fieldSelected = event.target.value;
        this.operatorSet=[];
        this.pickValues=[];
        for(var i=0;i<this.fieldOperatormap.length;i++){
            if(this.fieldOperatormap[i].field == fieldSelected){
               if(this.fieldOperatormap[i].Operator == 'Text'){
                this.operatorSet.push('equals');
                this.operatorSet.push('not equals to');
                this.operatorSet.push('starts with');
                this.operatorSet.push('contains');
                this.renderpicklist=false;
                this.rendervaluefield=true;
               }
               else if(this.fieldOperatormap[i].Operator == 'Picklist'){
                this.operatorSet.push('equals');
                this.operatorSet.push('not equals to');
                this.operatorSet.push('contains');
                this.operatorSet.push('does not contains');
                for(var j=0;j<this.fieldOperatormap[i].pickValues.length;j++){
                    this.pickValues.push(this.fieldOperatormap[i].pickValues[j]);
                }
                this.renderpicklist=true;
                this.rendervaluefield=true;
               }
               else if(this.fieldOperatormap[i].Operator == 'Number'){
                this.operatorSet.push('=');
                this.operatorSet.push('<');
                this.operatorSet.push('>');
                this.operatorSet.push('!=');
                this.renderpicklist=false;
                this.rendervaluefield=true;

               }
                
            }
        }
    }*/


}