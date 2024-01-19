// utils.ts
import moment from 'moment';

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
  const [data, horaComFuso] = dataString.split('T');
  
  // Remove o fuso horário da hora e adiciona os milissegundos
  const hora = horaComFuso.split('-')[0] + '.000';

  // Monta a nova string de data no formato ISO
  const dataISO = `${data}T${hora}Z`;

  return dataISO;
}

export function ordenarPorDatasProximas(data) {
  const agora = moment(); // Momento atual

  return data
    .map((item) => ({
      ...item,
      HoraInicioProgramada: item.HoraInicioProgramada,
      HoraFimProgramada: item.HoraFimProgramada,
      DataFolgaProgramada: item.DataFolgaProgramada
    }))
    .sort((a, b) => {
      if (a.HoraInicioProgramada && b.HoraInicioProgramada) {
        const distanciaEntradaA = Math.abs(
          agora.valueOf() - moment(a.HoraInicioProgramada).valueOf()
        );
        const distanciaEntradaB = Math.abs(
          agora.valueOf() - moment(b.HoraInicioProgramada).valueOf()
        );
        return distanciaEntradaA - distanciaEntradaB;
      }
      if (a.HoraFimProgramada && b.HoraFimProgramada) {
        const distanciaSaidaA = Math.abs(
          agora.valueOf() - moment(a.HoraFimProgramada).valueOf()
        );
        const distanciaSaidaB = Math.abs(
          agora.valueOf() - moment(b.HoraFimProgramada).valueOf()
        );
        return distanciaSaidaA - distanciaSaidaB;
      }
      if (a.DataFolgaProgramada && b.DataFolgaProgramada) {
        const distanciaFolgaA = Math.abs(
          agora.valueOf() - moment(a.DataFolgaProgramada).valueOf()
        );
        const distanciaFolgaB = Math.abs(
          agora.valueOf() - moment(b.DataFolgaProgramada).valueOf()
        );
        return distanciaFolgaA - distanciaFolgaB;
      }
      return 0;
    });
}

export const getCurrentMonthFirstDay = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
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
  return `${dia}/${mes}/${ano}`;
};

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
