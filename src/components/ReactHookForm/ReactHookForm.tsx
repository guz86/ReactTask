import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import './ReactHookForm.css';
import { selectCountries } from '../../app/features/countrySlice';
import { setUserData } from '../../app/features/formSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidationSchema = yup
  .object({
    name: yup.string().required('Name is required'),
    age: yup
      .number()
      .min(1, 'Age must be greater than 0')
      .required('Age is required'),
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
    gender: yup.string().required('Gender is required'),
    termsAccepted: yup.boolean().oneOf([true], 'You must accept the terms'),
    profilePicture: yup.string().required('Profile picture is required'),
    selectedCountry: yup.string().required('Country selection is required'),
  })
  .required();

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  termsAccepted: boolean;
  profilePicture: string;
  selectedCountry: string;
}

const ReactHookForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<IFormInput>({
    resolver: yupResolver(formValidationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      gender: '',
      termsAccepted: false,
      profilePicture: '',
      selectedCountry: '',
    },
  });

  const onSubmit = (data: IFormInput) => {
    dispatch(setUserData(data));

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              onChange={(e) => {
                field.onChange(e);
                trigger('name');
              }}
            />
          )}
        />
        <div>
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>
      </div>

      <div>
        <label>Age:</label>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                trigger('age');
              }}
            />
          )}
        />
        <div>
          {errors.age && <p className="error-message">{errors.age.message}</p>}
        </div>
      </div>

      <div>
        <label>Email:</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              type="email"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                trigger('email');
              }}
            />
          )}
        />
        <div>
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label>Password:</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              type="password"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                trigger('password');
              }}
            />
          )}
        />
        <div>
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div>
        <label>Gender:</label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              onChange={(e) => {
                field.onChange(e);
                trigger('gender');
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          )}
        />
        <div>
          {errors.gender && (
            <p className="error-message">{errors.gender.message}</p>
          )}
        </div>
      </div>

      <div>
        <label>Profile Picture URL:</label>
        <Controller
          name="profilePicture"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              onChange={(e) => {
                field.onChange(e);
                trigger('profilePicture');
              }}
            />
          )}
        />
      </div>

      <div>
        <label>Terms Accepted:</label>
        <Controller
          name="termsAccepted"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                trigger('termsAccepted');
              }}
            />
          )}
        />
        <div>
          {errors.termsAccepted && (
            <p className="error-message">{errors.termsAccepted.message}</p>
          )}
        </div>
      </div>

      <div>
        <label>Selected Country:</label>
        <Controller
          name="selectedCountry"
          control={control}
          render={({ field }) => (
            <select {...field}>
              {countries.map((country) => (
                <option
                  key={country}
                  value={country}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger('selectedCountry');
                  }}
                >
                  {country}
                </option>
              ))}
            </select>
          )}
        />
        <div>
          {errors.selectedCountry && (
            <p className="error-message">{errors.selectedCountry.message}</p>
          )}
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ReactHookForm;
