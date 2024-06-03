import { getCurrentMonthFirstDay } from "../../Utils/Utils";
import MotoristaAPI from "../../api/motorista/motoristaAPI";
import { getProfile } from "../../secure/secureStoreService";
import {
  clearEscalasMotoristasTable,
  existsInEscalasMotoristas,
  fetchAllEscalasMotoristas,
  fetchEscalasMotoristasByNome,
  insertIntoEscalasMotoristas,
  updateEscalasMotoristas,
} from "../tables/EscalasMotoristas";

export const syncData = async (userData: any) => {
  try {
    await clearEscalasMotoristasTable();
    const profile = await getProfile();
    const id = profile?.id;
    const dateForAPI = getCurrentMonthFirstDay();
    const response = await MotoristaAPI.getInstance().getAllMotoristas(
      id,
      profile.firstName,
      encodeURIComponent(dateForAPI)
    );
    console.log("id > ", id);
    console.log(
      "encodeURIComponent(dateForAPI) > ",
      encodeURIComponent(dateForAPI)
    );
    const data = response;

    const processItems = async (items: any[]) => {
      const promises = items.map(async (item) => {
        const commonData = buildCommonData(item);
        await insertOrUpdate(commonData);
      });
      await Promise.all(promises);
    };
    await processItems(data.EscalaMotoristasDTO.EscalaMotoristaEntrada);
    await processItems(data.EscalaMotoristasDTO.EscalaMotoristaFolga);
    await processItems(data.EscalaMotoristasDTO.EscalaMotoristaSaida);

    return {
      status: "success",
      message: "Sincronização bem-sucedida!",
    };
  } catch (error: any) {
    // console.log(error.message);
    return {
      status: "error",
      message: error.message,
    };
  }
};

const buildCommonData = (item: any) => {
  const id = item.Id.toString();

  let descricao = item.Descricao || "";
  if (descricao === "Saída programada") {
    descricao = "saida";
  } else if (descricao === "Dia de folga") {
    descricao = "folga";
  } else if (descricao === "Entrada programada") {
    descricao = "entrada";
  }

  return {
    Id: id,
    Descricao: descricao,
    BateuPonto: item.BateuPonto || false,
    DataEntradaProgramada: item.DataEntradaProgramada,
    HoraInicioProgramada: item.HoraInicioProgramada,
    DataSaidaProgramada: item.DataSaidaProgramada,
    HoraFimProgramada: item.HoraFimProgramada,
    HoraFolgaProgramada: item.DataFolgaProgramada,
    DataFolgaProgramada: item.DataFolgaProgramada,
    EmployeeId: item.EmployeeId || "",
    LocalEntradaProgramadoId:
      item.LocalEntradaProgramadoId || item.LocalSaidaProgramadoId || "",
    LocalEntradaProgramado:
      item.LocalEntradaProgramado || item.LocalSaidaProgramado || "",
  };
};

const insertOrUpdate = async (commonData: any) => {
  const id = commonData.Id;
  // console.log(id);
  if (await existsInEscalasMotoristas(id)) {
    await updateEscalasMotoristas(commonData);
  } else {
    await insertIntoEscalasMotoristas(commonData);
  }
};

export const fetchAllFromService = async () => {
  try {
    const escalasMotoristas = await fetchAllEscalasMotoristas();
    return escalasMotoristas;
  } catch (error) {
    console.error("Erro ao buscar escalas dos motoristas:", error);
    throw error;
  }
};

export const fetchAllFromServiceNome = async (nome: string): Promise<any> => {
  try {
    console.log(nome);
    switch (nome) {
      case "entrada":
        return await fetchEscalasMotoristasByNome(nome);
      case "saida":
        return await fetchEscalasMotoristasByNome(nome);
      default:
        return await fetchEscalasMotoristasByNome(nome);
    }
  } catch (error) {
    console.error("Erro ao buscar escalas dos motoristas:", error);
    throw error;
  }
};
