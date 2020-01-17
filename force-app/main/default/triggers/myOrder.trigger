trigger myOrder on myorder__c (after insert) {
if (Trigger.isAfter) {
    if (Trigger.isInsert) {
        System.debug('trigger has executed on after insert');
    }
}
}