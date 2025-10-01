export interface ICustomError {
  code: string;
  message: string;
  path: string[];
}

class CustomError {
  code: string;
  message: string;
  path: string;

  constructor(props: ICustomError) {
    this.code = props.code;
    this.message = props.message;
    this.path = props.path[0];
  }
}

export default CustomError;
