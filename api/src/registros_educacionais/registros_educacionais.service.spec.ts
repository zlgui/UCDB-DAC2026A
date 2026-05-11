import { Test, TestingModule } from '@nestjs/testing';
import { RegistrosEducacionaisService } from './registros_educacionais.service';

describe('RegistrosEducacionaisService', () => {
  let service: RegistrosEducacionaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrosEducacionaisService],
    }).compile();

    service = module.get<RegistrosEducacionaisService>(RegistrosEducacionaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
