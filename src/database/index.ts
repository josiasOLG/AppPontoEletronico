import { initDatabase } from "./tables/EscalasMotoristas";
import { initLogErrorTable } from "./tables/LogErro";

export const initDatabases = async () => {
  await initDatabase();
  await initLogErrorTable();
};
