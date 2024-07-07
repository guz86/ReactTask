import axios from 'axios';

export class ApiService {
  fetchData<T>(url: string): Promise<T[]> {
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
}
