global class RemindOpptyOwners implements Schedulable {
    global void execute(SchedulableContext ctx) {
        /*List<Opportunity> opptys = [SELECT Id, Name, OwnerId, CloseDate 
            FROM Opportunity 
            WHERE IsClosed = False AND 
            CloseDate < TODAY];
        // Create a task for each opportunity in the list
        system.debug('Hola');*/
        
        integer a=5;
        integer b=5;
        System.debug(a+b);
        
    }
    
}