import { md5 } from './md5';

export class UserUtil {
  getUsername(user:any):string {
    return user != null ? user.username : "Username";
  }
  getGravatar(user:any) {
		let e = user != null ? user.email : '';
		return 'https://www.gravatar.com/avatar/'+ md5(e);
	}
  getGrav(email?) {
    return 'https://www.gravatar.com/avatar/'+ md5(email);
  }
  selectKey(user:any, key:string) {
    if(!user) {
      return "unknown";
    }
    return user[key];
  }
  getPlan(id:number):number {
    if (id == 1) {
      return 20000;
    } else if (id == 2) {
      return 50000;
    } else {
      return 100000;
    }
  }
  getPay(plan:number):number {
    return this.getPlan(plan) / 2;
  }

  getConfirmationStatus(status):string {
    if (status == 0) {
      return "Awaiting Donor";
    } else if (status == 1) {
      return "Awaiting Confirmation";
    } else if (status == 2) {
      return "Complete";
    } else if (status == 3) {
      return "Declined";
    }
  }
}