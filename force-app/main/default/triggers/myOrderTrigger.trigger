trigger myOrderTrigger on myorder__c (after insert) {
HandlerExecutionPool.getInstance().getHandler(myorder__c.class).execute();    
}