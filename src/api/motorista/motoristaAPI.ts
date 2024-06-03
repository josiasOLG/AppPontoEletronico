import ApiBase from "../ApiBase";
import { EscalaMotoristasDTO } from "../dtos/MotoristaDTO";
import UserDTO from "../dtos/UserDTO";

export default class MotoristaAPI extends ApiBase {
  private static instance: MotoristaAPI;

  private constructor() {
    super("/EscalaMotorista/GetByCpfNomeAndMonth");
  }

  // Método estático para acessar a instância singleton da classe
  public static getInstance(): MotoristaAPI {
    if (!this.instance) {
      this.instance = new MotoristaAPI();
    }
    return this.instance;
  }

  public async getUser(id: number): Promise<UserDTO> {
    try {
      const response = await this.get<UserDTO>(`/${id}`);
      return response;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  }

  public async getAllMotoristas(
    id: string,
    nome: string,
    month: string
  ): Promise<any> {
    try {
      const response = await this.get<any>(
        `/?id=${id}&nome=${nome}&month=${month}`
      );
      console.log(`/?id=${id}&nome=${nome}&month=${month}`);
      return response;
    } catch (error) {
      console.error("Erro ao buscar todos os motoristas:", error);
      throw error;
    }
  }
}
