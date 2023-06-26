class User {
  constructor(props) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.password = props.password;
    this.age = props.age;
    this.cart = props.cart;
    this.admin = props.admin;
  }
}

export default User;