import ApiBase from "../ApiBase";
import { PontoEletronicoDTO } from "../dtos/PontoEletronicoDTO";

export default class CameraAPI extends ApiBase {
  private static instance: CameraAPI;

  private constructor() {
    super("/Ponto/Register");
  }

  // Método estático para acessar a instância singleton da classe
  public static getInstance(): CameraAPI {
    if (!this.instance) {
      this.instance = new CameraAPI();
    }
    return this.instance;
  }

  public async registerPoint(data: PontoEletronicoDTO): Promise<any> {
    try {
      return await this.post<any, any>(``, data);
    } catch (error) {
      console.error("Erro ao registrar ponto eletronico:", error);
      throw error;
    }
  }
}
