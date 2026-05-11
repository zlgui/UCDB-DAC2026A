import { Module } from '@nestjs/common';
import { RegistrosEducacionaisService } from './registros_educacionais.service';
import { RegistrosEducacionaisController } from './registros_educacionais.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RegistrosEducacionaisService],
  controllers: [RegistrosEducacionaisController],
})
export class RegistrosEducacionaisModule {}
