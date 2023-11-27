import { useState } from 'react';
import verifyHorsAPI from '../api/camera/verifyHors';
import { getLocation, getLogin } from '../secure/secureStoreService';
import { PontoEletronicoDTO } from '../api/dtos/PontoEletronicoDTO';
import CameraAPI from '../api/camera/cameraAPI';
import moment from 'moment-timezone';
import RegisterLaterAPI from '../api/camera/registerLater';
import { hideLoading, showLoading } from '../redux/actions/loadingActions';


/**
 * Hook personalizado para verificação da hora e registro de ponto.
 *
 * @param {Object} motoristaData - Dados do motorista.
 * @param {string} imagem - Imagem capturada para registro.
 * @param {Object} param - Parâmetros adicionais.
 * @returns {Object} Funções de verificação e registro.
 */
export const useTimeVerificationLater = (motoristaData, imagem, param, codigo, onSuccess, dispatch) => {
  const TIME_THRESHOLD = 5 * 60 * 1000; // 5 minutos em milissegundos

  /**
   * Verifica a hora atual do servidor para garantir a integridade do registro de ponto.
   * @returns {Promise<Date|null>} Um objeto Date com a hora atual do servidor ou null em caso de erro.
   */
  const checkTime = async () => {
    try {
      const currentTimeString = await verifyHorsAPI.verifyTime();
      const dateTimeInSaoPaulo = moment.tz(currentTimeString, "America/Sao_Paulo");
      return dateTimeInSaoPaulo.toDate(); // Converte para um objeto Date
    } catch (error) {
      console.error("Erro ao obter a hora:", error);
      return null;
    }
  };

  /**
   * Registra o ponto eletrônico.
   * @returns {Promise<void>} Promessa que representa o processo de registro.
   */
  const register = async () => {
    try {
      dispatch(showLoading());
      const location = await getLocation();
      const login = await getLogin();

      let data: PontoEletronicoDTO = {
        EscalaMotoristaId: motoristaData.Id,
        Latitude: location.latitude,
        Longitude: location.longitude,
        CurrentTime: new Date().toISOString(),
        DataEntrada: motoristaData?.HoraInicioProgramada ? motoristaData?.HoraInicioProgramada :  motoristaData?.HoraFimProgramada,
        DataSaida: motoristaData?.HoraFimProgramada ? motoristaData?.HoraFimProgramada :  motoristaData?.HoraInicioProgramada,
        Tipo: "Data" + param.activeTab,
        EmployeeId: motoristaData.EmployeeId,
        LocalSaidaProgramadoId: motoristaData.LocalEntradaProgramadoId,
        Digital: "1",
        Foto: imagem,
        CodigoFuncionario: login,
        CodigoBatePonto: codigo
      };
      console.log(data);
      await RegisterLaterAPI.getInstance().registerPoint(data);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("ERROR>>", error);
    }
  };

  return { checkTime, register };
};
