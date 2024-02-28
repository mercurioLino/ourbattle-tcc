import { HttpException, HttpStatus } from '@nestjs/common';

export class StatusIrregularException extends HttpException {
  constructor() {
    super('Status Irregular', HttpStatus.BAD_REQUEST);
  }
}
