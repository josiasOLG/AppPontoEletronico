// utils.ts

export function getCurrentDateInPortuguese() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthNames = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const monthName = monthNames[currentDate.getMonth()];

    return `${day} de ${monthName}`;
}

export function ordenarPorDatasProximas(data) {
  const agora = new Date();
  return data.map((item) => ({
      ...item,
      HoraInicioProgramada: item.HoraInicioProgramada ? new Date(item.HoraInicioProgramada) : null,
      HoraFimProgramada: item.HoraFimProgramada ? new Date(item.HoraFimProgramada) : null,
      DataFolgaProgramada: item.DataFolgaProgramada ? new Date(item.DataFolgaProgramada) : null,
  })).sort((a, b) => {
      if (a.HoraInicioProgramada && b.HoraInicioProgramada) {
          const distanciaEntradaA = Math.abs(agora.getTime() - a.HoraInicioProgramada.getTime());
          const distanciaEntradaB = Math.abs(agora.getTime() - b.HoraInicioProgramada.getTime());
          if (distanciaEntradaA !== distanciaEntradaB) {
              return distanciaEntradaA - distanciaEntradaB;
          }
      }
      if (a.HoraFimProgramada && b.HoraFimProgramada) {
          const distanciaSaidaA = Math.abs(agora.getTime() - a.HoraFimProgramada.getTime());
          const distanciaSaidaB = Math.abs(agora.getTime() - b.HoraFimProgramada.getTime());
          if (distanciaSaidaA !== distanciaSaidaB) {
              return distanciaSaidaA - distanciaSaidaB;
          }
      }
      if (a.DataFolgaProgramada && b.DataFolgaProgramada) {
          const distanciaFolgaA = Math.abs(agora.getTime() - a.DataFolgaProgramada.getTime());
          const distanciaFolgaB = Math.abs(agora.getTime() - b.DataFolgaProgramada.getTime());
          return distanciaFolgaA - distanciaFolgaB;
      }
      return 0;
  });
}

export const getCurrentMonthFirstDay = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
};



export const formatarData2 = (data)  => {
  // Extrair os componentes da data
  let dia = data.getDate();
  let mes = data.getMonth() + 1; // getMonth() retorna um valor de 0 a 11
  let ano = data.getFullYear();
  let hora = data.getHours();
  let minuto = data.getMinutes();

  // Formatar cada componente para garantir dois dígitos
  dia = dia < 10 ? '0' + dia : dia;
  mes = mes < 10 ? '0' + mes : mes;
  hora = hora < 10 ? '0' + hora : hora;
  minuto = minuto < 10 ? '0' + minuto : minuto;

  // Montar a string formatada
  return `${dia}/${mes}/${ano}`;
}

export const formatarData = (data)  => {
  // Extrair os componentes da data
  let dia = data.getDate();
  let mes = data.getMonth() + 1; // getMonth() retorna um valor de 0 a 11
  let ano = data.getFullYear();
  let hora = data.getHours();
  let minuto = data.getMinutes();

  // Formatar cada componente para garantir dois dígitos
  dia = dia < 10 ? '0' + dia : dia;
  mes = mes < 10 ? '0' + mes : mes;
  hora = hora < 10 ? '0' + hora : hora;
  minuto = minuto < 10 ? '0' + minuto : minuto;

  // Montar a string formatada
  return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}
