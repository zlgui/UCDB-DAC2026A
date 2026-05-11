import { Controller, Get } from '@nestjs/common';
import { RegistrosEducacionaisService } from './registros_educacionais.service';

@Controller('registros-educacionais')
export class RegistrosEducacionaisController {
  constructor(
    private readonly registrosEducacionaisService: RegistrosEducacionaisService,
  ) {}

  @Get('dashboard/data')
  getTimeline() {
    try {
      return this.registrosEducacionaisService.getAllRegistrosEducacionais();
    } catch (error) {
      console.error('Dashboard error:', error);
      throw error;
    }
  }
}
