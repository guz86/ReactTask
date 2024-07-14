import axios from 'axios';

export function fetchData<T>(url: string): Promise<T[]> {
  return axios
    .get(url)
    .then((response) => {
      return response.data.results as T[];
    })
    .catch((error: Error) => {
      console.error('Error fetching data:', error);
      throw error;
    });
}

export function fetchDataCount(url: string): Promise<number> {
  return axios
    .get(url)
    .then((response) => {
      return response.data.count as number;
    })
    .catch((error: Error) => {
      console.error('Error fetching data:', error);
      throw error;
    });
}
