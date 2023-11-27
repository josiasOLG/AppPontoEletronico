import axiosInstanceHors from "../base/axiosInstancehors";

/**
 * Classe para verificar informações de polígono e hora.
 */
export default class verifyHorsAPI {

  /**
   * Método estático para obter a hora atual de um serviço de tempo confiável.
   * 
   * Faz uma requisição GET para a API 'http://worldtimeapi.org/api/ip'
   * e retorna a data e hora atual.
   *
   * @returns {Promise<string>} A data e hora atual no formato ISO.
   * @throws {Error} Lança um erro se a requisição falhar.
   */
  static async verifyTime() {
    try {
      const response = await axiosInstanceHors.get('timezone/America/Sao_Paulo');
      // console.log(response.data);
      return response.data.datetime;
    } catch (error) {
      console.error('Erro ao verificar a hora:', error);
      throw error;
    }
  }
}
