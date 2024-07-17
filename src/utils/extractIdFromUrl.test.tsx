import { extractIdFromUrl } from './extractIdFromUrl';

describe('extractIdFromUrl', () => {
  test('should extract ID from a valid URL', () => {
    const url = 'http://example.com/api/123/';
    const result = extractIdFromUrl(url);
    expect(result).toBe('123');
  });

  test('should return "Unknown" for an invalid URL', () => {
    const url = 'http://example.com/api/abc/';
    const result = extractIdFromUrl(url);
    expect(result).toBe('Unknown');
  });

  test('should return "Unknown" for a URL without trailing slash', () => {
    const url = 'http://example.com/api/123';
    const result = extractIdFromUrl(url);
    expect(result).toBe('Unknown');
  });

  test('should return "Unknown" for an empty URL', () => {
    const url = '';
    const result = extractIdFromUrl(url);
    expect(result).toBe('Unknown');
  });
});
