public with sharing class MyOrderEmailService  extends Handler implements Schedulable {

    public override void onAfterInsert(Handler.TriggerContext context) {
        new OrderEmailTriggerHandler().sendEmailOnNewOrder(context.newList);
    }
    public void execute(SchedulableContext context) {
        new OrderEmailScheduledService(3).sendEmailOnOldOrder();
    }

    private virtual class OrderEmailService {

        private final String profileName;

        public OrderEmailService(String profileName) {
            this.profileName = profileName;
        }

        public void sendEmailOnOrder(List<myorder__c> orders, List<String> letterSubject, List<String> letterBody) {
            List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
            List<String> recievers = this.getUserIdsByProfile(this.profileName);

            for (Integer i = 0; i < orders.size(); i++) {
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.setToAddresses(recievers);
                mail.setSubject(letterSubject[i]);

                //String letterSubject = 'New Order: ' + orderList[y].Name;

                //String letterSubjectOld = 'You have ' + orders.Size() +  ' Unprocessed Orders';

                mail.setPlainTextBody(letterBody[i]);

                //String letterBody = 'Order Name: ' + orderList[y].Name + '; Order Id: ' + orderList[y].id + ';';

                //String letterBodyOld = 'List of orders: ';

                mails.add(mail);
            }

            // for (My_Order__c order : orders) {
            //     Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            //     mail.setToAddresses(recievers);
            //     mail.setPlainTextBody('New Order created ' + order.Id);
            //     mails.add(mail);
            // }

            Messaging.sendEmail(mails);
        }
    
        public List<Id> getUserIdsByProfile(String profileName) {
            List<Profile> profiles = [SELECT Id FROM Profile WHERE Name = :profileName];
            List<User> users = [SELECT Id FROM User WHERE ProfileId IN :profiles];
            return new List<String>(new Map<String, User>(users).keySet());
        }
    }
    
    private class OrderEmailScheduledService extends OrderEmailService {
        private final Integer days;
        public OrderEmailScheduledService(Integer days) {
            super('Shop Admin');
            this.days = days;
        }
        public List<myorder__c> queryOrders() {
            return Database.query('SELECT id,name,LastModifiedDate FROM myorder__c WHERE LastModifiedDate < LAST_N_DAYS:' + this.days);
        }
        
        public void sendEmailOnOldOrder() {

            List<myorder__c> orders = this.queryOrders();
            List<String> oldOrderLetterSubjectList = new List<String>();
            List<String> oldOrderLetterBodyList = new List<String>();

            String oldOrderLetterBody = 'List of orders: ';

            for (myorder__c order : orders) {
                oldOrderLetterBody = oldOrderLetterBody + order.Name + ' ,';
            }
            for (myorder__c order : orders) {
                oldOrderLetterSubjectList.add('You have ' + orders.Size() +  ' Unprocessed Orders');
                oldOrderLetterBodyList.add(oldOrderLetterBody);
            }

            this.sendEmailOnOrder(orders, oldOrderLetterSubjectList, oldOrderLetterBodyList);
        }
    }

    private class OrderEmailTriggerHandler extends OrderEmailService {
        public OrderEmailTriggerHandler() {
            super('Shop Admin');
        }
        public void sendEmailOnNewOrder(List<myorder__c> newOrders) {

            List<String> newOrderLetterSubjectList = new List<String>();
            List<String> newOrderLetterBodyList = new List<String>();

            for (myorder__c order : newOrders) {
                newOrderLetterSubjectList.add('New Order: ' + order.Name);
                newOrderLetterBodyList.add('Order Name: ' + order.Name + '; Order Id: ' + order.id + ';');
            }

            this.sendEmailOnOrder(newOrders, newOrderLetterSubjectList, newOrderLetterBodyList);
        }
    }

    // public void execute(SchedulableContext ctx) {
    //     new MysendMailAsScheduled().sendUnprocessedOrders();
    // } 

    // public override void onAfterInsert(Handler.TriggerContext context) {
    //     new MyOrderEmailTriggerHandler().sendEmailOnNewOrder(context.newList);
    // }
    //  private  class MyOrderEmailTriggerHandler {
    //     public void sendEmailOnNewOrder(List<myorder__c> orderList) {
    //     User[] userList = [SELECT Email FROM USER WHERE Profile.Name = 'Shop Admin'];
    //     for (Integer i = 0; i < userList.size(); i++) {
    //         for (Integer y = 0; y < orderList.size(); y++) {
    //             String letterAddress = userList[i].Email;
    //             String letterBody = 'Order Name: ' + orderList[y].Name + '; Order Id: ' + orderList[y].id + ';';
    //             String letterSubject = 'New Order: ' + orderList[y].Name;
    //             new EmailManager().sendMail(letterAddress, letterSubject, letterBody);
    //             }
    //         }
    //     }
    // }   

    // private class MySendMailAsScheduled {

    //     public void sendUnprocessedOrders() {

    //         List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();

    //         List<myorder__c> orders = [SELECT id,name,LastModifiedDate FROM myorder__c WHERE LastModifiedDate < LAST_N_DAYS:3];

    //         //Select * from case where WHERE CreatedDate = LAST_N_DAYS:30 

    //         //LastModifiedDate

    //         // User[] userList = [SELECT Email FROM USER WHERE Profile.Name = 'Shop Admin'];
            
    //         List<String> recievers = this.getUserIdsByProfile('Shop Admin');

    //         for (myorder__c ord:orders) {
    //             Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    //             String letterBody = 'List of orders: ';
    //             String letterSubject = 'You have ' + orders.Size() +  ' Unprocessed Orders';
    //             mail.setToAddresses(recievers);
    //             mail.setPlainTextBody(letterBody);
    //             mail.setSubject(letterSubject);
    //             mails.add(mail);
    //             }

    //         if (mails.size() > 0) {
    //             Messaging.sendEmail(mails);
    //         }               
    //     }

    //     public List<Id> getUserIdsByProfile(String profileName) {
    //         List<Profile> profiles = [SELECT Id FROM Profile WHERE Name = :profileName];
    //         List<User> users = [SELECT Id FROM User WHERE ProfileId IN :profiles];
    //         return new List<String>(new Map<String, User>(users).keySet());
    //     }
    
    // }

}