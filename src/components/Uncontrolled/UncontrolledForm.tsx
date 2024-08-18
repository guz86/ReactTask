import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/store';
import { setUserData } from '../../app/features/reacthookform/reacthookformSlice';
import { useNavigate } from 'react-router-dom';
import './UncontrolledForm.css';

interface IFormInput {
  name: string;
  age: number;
  email: string;
  // password: string;
  // confirmPassword: string;
  // gender: 'male' | 'female' | 'other';
  // terms: boolean;
  // picture: FileList;
  // country: string;
}

export const UncontrolledForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(setUserData(data));
    reset();
    navigate('/');
  };

  return (
    <>
      <h1>Uncontrolled Form</h1>
      <>
        <form className="uncontrolledForm" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              {...register('name', {
                required: 'Name is required',
                validate: (value) =>
                  /^[A-ZА-Я]/.test(value) ||
                  'Name must start with an uppercase letter',
              })}
            />
          </div>
          <div>
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              {...register('age', {
                required: 'Age is required',
                valueAsNumber: true,
                validate: {
                  positive: (value) =>
                    value > 0 || 'Age must be a positive number',
                },
              })}
            />
          </div>
          <div>
            {errors.age && (
              <p className="error-message">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
          </div>
          <div>
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <input type="submit" value="Submit" />
        </form>
      </>
    </>
  );
};
