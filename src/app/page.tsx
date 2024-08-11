'use client';

import ClientProviders from '../components/ClientProviders';
import Results from '../components/Results';
import { ThemeSwitcher } from '../components/ThemeSwitcher/ThemeSwitcher';

export default function Home() {
  return (
    <ClientProviders>
      <div>
        <ThemeSwitcher />
        <Results />
      </div>
    </ClientProviders>
  );
}
