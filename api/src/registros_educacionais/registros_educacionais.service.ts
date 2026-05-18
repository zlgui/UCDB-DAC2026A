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

    const LIMITE_CONSOLIDACAO = 50;

    return responseData
      .map((currentInfo) => {
        const aprovados = currentInfo._sum.Aprovados ?? 0;
        const abandonos = currentInfo._sum.Abandono ?? 0;
        const cancelados = currentInfo._sum.Cancelados ?? 0;
        const reprovados = currentInfo._sum.Reprovados ?? 0;
        const matriculas = currentInfo._sum.MatriculasTotal ?? 0;

        if (matriculas === 0) return null;

        const taxaAprovacao = (aprovados / matriculas) * 100;
        const taxaAbandono = (abandonos / matriculas) * 100;
        const taxaCancelamento = (cancelados / matriculas) * 100;
        const taxaReprovacao = (reprovados / matriculas) * 100;

        const somaTaxas =
          taxaAprovacao + taxaAbandono + taxaCancelamento + taxaReprovacao;

        if (somaTaxas < LIMITE_CONSOLIDACAO) return null;

        return {
          ano: currentInfo.AnoReferencia,
          cidade: currentInfo.NomeMunicipio,
          taxaAprovacao,
          taxaAbandono,
          taxaCancelamento,
          taxaReprovacao,
          matriculas,
        };
      })
      .filter((item) => item !== null);
  }
}
