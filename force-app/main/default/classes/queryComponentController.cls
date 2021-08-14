public class queryComponentController {
    
    
    @auraEnabled
    public static MetadataWrapper getMetadata(){
        
        MetadataWrapper mt= new MetadataWrapper();
        mt.tableHeaders=System.Label.TableHeader.split(',');
       
        list<Query_fields__mdt> queryMetadata=[select MasterLabel,Api_Name__c,Label_Name__c,Object_Api_name__c,Picklist_Values__c,Type__c from Query_fields__mdt ];
        list<queryFields> queryData=new list<queryFields>();
        for(Query_fields__mdt qd:queryMetadata){
            queryFields qt=new queryFields();
            qt.label=qd.label_name__c;
            qt.apiName=qd.Api_Name__c;
            qt.ObjectApiName=qd.Object_Api_name__c;
            qt.typeX=qd.Type__c;
            qt.picklistValues=qd.Picklist_Values__c != Null?qd.Picklist_Values__c.split(','):Null;
            queryData.add(qt);
        }
        mt.queryfields=queryData;
        Map<String,list<queryFields>> qmap=new Map<String,list<queryFields>>();
        for(queryFields qf:queryData){
            if(qmap.containsKey(qf.ObjectApiName)){
                qmap.get(qf.ObjectApiName).add(qf);
            }
            else{
                qmap.put(qf.ObjectApiName,new list<queryFields>{qf} );
            }
        }
        
        mt.mapqueryfields=qmap;
        
        return mt;
        
    }
    
    @auraEnabled
    public static void searchAccount(String queryJson,String logic){
    Map<String,String> OperatorMap = new Map<String,String>();
    OperatorMap.put('equals','=');
    OperatorMap.put('not equals to','!=');
    OperatorMap.put('contains','like');
    OperatorMap.put('starts with','like');
    
    list<Query_fields__mdt> queryMetadata=[select MasterLabel,Api_Name__c,Label_Name__c,Object_Api_name__c,Picklist_Values__c,Type__c from Query_fields__mdt ];
      map<String,String> labelApiMap=new map<String,String>();
        for(Query_fields__mdt qd:queryMetadata){
            labelApiMap.put(qd.Label_Name__c,qd.Api_Name__c);
        }    
        
        
        System.debug(queryJson);
        list<queryClass> qu=(list<queryClass>)JSON.deserialize(queryJson, list<queryClass>.class);
        String Query='select id,Name from account where ';
        Integer count=0;
        
        Integer length=qu.size();
        for(queryClass qc:qu){
            if(count>0){
                Integer currentCount=Integer.valueOf(qc.serialNumber);
                integer prevCount=currentCount-1;
                if(!(currentCount>length)){
                    String nxt=String.valueOf(prevCount);
                	String cond=logic.substring(logic.indexof(nxt)+1,logic.indexof(qc.serialNumber));
                	Query+=cond;
                }
                
            }
            if(OperatorMap.get(qc.Operator)!='like'){
               Query+=labelApiMap.get(qc.fieldName)+' '+OperatorMap.get(qc.Operator)+  '\'' +qc.value+ '\'' ; 
            } 
            else if(qc.Operator.equals('contains')){
            Query+=labelApiMap.get(qc.fieldName)+' '+OperatorMap.get(qc.Operator)+  ' \'%' +qc.value+ '%\'' ; 
            }
            else if(qc.Operator.equals('starts with')){
            Query+=labelApiMap.get(qc.fieldName)+' '+OperatorMap.get(qc.Operator)+  '\'' +qc.value+ '%\'' ; 
            }
            count++;
        }
        System.debug(Query);
        System.debug(Database.query(Query));
    }
    
    public class queryClass{
        
        String serialNumber;
        String objectName;
        String fieldName;
        String Operator;
        String value;
        
        
    }
    
    
}