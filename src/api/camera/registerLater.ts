import ApiBase from "../ApiBase";
import { PontoEletronicoDTO } from "../dtos/PontoEletronicoDTO";

export default class RegisterLaterAPI extends ApiBase {
  private static instance: RegisterLaterAPI;

  private constructor() {
    super("");
  }

  // Método estático para acessar a instância singleton da classe
  public static getInstance(): RegisterLaterAPI {
    if (!this.instance) {
      this.instance = new RegisterLaterAPI();
    }
    return this.instance;
  }


  
  public async VerifyCodPermPoint(data: any): Promise<any> {
    try {
      return await this.post<any, any>(`/PermissaoBatePonto/VerificaCodigoPermissaoBatePonto`, data);
    } catch (error) {
      console.error("Erro ao registrar ponto eletronico:", error);
      throw error;
    }
  }

  public async registerPoint(data: PontoEletronicoDTO): Promise<any> {
    try {
      return await this.post<any, any>(`/Ponto/RegisterLater`, data);
    } catch (error) {
      console.error("Erro ao registrar ponto eletronico:", error);
      throw error;
    }
  }
}
