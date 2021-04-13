import { Controller, Get } from '@nestjs/common';
import { UpdateService } from './update.service';

@Controller()
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Get()
  getHello(): string {
    return this.updateService.getHello();
  }
}
