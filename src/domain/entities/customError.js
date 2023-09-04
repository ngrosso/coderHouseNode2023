class CustomError {
  constructor(props) {
    this.code = props.code;
    this.message = props.message;
    this.path = props.path[0];
  }
}

export default CustomError