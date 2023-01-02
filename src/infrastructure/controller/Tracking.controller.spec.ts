import { TrackingService } from '@application/services/Tracking.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TrackingController } from './Tracking.controller';

describe('AppController', () => {
  let trackingController: TrackingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrackingController],
      providers: [TrackingService],
    }).compile();

    trackingController = app.get<TrackingController>(TrackingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(trackingController.createTracking()).toBe('Hello World!');
    });
  });
});
