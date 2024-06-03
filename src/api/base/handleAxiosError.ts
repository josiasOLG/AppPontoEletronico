import axios, { AxiosError } from "axios";

export async function handleAxiosError(error: unknown, data?: any) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    // Inicialização básica do logData
    let logData = {
      ErrorType: "Axios Error",
      ErrorMessage: "",
      ErrorStack: axiosError.stack || "",
      DataHora: new Date().toISOString(),
    };

    // Construindo detalhes do erro
    if (axiosError.response) {
      // O servidor respondeu com um status fora do intervalo de 2xx
      logData.ErrorType += " - Response Error";
      logData.ErrorMessage = `Axios Error - Response Error: Message: ${
        axiosError.message
      }, Data: ${JSON.stringify(axiosError.response.data)}, Status: ${
        axiosError.response.status
      }, Headers: ${JSON.stringify(
        axiosError.response.headers
      )}, DATA: ${JSON.stringify(data)}`;
    } else if (axiosError.request) {
      // A requisição foi feita mas não houve resposta
      logData.ErrorType += " - Request Error";
      logData.ErrorMessage = `Axios Error - Request Error: Message: ${
        axiosError.message
      }, Request: ${JSON.stringify(
        axiosError.request
      )}, , DATA: ${JSON.stringify(data)}`;
    } else {
      // Algo aconteceu na configuração da requisição que disparou um erro
      logData.ErrorType += " - Config Error";
      logData.ErrorMessage = `Axios Error - Config Error: Message: ${
        axiosError.message
      }, DATA: ${JSON.stringify(data)}`;
    }

    try {
      await axios.post("http://www.api.trucogolds.info/api/Log", logData, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (logError) {
      console.error("Error logging to API", logError);
    }

    throw error;
  } else {
    // Erros que não são de Axios
    console.error("Unexpected Error", error);
    const errorMessage = error instanceof Error ? error.message : "";
    const errorStack = error instanceof Error ? error.stack || "" : "";
    const logData = {
      ErrorType: "Non-Axios Error",
      ErrorMessage: `Non-Axios Error: ${errorMessage} , DATA: ${JSON.stringify(
        data
      )}`,
      ErrorStack: errorStack,
      DataHora: new Date().toISOString(),
    };

    try {
      await axios.post("http://www.api.trucogolds.info/api/Log", logData, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (logError) {
      console.error("Error logging to API", logError);
    }

    throw new Error("An unexpected error occurred");
  }
}

async function logErrorToAPI(errorType, errorMessage, errorStack) {
  const apiUrl = "http://www.api.trucogolds.info/api/Log";
  const errorData = {
    ErrorType: errorType,
    ErrorMessage: errorMessage,
    ErrorStack: errorStack,
    DataHora: new Date().toISOString(),
  };

  try {
    await axios.post(apiUrl, errorData);
  } catch (error) {
    console.error("Erro ao enviar log para a API", error);
  }
}

export const globalErrorHandler = (error, isFatal) => {
  const errorType = isFatal ? "Fatal Error" : "Non-Fatal Error";
  const errorMessage = error.message;
  const errorStack = error.stack || "";
  logErrorToAPI(errorType, errorMessage, errorStack);
};
