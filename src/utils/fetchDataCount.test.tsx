import axios from 'axios';
import { fetchDataCount } from './fetchDataCount';

jest.mock('axios');

describe('fetchDataCount', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch data and return the count', async () => {
    const mockData = {
      data: {
        count: 42,
      },
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      mockData
    );

    const result = await fetchDataCount('http://example.com/api/data');

    expect(result).toEqual(42);

    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  test('should log an error if the fetch fails', async () => {
    const mockError = new Error('Network Error');
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      mockError
    );

    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    try {
      await fetchDataCount('http://example.com/api/data');
      fail('fetchDataCount should throw an error');
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
