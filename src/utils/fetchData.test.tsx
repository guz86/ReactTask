import axios from 'axios';
import { fetchData } from './fetchData';

jest.mock('axios');

describe('fetchData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data and return results', async () => {
    const mockData = {
      data: {
        results: [1, 2, 3],
      },
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      mockData
    );

    const result = await fetchData<number>('http://example.com/api/data');

    expect(result).toEqual([1, 2, 3]);

    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should log an error if the fetch fails', async () => {
    const mockError = new Error('Network Error');
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      mockError
    );

    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    try {
      await fetchData<number>('http://example.com/api/data');
      fail('fetchData should throw an error');
    } catch (error) {
      expect(error).toEqual(mockError);
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching data:',
        mockError
      );
    }
  });
});
