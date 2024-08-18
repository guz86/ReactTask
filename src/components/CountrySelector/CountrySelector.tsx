import React, { useState } from 'react';
import { useAppSelector } from '../../app/store';
import { selectCountries } from '../../app/features/countrySlice';
import './CountrySelector.css';

interface CountrySelectorProps {
  setSelectedCountry: (country: string) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  setSelectedCountry,
}) => {
  const countries = useAppSelector(selectCountries);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setSearchTerm(country);
    setIsDropdownOpen(false);
  };

  return (
    <div className="country-selector">
      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownOpen(true);
        }}
        placeholder="Select a country"
      />
      {isDropdownOpen && filteredCountries.length > 0 && (
        <ul className="country-list">
          {filteredCountries.map((country) => (
            <li
              key={country}
              onClick={() => handleCountrySelect(country)}
              className="country-list-item"
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
