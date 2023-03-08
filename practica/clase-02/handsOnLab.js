class TicketManager {
  events = Array;
  #priceBase = Number;
  id = Number;

  constructor() {
    this.events = [];
    this.#priceBase = 0.1;
    this.id = 1;
  }

  getEvents() {
    return JSON.stringify(this.events);
  }

  addEvent(event) {
    let { name, place, price, amount, date } = event;
    this.events.push({ id: this.id, name: name, place: place, price: price + this.#priceBase, amount: amount ?? 50, date: date ?? new Date(), participants: [] });
    this.id++;
  }

  addUser(eventId, user) {
    const event = this.events.find(event => event.id === eventId);
    if (!event) {
      throw Error("No existe evento");
    }
    const foundUser = event.participants.find(participant =>participant != undefined && participant.id === user.userId);

    if (!foundUser) {
      event.participants.push(user);
    }
  }

  ponerEventoEnGira(eventId,newPlace,newDate){
    const event = this.events.find(event => event.id === eventId);
    if (!event) {
      throw Error("No existe evento");
    }
    const newEvent = {...event,id:this.id,place:newPlace,date:newDate};
    this.events.push(newEvent);
    this.id++;
  }
};

let ticket = new TicketManager();
ticket.addEvent({ name: "Evento 1", place: "Lugar 1", price: 100 });
ticket.addEvent({ name: "Evento 2", place: "Lugar 2", price: 200 });
ticket.addEvent({ name: "Evento 3", place: "Lugar 3", price: 300 });
console.log(ticket.getEvents());
ticket.addUser(1, { userId: 1, name: "Juan" });
ticket.addUser(1, { userId: 2, name: "Pedro" });
console.log(ticket.getEvents());