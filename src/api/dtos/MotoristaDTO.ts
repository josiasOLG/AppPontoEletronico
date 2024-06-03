export interface EscalaMotoristaEntradaDTO {
  Descricao: string;
  BateuPonto: boolean;
  DataEntradaProgramada?: string;
  HoraInicioProgramada: string;
  EmployeeId: string;
  LocalEntradaProgramadoId: string;
  LocalEntradaProgramado: string;
  Id: string;
}

export interface EscalaMotoristasDTO {
  escalaMotoristaEntrada: EscalaMotoristaEntradaDTO[];
}
