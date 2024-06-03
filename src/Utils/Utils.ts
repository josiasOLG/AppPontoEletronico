// utils.ts
import moment from "moment";
import * as Location from "expo-location";
import { Dimensions, PixelRatio } from "react-native";

interface TempoRestante {
  tempoRestanteTexto: string;
  podeBaterPonto: boolean;
  atrasado: boolean;
}

export function getCurrentDateInPortuguese() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const monthNames = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const monthName = monthNames[currentDate.getMonth()];

  return `${day} de ${monthName}`;
}

export const converterParaISO = (dataString) => {
  // A string de data é dividida em data e hora
  const [data, horaComFuso] = dataString.split("T");

  // Remove o fuso horário da hora e adiciona os milissegundos
  const hora = horaComFuso.split("-")[0] + ".000";

  // Monta a nova string de data no formato ISO
  const dataISO = `${data}T${hora}Z`;

  return dataISO;
};

export function ordenarPorDatasProximas(data, tipoDeOrdenacao) {
  const agora = moment();

  const chaveDeOrdenacao = {
    entrada: "DataEntradaProgramada",
    saida: "DataSaidaProgramada",
    folga: "DataFolgaProgramada",
  }[tipoDeOrdenacao];

  return data
    .map((item) => ({
      ...item,
      distancia: item[chaveDeOrdenacao]
        ? Math.abs(agora.valueOf() - moment(item[chaveDeOrdenacao]).valueOf())
        : Infinity,
    }))
    .sort((a, b) => a.distancia - b.distancia);
}

export const getCurrentMonthFirstDay = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
};

export const getCurrentMonthFirstDay2 = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const year = firstDay.getFullYear();
  const month = (firstDay.getMonth() + 1).toString().padStart(2, "0"); // Garante que o mês seja em dois dígitos
  const day = firstDay.getDate().toString().padStart(2, "0"); // Garante que o dia seja em dois dígitos
  return `${year}-${month}-${day}`; // Formata a string no padrão YYYY-MM-DD
};

export const formatarData2 = (data) => {
  // Extrair os componentes da data
  let dia = data.getDate();
  let mes = data.getMonth() + 1; // getMonth() retorna um valor de 0 a 11
  let ano = data.getFullYear();
  let hora = data.getHours();
  let minuto = data.getMinutes();

  // Formatar cada componente para garantir dois dígitos
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;
  hora = hora < 10 ? "0" + hora : hora;
  minuto = minuto < 10 ? "0" + minuto : minuto;

  // Montar a string formatada
  return `${dia}/${mes}`;
};

export const fetchPlaceDetails = async (HomeAPI, itemId) => {
  try {
    if (itemId) {
      const placeDetails = await HomeAPI.getInstance().fetchPlaceById(itemId);
      const coordinates = placeDetails?.Perimetro?.Coordenadas.map((coord) => ({
        latitude: coord.Latitude,
        longitude: coord.Longitude,
      }));
      return coordinates;
    }
  } catch (error) {
    console.error("Erro ao buscar detalhes do local pelo ID:", error);
    return [];
  }
};

export const calcularTempoRestante = (
  dataProgramada: string
): TempoRestante => {
  const agora = moment();
  const horarioFinal = moment(dataProgramada);
  const diferenca = horarioFinal.diff(agora, "minutes"); // Diferença em minutos

  let podeBaterPonto = false;
  let tempoRestanteTexto = "";
  let atrasado = false;

  if (diferenca >= -10 && diferenca <= 10) {
    podeBaterPonto = true;
    if (diferenca >= 0) {
      tempoRestanteTexto = `Faltam ${diferenca} min`;
    } else {
      tempoRestanteTexto = `Atrasado ${Math.abs(diferenca)} min`;
      atrasado = true;
    }
  } else {
    tempoRestanteTexto = diferenca > 10 ? "Adiantado" : "Atrasado demais";
  }

  return { tempoRestanteTexto, podeBaterPonto, atrasado };
};

export const atualizarTempoRestante = (
  item: any,
  activeTab: any,
  setPodeBaterPonto: React.Dispatch<React.SetStateAction<boolean>>,
  setTempoRestanteTexto: React.Dispatch<React.SetStateAction<string>>,
  setAtrasado: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const dataProgramada =
    activeTab === "Entrada"
      ? item?.HoraInicioProgramada
      : item?.HoraFimProgramada;
  const { tempoRestanteTexto, podeBaterPonto, atrasado } =
    calcularTempoRestante(dataProgramada);

  setPodeBaterPonto(podeBaterPonto);
  setTempoRestanteTexto(tempoRestanteTexto);
  setAtrasado(atrasado);
};

const baseWidth = 375;
const scale = Dimensions.get("window").width / baseWidth;
const fontScale = PixelRatio.getFontScale();

export const remFontSize = (size) => size * scale * fontScale;

//Metodo que vertifica se o usuário está dentro do polygon

export const formatarData = (data) => {
  // Extrair os componentes da data
  let dia = data.getDate();
  let mes = data.getMonth() + 1; // getMonth() retorna um valor de 0 a 11
  let ano = data.getFullYear();
  let hora = data.getHours();
  let minuto = data.getMinutes();

  // Formatar cada componente para garantir dois dígitos
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;
  hora = hora < 10 ? "0" + hora : hora;
  minuto = minuto < 10 ? "0" + minuto : minuto;

  // Montar a string formatada
  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
};
