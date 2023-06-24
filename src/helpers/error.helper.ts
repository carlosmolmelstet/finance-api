import { HttpStatus } from "@nestjs/common";

export class CustomError extends Error {
  status?: HttpStatus;

  constructor(message: string, status?: HttpStatus) {
    super(message);
    this.name = "CustomError";
    this.status = status;
  }
}
