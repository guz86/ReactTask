import { useState, useRef } from 'react';
import { PEOPLE_SEARCH_URL } from '../../constants';
import './DownloadButton.css';

interface Character {
  name: string;
  height: string;
  mass: string;
  url: string;
}

interface DownloadButtonProps {
  selectedItems: string[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ selectedItems }) => {
  const [loading, setLoading] = useState(false);
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const fetchSelectedData = async (): Promise<Character[]> => {
    try {
      const promises = selectedItems.map(async (id) => {
        const response = await fetch(`${PEOPLE_SEARCH_URL}/${id}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json() as Promise<Character>;
      });
      return await Promise.all(promises);
    } catch (error) {
      console.error('Error fetching selected data:', error);
      return [];
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    const selectedData = await fetchSelectedData();
    setLoading(false);

    if (selectedData.length > 0) {
      const csvContent = [
        ['Name', 'Height', 'Mass', 'Details URL'],
        ...selectedData.map((character) => [
          character.name,
          character.height,
          character.mass,
          character.url,
        ]),
      ]
        .map((e) => e.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = url;
        downloadLinkRef.current.download = `${selectedItems.length}_characters.csv`;
        downloadLinkRef.current.click();
      }

      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <button
        onClick={handleDownload}
        className="download-button"
        disabled={loading}
      >
        {loading ? 'Downloading...' : 'Download'}
      </button>
      <a ref={downloadLinkRef} style={{ display: 'none' }} />
    </>
  );
};

export default DownloadButton;
