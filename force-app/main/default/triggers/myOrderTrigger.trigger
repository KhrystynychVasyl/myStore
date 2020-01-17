trigger myOrderTrigger on myorder__c (before insert) {
if (Trigger.isAfter) {
    if (Trigger.isInsert) {
        System.debug('trigger has executed on after insert');
    }
}
}