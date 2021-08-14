public class CustomerTriggerHandler {
    
    public static void handleTeacher(list<Customer__c> lsrecords, map<id,Customer__c> oldList){
       
        Set<String> teacherAdded=new Set<String>();
      
        for(Customer__c ct:lsrecords){
            Customer__c oldRec=oldList == Null? Null:oldList.get(ct.id);
            System.debug(ct.List_Of_Teacher__c);
            System.debug(ct.List_Of_Teacher__c != '');
            if(ct.available__c && ct.List_Of_Teacher__c != '' && (oldRec==Null || (ct.List_Of_Teacher__c != oldRec.List_Of_Teacher__c ) )){
                teacherAdded.add(ct.List_Of_Teacher__c);
              
            }
            
        }
        if(teacherAdded.size()>0){
             map<String,Customer__c> existingCustmap=new map<String,Customer__c>();
            
            for(Customer__c ctt:[Select id,List_Of_Teacher__c from Customer__c where List_Of_Teacher__c in:teacherAdded and available__c = true]){
                existingCustmap.put(ctt.List_Of_Teacher__c,ctt);
            }
            if(existingCustmap.size()>0){
                for(Customer__c ct:lsrecords){
                if(existingCustmap.containsKey(ct.List_Of_Teacher__c)){
                    ct.addError('You cant select this teacher as it is already selected');
                }
            }
            }
            
            
            
            
        }
        
        
        
    }
    
}