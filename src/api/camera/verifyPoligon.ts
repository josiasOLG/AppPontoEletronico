import ApiBase from "../ApiBase";
import { PontoEletronicoDTO } from "../dtos/PontoEletronicoDTO";

export default class VerifyPoligonAPI extends ApiBase {
  private static instance: VerifyPoligonAPI;

  private constructor() {
    super("/PointPolygon/VerifyPointIsInPolygon");
  }

  // Método estático para acessar a instância singleton da classe
  public static getInstance(): VerifyPoligonAPI {
    if (!this.instance) {
      this.instance = new VerifyPoligonAPI();
    }
    return this.instance;
  }


  public async verifyPointIsPoligon(data: any) {
    try {
      return await this.post<any, any>(``, data);
    } catch (error) {
      console.error("Erro ao registrar ponto eletronico:", error);
      throw error;
    }
  }
}
