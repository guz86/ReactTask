import { NavLink } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/uncontrolled-form"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            Uncontrolled Form
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/react-hook-form"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            React Hook Form
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
