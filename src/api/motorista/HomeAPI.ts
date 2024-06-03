import ApiBase from "../ApiBase";

export default class HomeAPI extends ApiBase {
  private static instance: HomeAPI;

  private constructor() {
    super("");
  }

  public static getInstance(): HomeAPI {
    if (!this.instance) {
      this.instance = new HomeAPI();
    }
    return this.instance;
  }

  public async getMotorista(
    url: string,
    id: string,
    nome: string,
    month: string
  ): Promise<any> {
    try {
      const response = await this.get<any>(`${url}/${id}/${month}`);
      return response;
    } catch (error) {
      console.error("Erro ao buscar todos os motoristas:", error);
      throw error;
    }
  }

  public async fetchAllFromServiceNomeHomeAPI(
    nome: string,
    nomeUser: string,
    id: string,
    month: string
  ): Promise<any> {
    try {
      switch (nome) {
        case "entrada":
          const dataEntrada = await this.getMotorista(
            "EscalaMotoristaEntrada",
            nomeUser,
            id,
            month
          );
          return dataEntrada?.EscalaMotoristasDTO?.EscalaMotoristaEntrada;
        case "saida":
          const dataSaida = await this.getMotorista(
            "EscalaMotoristaSaida",
            nomeUser,
            id,
            month
          );
          return dataSaida?.EscalaMotoristasDTO?.EscalaMotoristaSaida;
        default:
          const dataFolga = await this.getMotorista(
            "EscalaMotoristaFolga",
            nomeUser,
            id,
            month
          );
          return dataFolga?.EscalaMotoristasDTO?.EscalaMotoristaFolga;
      }
    } catch (error) {
      console.error("Erro ao buscar escalas dos motoristas:", error);
      throw error;
    }
  }

  public async fetchPlaceById(id: string): Promise<any> {
    try {
      const response = await this.get<any>(`Place/ById/${id}`);
      return response;
    } catch (error) {
      console.error("Erro ao buscar detalhes do local:", error);
      throw error;
    }
  }

  public async checkIfInsidePerimeter(
    latitude: number,
    longitude: number,
    perimeterId: string
  ): Promise<boolean> {
    try {
      const response = await this.post<any, any>(
        "PointPolygon/VerifyPointIsInPolygon",
        {
          Latitude: latitude,
          Longitude: longitude,
          PerimetroId: perimeterId,
        }
      );
      return response.IsValid; // Supondo que a API retorna um objeto com a propriedade isInside
    } catch (error) {
      console.error(
        "Erro ao verificar se o ponto está dentro do perímetro:",
        error
      );
      throw error;
    }
  }
}
