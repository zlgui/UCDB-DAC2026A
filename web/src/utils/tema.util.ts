export const cores = {
  aprovacao: "#16a34a",
  reprovacao: "#dc2626",
  abandono: "#f59e0b",
  cancelamento: "#6b7280",
  neutro: "#6b7280",
  positivo: "#16a34a",
  negativo: "#dc2626",
  textoPrincipal: "#111827",
  textoTitulo: "#0F172A",
  textoSubtitulo: "#475569",
  textoSecundario: "#6b7280",
  fundoCard: "#ffffff",
  fundoPagina: "#F7F7F7",
  fundoSecao: "#F8FAFC",
  fundoApp: "#00509d",
  borda: "#e5e7eb",
  bordaSuave: "#f1f5f9",
} as const;

export const sombras = {
  card: "0 4px 12px rgba(0, 0, 0, 0.06)",
  cardElevado: "0 12px 24px rgba(0, 0, 0, 0.1)",
  container: "0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 20px rgba(0, 0, 0, 0.15)",
} as const;

export const raios = {
  card: "16px",
  controle: "8px",
  container: "20px",
} as const;

export const espacamentos = {
  pequeno: "0.5rem",
  medio: "1rem",
  grande: "1.5rem",
  extra: "3rem",
} as const;

export const gradientes = {
  fundoApp: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #2D1B69 100%)",
  acento: "linear-gradient(90deg, #16a34a, #3b82f6, #aa3bff)",
} as const;

export const transicoes = {
  padrao: "all 0.2s ease",
  suave: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
} as const;