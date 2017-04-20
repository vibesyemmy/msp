import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User';
@Pipe({
  name: 'inboxCount'
})
@Injectable()
export class InboxCountPipe implements PipeTransform {
  transform(users:User[], inboxCount:number) {
    return users.filter(user => user.in_box_count <= inboxCount || user.role == 0 || user.role == 1);
  }
}