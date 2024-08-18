import { useState } from 'react';
import { useAppDispatch } from '../../app/store';
import { setUserData } from '../../app/features/reacthookform/reacthookformSlice';
import { useNavigate } from 'react-router-dom';
import './UncontrolledForm.css';

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
}

export const UncontrolledForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<IFormInput>({
    name: '',
    age: 0,
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof IFormInput, string>>
  >({});

  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const checkPasswordStrength = (password: string) => {
    const strengthRequirements = [/[A-Z]/, /[a-z]/, /[0-9]/, /[\W_]/];

    const metRequirements = strengthRequirements.every((regex) =>
      regex.test(password)
    );
    if (metRequirements) return 'Strong';
    if (password.length >= 8) return 'Moderate';
    return 'Weak';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof IFormInput, string>> = {};

    // Проверка обязательных полей и их значений
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-ZА-Я]/.test(formData.name)) {
      newErrors.name = 'Name must start with an uppercase letter';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = 'Age must be a positive number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        'Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character';
    }

    if (formData.password !== confirmPassword) {
      newErrors.password = 'Passwords must match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(setUserData({ ...formData, password: formData.password }));
    setFormData({ name: '', age: 0, email: '', password: '' });
    setConfirmPassword('');
    navigate('/');
  };

  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form className="uncontrolledForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            value={formData.age || ''}
            onChange={handleChange}
          />
        </div>
        <div>{errors.age && <p className="error-message">{errors.age}</p>}</div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">
            Password (
            <span className="password-strength">{passwordStrength}</span>)
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div>
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
