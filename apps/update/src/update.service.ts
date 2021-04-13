import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateService {
  getHello(): string {
    return 'Cron Job is Running!';
  }
}
