import TicketSchema from '../../models/ticket.model.js';
import Ticket from '../../../domain/entities/ticket.js';

class TicketMongooseRepository {
  async find(){
    const ticketsDocument = await TicketSchema.find();

    return ticketsDocument.map(document => new Ticket({
      id: document._id,
      code: document.code,
      purchaseDateTime: document.purchaseDateTime,
      amount: document.amount,
      purchaser: document.purchaser,
    }));

  }

  async findOne(id){
    const ticketDocument = await TicketSchema.findOne({_id:id});

    if(!ticketDocument) throw new TicketDoesntExistError(id);

    return new Ticket({
      id: ticketDocument._id,
      code: ticketDocument.code,
      purchaseDateTime: ticketDocument.purchaseDateTime,
      amount: ticketDocument.amount,
      purchaser: ticketDocument.purchaser,
    });
  }

  async create(ticket){
    const ticketDocument = await TicketSchema.create(ticket);

    return new Ticket({
      id: ticketDocument._id,
      code: ticketDocument.code,
      purchaseDateTime: ticketDocument.purchaseDateTime,
      amount: ticketDocument.amount,
      purchaser: ticketDocument.purchaser,
    });
  }
}

class TicketDoesntExistError extends Error {
  constructor(id) {
    super(`Ticket Id:${id} Not Found!`);
  }
}

export default TicketMongooseRepository;