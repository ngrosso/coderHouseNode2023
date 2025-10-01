import mongoose, { Schema } from 'mongoose';

const TicketCollection = 'tickets';

export interface ITicketModel {
  code: string;
  purchaseDateTime: Date;
  amount: number;
  purchaser: string;
}

const TicketSchema = new Schema<ITicketModel>({
  code: { type: Schema.Types.String, required: true },
  purchaseDateTime: { type: Schema.Types.Date, required: true },
  amount: { type: Schema.Types.Number, required: true },
  purchaser: { type: Schema.Types.String, ref: 'users', required: true }
});

export default mongoose.model(TicketCollection, TicketSchema);
