interface IUser {
  objectId:string;
  firstname:string;
  lastname:string;
  email:string;
  username:string;
  phone:string;
  role:number;
  confirmation_count:number;
  benefit_count:true;
  active:boolean;
  suspended:boolean;
  in_box_count:number;
  bank:string;
  account_number:string;
  plan:number;
}

export class User implements IUser {
  public firstname: string;
  public role: number;
  public lastname: string;
  public email: string;
  public username: string;
  public phone: string;
  public objectId: string;
  public confirmation_count: number;
  public benefit_count: true;
  public active: boolean;
  public suspended: boolean;
  public in_box_count: number;
  public bank: string;
  public account_number: string;
  public plan: number;

	constructor() {
	}
  
}