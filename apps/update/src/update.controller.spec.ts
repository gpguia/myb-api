import { Test, TestingModule } from '@nestjs/testing';
import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';

describe('UpdateController', () => {
  let updateController: UpdateController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UpdateController],
      providers: [UpdateService],
    }).compile();

    updateController = app.get<UpdateController>(UpdateController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(updateController.getHello()).toBe('Hello World!');
    });
  });
});
