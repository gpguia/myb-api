import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './cron-task.service';
import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';

@Module({
  imports: [ScheduleModule.forRoot(), TasksService],
  controllers: [UpdateController],
  providers: [UpdateService],
})
export class UpdateModule {}
