import { User } from './User';
interface IBox {
  objectId:string;
  donor:User;
  beneficiary:User;
  plan:number;
  confirmation_status:number;
  timer_status:number;
  createdAt:string;
  pop:{
    url:string;
  }
}

export class Box implements IBox {
  public objectId: string;
  public donor: User;
  public beneficiary: User;
  public plan: number;
  public confirmation_status: number;
  public timer_status: number;
  public createdAt: string;
  public pop: {
    url:string;
  };
  
} 