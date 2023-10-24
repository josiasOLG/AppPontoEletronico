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
