import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setButtonStatus,
  setStatusText,
} from "../redux/actions/timeCircle.actions";

const useMotoristaData = (activeTab: any, motoristaData: any) => {
  const [tempoParaLiberacao, setTempoParaLiberacao] = useState(0);
  const [dataProgramada, setDataProgramada] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    let data;

    switch (activeTab) {
      case "Entrada":
        data = new Date(motoristaData.HoraInicioProgramada);
        break;
      case "Folga":
        data = new Date(motoristaData.DataFolgaProgramada);
        break;
      default:
        data = new Date(motoristaData.HoraFimProgramada);
        break;
    }

    setDataProgramada(data);

    const dataEntrada = new Date();
    const diff = data.getTime() - dataEntrada.getTime();
    const diffHoras = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
    const diffMinutos = Math.floor(
      (Math.abs(diff) % (1000 * 60 * 60)) / (1000 * 60)
    );
    const calculoTempo = (diff < 0 ? -1 : 1) * (diffHoras * 60 + diffMinutos);

    setTempoParaLiberacao(calculoTempo);
  }, [activeTab, motoristaData]);

  useEffect(() => {
    if (tempoParaLiberacao > 10) {
      dispatch(setStatusText("AGUARDE"));
      dispatch(setButtonStatus(true));
    } else if (tempoParaLiberacao <= 10 && tempoParaLiberacao > 0) {
      dispatch(setStatusText("NO HORÁRIO"));
      dispatch(setButtonStatus(false));
    } else if (tempoParaLiberacao < 0 && tempoParaLiberacao >= -10) {
      dispatch(setStatusText("ATRASADO"));
      dispatch(setButtonStatus(false));
    } else if (tempoParaLiberacao < -10) {
      dispatch(setStatusText("EM ANALISE"));
      dispatch(setButtonStatus(false));
    }
  }, [tempoParaLiberacao, dispatch]);

  return { tempoParaLiberacao, dataProgramada };
};

export default useMotoristaData;
