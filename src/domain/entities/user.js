class User {
  constructor(props) {
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