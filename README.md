# UCDB-DAC2026A

Solução tecnológica para análise da rede pública de ensino de Mato Grosso do
Sul, processando dados históricos de 2018 a 2026 a partir do Censo Escolar.

## Como rodar

### Banco de dados

Pra fazer o banco de dados funcionar, crie um arquivo `.env` na pasta `api`
contendo `DATABASE_URL=""`. Depois, no Supabase, clique no botão verde
"Connect", em "Session Pooler" (caso esteja numa rede IPv4), e copie o
connection string trocando `YOUR_PASSWORD` pela senha do banco.

### API e Web

```bash
cd api && npm install && npm run start:dev
cd web && npm install && npm run dev
```

## Sobre os dados

O dataset usado é uma extração do **Censo Escolar (INEP)** para os municípios
de Mato Grosso do Sul, persistida em um PostgreSQL hospedado no Supabase.

### Cobertura por ano

| Ano       | Status                                                         |
| --------- | -------------------------------------------------------------- |
| 2018–2023 | Consolidado (ano letivo encerrado e classificações finais).    |
| 2024      | Parcial — A maioria dos alunos permanece em "Cursando".        |
| 2025      | **Não disponível** no dataset.                                 |
| 2026      | Parcial — ano letivo em andamento, sem desfechos finais ainda. |

O Censo Escolar de cada ano é publicado pelo INEP somente no ano seguinte,
então anos em curso aparecem com a maioria dos alunos ainda classificados
como "Cursando" (não como Aprovados, Reprovados, etc.).

### Como o front trata cada caso

- **Anos consolidados:** linha sólida no gráfico, considerados nos KPIs.
- **Anos parciais (2024, 2026):** linha tracejada no gráfico, **ignorados nos
  cálculos de variação** para não distorcer KPIs com taxas próximas de zero.
- **Anos faltantes (2025):** quebra na linha do gráfico, sinalizando a ausência
  do dado em vez de conectar pontos não adjacentes.

### Como decidimos se um ano é "consolidado" ou "parcial"

O Censo Escolar classifica cada aluno em uma situação ao final do ano:
**Aprovado**, **Reprovado**, **Abandono**, **Cancelado**, **Cursando**,
Transferido, Falecido ou Outras Situações. Quando o ano letivo termina e os
dados são finalizados, quase ninguém deveria estar mais como "Cursando" —
todos receberam um desfecho.

A regra é simples:

> **Soma as 4 taxas finais** (aprovação + reprovação + abandono + cancelamento).
>
> - Se der **≥ 50%** das matrículas → ano **consolidado** (a maioria dos
>   alunos já tem desfecho).
> - Se der **< 50%** → ano **parcial** (a maioria ainda está em "Cursando" ou
>   situação intermediária).

#### Exemplo prático com os dados reais

| Ano  | Aprovação | Reprovação | Abandono | Cancelamento | Soma das 4 | Classificação      |
| ---- | --------- | ---------- | -------- | ------------ | ---------- | ------------------ |
| 2020 | 81.6%     | 8.8%       | 0.0%     | 3.0%         | **93.5%**  | ✅ Consolidado     |
| 2023 | 73.0%     | 7.8%       | 0.0%     | 2.4%         | **83.2%**  | ✅ Consolidado     |
| 2024 | 1.2%      | 0.3%       | 0.0%     | 2.0%         | **3.4%**   | ⚠️ Parcial         |
| 2026 | 0.0%      | 0.0%       | 0.0%     | 1.2%         | **1.2%**   | ⚠️ Parcial         |

Em 2020, 93.5% dos alunos têm desfecho final — só 6.5% restantes são
transferências, falecimentos, etc. Já em 2024, somente 3.4% dos alunos têm
desfecho — os outros **96.6% ainda aparecem como "Cursando"**, porque a
extração foi feita antes do ano fechar e nunca foi atualizada.

#### Por que isso importa

Sem essa distinção, comparar a taxa de aprovação de 2022 (69.9%) com a de
2024 (1.2%) sugeriria uma **queda de -98%** na educação — quando na
verdade os alunos de 2024 simplesmente ainda não foram classificados como
aprovados. A flag `consolidado` evita esse tipo de leitura enganosa.

O limiar de **50%** é uma heurística — empiricamente, anos fechados nesta
base ficam todos acima de 80%, e anos em curso ficam abaixo de 10%. Qualquer
valor entre 20% e 70% separaria os dois grupos corretamente; 50% é só um
meio-termo seguro.
