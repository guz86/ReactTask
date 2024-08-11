import { ThemeSwitcher } from '../../components/ThemeSwitcher/ThemeSwitcher';
import Results from '../../components/Results';
import './index.css';

export default function Home() {
  return (
    <div>
      <ThemeSwitcher />
      <Results />
    </div>
  );
}
