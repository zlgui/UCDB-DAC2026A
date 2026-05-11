import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrosEducacionaisModule } from './registros_educacionais/registros_educacionais.module';

@Module({
  imports: [RegistrosEducacionaisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
