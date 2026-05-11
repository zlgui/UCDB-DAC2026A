import { Test, TestingModule } from '@nestjs/testing';
import { RegistrosEducacionaisController } from './registros_educacionais.controller';

describe('RegistrosEducacionaisController', () => {
  let controller: RegistrosEducacionaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrosEducacionaisController],
    }).compile();

    controller = module.get<RegistrosEducacionaisController>(
      RegistrosEducacionaisController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
