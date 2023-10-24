import ApiBase from '../ApiBase';
import MotoristaDTO from '../dtos/MotoristaDTO';
import UserDTO from '../dtos/UserDTO';

export default class MotoristaAPI extends ApiBase {
  private static instance: MotoristaAPI;

  private constructor() {
    super('/motoristas');
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
      // Adicione o tratamento de erro aqui
      console.error('Erro ao buscar usuário:', error);
      throw error; // Rejogue o erro para que ele possa ser tratado por chamadas superiores, se necessário.
    }
  }

  public async getAllMotoristas(): Promise<{ data: MotoristaDTO[], status: number }> {
    try {
      const response = await this.get<MotoristaDTO[]>('/');
      return {
        data: response,
        status: 200 // Você pode substituir este valor pelo status real se sua API retorná-lo.
      };
    } catch (error) {
      // Adicione o tratamento de erro aqui
      console.error('Erro ao buscar todos os motoristas:', error);
      throw error; // Rejogue o erro para que ele possa ser tratado por chamadas superiores, se necessário.
    }
  }
}
