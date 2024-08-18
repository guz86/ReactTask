import { useState } from 'react';
import { useAppDispatch } from '../../app/store';
import { setUserData } from '../../app/features/reacthookform/reacthookformSlice';
import { useNavigate } from 'react-router-dom';
import './UncontrolledForm.css';

interface IFormInput {
  name: string;
  age: number;
  email: string;
}

export const UncontrolledForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<IFormInput>({
    name: '',
    age: 0,
    email: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof IFormInput, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof IFormInput, string>> = {};
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
      newErrors.age = 'Name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(setUserData(formData));
    setFormData({ name: '', age: 0, email: '' });
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

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
