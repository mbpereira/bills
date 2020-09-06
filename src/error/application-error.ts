export class ApplicationError {
  public name: string;
  public message: string;
  public code: number;
  public stack?: string;

  /**
   *
   */
  constructor(name: string, message: string, code: number) {
    this.stack = (new Error()).stack;
    this.name = name;
    this.message = message;
    this.code = code;
  }
}