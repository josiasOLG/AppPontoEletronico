import axios, { AxiosError } from 'axios';

export function handleAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error('Axios Error', axiosError.message);
    // Log detalhado do erro
    if (axiosError.response) {
      // O servidor respondeu com um status fora do intervalo de 2xx
      console.error('Data:', axiosError.response.data);
      console.error('Status:', axiosError.response.status);
      console.error('Headers:', axiosError.response.headers);
    } else if (axiosError.request) {
      // A requisição foi feita mas não houve resposta
      console.error('Request:', axiosError.request);
    } else {
      // Algo aconteceu na configuração da requisição que disparou um erro
      console.error('Error Message:', axiosError.message);
    }
    // Aqui você pode decidir se deseja tratar alguns erros de forma diferente,
    // por exemplo, redirecionar para uma tela de erro ou mostrar uma mensagem específica.
    throw error;
  } else {
    // Erros que não são de Axios
    console.error('Unexpected Error', error);
    throw new Error('An unexpected error occurred');
  }
}
