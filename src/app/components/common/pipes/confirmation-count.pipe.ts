import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User';
@Pipe({
  name: 'confirmCount'
})
@Injectable()
export class ConfirmationCountPipe implements PipeTransform {
  transform(users:User[], type:number, isAdmin?:boolean) {
    if (type = 0) {
      return users.filter(user => user.confirmation_count == 2);
    } else if (type = 1) {
      return users.filter(user => user.confirmation_count <= 1 || user.role == 0 || user.role == 1);
    }
  }
}