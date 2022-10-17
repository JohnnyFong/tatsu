import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from './response.service';

describe('ResponseService', () => {
  let service: ResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseService],
    }).compile();

    service = module.get<ResponseService>(ResponseService);
  });

  describe('response', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return correct response format', () => {
      const sampleRes = { a: 'a' };
      const res = service.handleResponse(sampleRes);
      expect(res.data).toBe(sampleRes);
      expect(res.meta.code).toBe(200);
    });
  });
});
