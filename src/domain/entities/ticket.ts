export interface ITicket {
  id?: string;
  code: string;
  purchaseDateTime: Date;
  amount: number;
  purchaser: string;
}

class Ticket {
  id?: string;
  code: string;
  purchaseDateTime: Date;
  amount: number;
  purchaser: string;

  constructor(props: ITicket) {
    this.id = props.id;
    this.code = props.code;
    this.purchaseDateTime = props.purchaseDateTime;
    this.amount = props.amount;
    this.purchaser = props.purchaser;
  }
}

export default Ticket;
