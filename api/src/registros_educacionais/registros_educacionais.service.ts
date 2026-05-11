import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegistrosEducacionaisService {
  constructor(private prisma: PrismaService) {}

  async getAllRegistrosEducacionais() {
    const responseData = await this.prisma.registros_educacionais.groupBy({
      by: ['AnoReferencia', 'NomeMunicipio'],
      _sum: {
        Aprovados: true,
        Abandono: true,
        MatriculasTotal: true,
        Cancelados: true,
        Reprovados: true,
      },
      orderBy: {
        AnoReferencia: 'asc',
      },
    });

    return responseData.map((currentInfo) => {
      const aprovados = currentInfo._sum.Aprovados ?? 0;
      const abandonos = currentInfo._sum.Abandono ?? 0;
      const cancelados = currentInfo._sum.Cancelados ?? 0;
      const reprovados = currentInfo._sum.Reprovados ?? 0;
      const matriculas = currentInfo._sum.MatriculasTotal ?? 1;

      return {
        ano: currentInfo.AnoReferencia,
        cidade: currentInfo.NomeMunicipio,
        taxaAprovacao: (aprovados / matriculas) * 100,
        taxaAbandono: (abandonos / matriculas) * 100,
        taxaCancelamento: (cancelados / matriculas) * 100,
        taxaReprovacao: (reprovados / matriculas) * 100,
        matriculas: matriculas,
      };
    });
  }
}
