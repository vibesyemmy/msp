import { User } from './User';
import { Thread } from './Thread';
import { uuid } from './uuid';
/**
 * Message represents one message being sent in a Thread
 */
 export class Message {
   id: string;
   sentAt: Date;
   isRead: boolean;
   author: {id:string, username:string};
   text: string;
   thread: Thread;

   constructor(obj?: any) {
     this.id              = obj && obj.id              || uuid();
     this.isRead          = obj && obj.isRead          || false;
     this.sentAt          = obj && obj.sentAt          || new Date();
     this.author          = obj && obj.author          || null;
     this.text            = obj && obj.text            || null;
     this.thread          = obj && obj.thread          || null;
   }
 }