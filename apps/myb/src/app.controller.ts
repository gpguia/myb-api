import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/b24')
  async get24HrBinance(): Promise<any[]> {
    return await this.appService.get24HrBinance();
  }
}
