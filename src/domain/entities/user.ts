export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  cart?: string;
  lastConnection?: number;
  admin: boolean;
  premium: boolean;
  documents: any[];
  status: boolean;
}

class User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  cart?: string;
  lastConnection?: number;
  admin: boolean;
  premium: boolean;
  documents: any[];
  status: boolean;

  constructor(props: IUser) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.password = props.password;
    this.age = props.age;
    this.cart = props.cart;
    this.lastConnection = props.lastConnection;
    this.admin = props.admin;
    this.premium = props.premium;
    this.documents = props.documents;
    this.status = props.status;
  }
}

export default User;
