import MotoristaAPI from "../../api/motorista/motoristaAPI";
import { existsInEscalasMotoristas, fetchAllEscalasMotoristas, insertIntoEscalasMotoristas, updateEscalasMotoristas } from "../tables/EscalasMotoristas";

export const syncData = async () => {
  try {
    const response = await MotoristaAPI.getInstance().getAllMotoristas();
    if (response.status === 200) {
      const data = response.data;
      for (const item of data) {
        const id = item.Id.toString();

        if (await existsInEscalasMotoristas(id)) {
          await updateEscalasMotoristas({
            Id: id,
            Data: item.Data,
            HoraInicio: item.HoraInicio,
            HoraFim: item.HoraFim,
            EhFolga: item.EhFolga, // Você pode definir um valor padrão
            DiaFinalizado: item.DiaFinalizado, // Você pode definir um valor padrão
            MotoristaId: item.MotoristaId,
            EmployeePerimetroId: item.EmployeePerimetroId, // Você pode definir um valor padrão
            Descricao: item.Descricao || '', // Verifique se 'descricao' está definido ou forneça um valor padrão
            DateCreated: item.DateCreated, // Você pode definir um valor padrão
            DateUpdated: item.DateUpdated, // Você pode definir um valor padrão
            DateDeleted: item.DateDeleted, // Você pode definir um valor padrão
          });
        } else {
          await insertIntoEscalasMotoristas({
            Id: id,
            Data: item.Data,
            HoraInicio: item.HoraInicio,
            HoraFim: item.HoraFim,
            EhFolga: item.EhFolga, // Você pode definir um valor padrão
            DiaFinalizado: item.DiaFinalizado, // Você pode definir um valor padrão
            MotoristaId: item.MotoristaId,
            EmployeePerimetroId: item.EmployeePerimetroId, // Você pode definir um valor padrão
            Descricao: item.Descricao || '', // Verifique se 'descricao' está definido ou forneça um valor padrão
            DateCreated: item.DateCreated, // Você pode definir um valor padrão
            DateUpdated: item.DateUpdated, // Você pode definir um valor padrão
            DateDeleted: item.DateDeleted, // Você pode definir um valor padrão
          });
        }
      }      
    }
  } catch (error: any) {
    console.error("Sync failed:", error);
    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
      console.error("Response Headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request made but no response received. Request:", error.request);
    } else {
      console.error("Error details:", error.message);
    }
  }
};


export const fetchAllFromService = async () => {
    try {
        const escalasMotoristas = await fetchAllEscalasMotoristas();
        // console.log(escalasMotoristas); // Você pode removê-lo depois que verificar que tudo está funcionando

        return escalasMotoristas;
    } catch (error) {
        console.error("Erro ao buscar escalas dos motoristas:", error);
        throw error; // Isso irá permitir que você trate o erro em um nível superior, se necessário
    }
};


