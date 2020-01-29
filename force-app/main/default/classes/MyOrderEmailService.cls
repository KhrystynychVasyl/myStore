public with sharing class MyOrderEmailService extends Handler implements Schedulable {
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

    public void sendEmailOnOrder(
      List<myorder__c> orders,
      List<String> letterSubject,
      List<String> letterBody
    ) {
      List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
      //List<String> recievers = this.getUserIdsByProfile(this.profileName);

      List<String> recievers  = new List<String>();
      recievers.add('vasyl.fear.k2@gmail.com');
      recievers.add('khrystynych.vasyl@gmail.com');

      for (Integer i = 0; i < orders.size(); i++) {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

        mail.setToAddresses(recievers);
        mail.setSubject(letterSubject[i]);
        mail.setPlainTextBody(letterBody[i]);
        mails.add(mail);
      }
      Messaging.sendEmail(mails);
    }

    public List<String> getUserIdsByProfile(String profileName) {
      List<User> users = [
        SELECT Id
        FROM User
        WHERE ProfileId IN (SELECT Id FROM Profile WHERE Name = :profileName)
      ];
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
      return Database.query(
        'SELECT Id,name,LastModifiedDate FROM myorder__c WHERE LastModifiedDate < LAST_N_DAYS:' +
        this.days
      );
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
        oldOrderLetterSubjectList.add(
          'You have ' +
          orders.Size() +
          ' Unprocessed Orders'
        );
        oldOrderLetterBodyList.add(oldOrderLetterBody);
      }

      this.sendEmailOnOrder(
        orders,
        oldOrderLetterSubjectList,
        oldOrderLetterBodyList
      );
    }
  }

  private class OrderEmailTriggerHandler extends OrderEmailService {
    public OrderEmailTriggerHandler() {
      super('System Administrator');
    }
    public void sendEmailOnNewOrder(List<myorder__c> newOrders) {
      List<String> newOrderLetterSubjectList = new List<String>();
      List<String> newOrderLetterBodyList = new List<String>();

      for (myorder__c order : newOrders) {
        newOrderLetterSubjectList.add('New Order: ' + order.Name);
        newOrderLetterBodyList.add(
          'Order Name: ' +
          order.Name +
          '; Order Id: ' +
          order.Id +
          ';'
        );
      }

      this.sendEmailOnOrder(
        newOrders,
        newOrderLetterSubjectList,
        newOrderLetterBodyList
      );
    }
  }
}
