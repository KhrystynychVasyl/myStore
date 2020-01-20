public with sharing class MyOrderEmailService extends Handler{

    // global void execute(SchedulableContext ctx) {
    //     // awesome code here
    // }
    public  override void onAfterInsert(Handler.TriggerContext context) {
        new OrderEmailTriggerhandler().sendEmailOnNewOrder(context.newList);
    }

     private  class OrderEmailTriggerhandler {
        public void sendEmailOnNewOrder(List<myorder__c> orderList) {
        User[] userList = [SELECT Email FROM USER WHERE Profile.Name = 'Shop Admin'];
        for (Integer i = 0; i < userList.size(); i++) {
            for (Integer y = 0; y < orderList.size(); y++) {
                String letterAddress = userList[i].Email;
                String letterBody = 'Order Name: ' + orderList[y].Name + '; Order Id: ' + orderList[y].id + ';';
                String letterSubject = 'New Order: ' + orderList[y].Name;
                new EmailManager().sendMail(letterAddress, letterSubject, letterBody);
            }
        }
    }
    }    
}