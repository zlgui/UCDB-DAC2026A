import type { DashboardItem } from "../types/dashboardItem.type";

const API_URL = "http://localhost:3000";

export async function getDashboardData(): Promise<DashboardItem[]> {
  const response = await fetch(
    `${API_URL}/registros-educacionais/dashboard/data`,
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados (HTTP ${response.status})`);
  }

  return response.json();
}
