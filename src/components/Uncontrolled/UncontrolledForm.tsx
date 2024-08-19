import { useState } from 'react';
import { useAppDispatch } from '../../app/store';
import { setUserData } from '../../app/features/formSlice';
import { useNavigate } from 'react-router-dom';
import { CountrySelector } from '../CountrySelector/CountrySelector';
import './UncontrolledForm.css';

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

export const UncontrolledForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<IFormInput>({
    name: '',
    age: 0,
    email: '',
    password: '',
    gender: '',
    termsAccepted: false,
    profilePicture: '',
    selectedCountry: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof IFormInput, string>>
  >({});
  const [imageError, setImageError] = useState<string | null>(null);

  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

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

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      termsAccepted: e.target.checked,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = ['image/png', 'image/jpeg'];
    if (!validExtensions.includes(file.type)) {
      setImageError('Invalid file type. Only PNG and JPEG are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError('File size exceeds 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: reader.result as string,
      }));
      setImageError(null);
    };
    reader.readAsDataURL(file);
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

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!formData.profilePicture) {
      newErrors.profilePicture = 'Profile picture is required';
    }

    dispatch(
      setUserData({
        ...formData,
        password: formData.password,
        selectedCountry: selectedCountry,
        isNewData: false,
      })
    );
    setFormData({
      name: '',
      age: 0,
      email: '',
      password: '',
      gender: '',
      termsAccepted: false,
      profilePicture: '',
      selectedCountry: '',
    });
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

        <div>
          <label>Gender</label>
          <div className="gender">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleGenderChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleGenderChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleGenderChange}
              />
              Other
            </label>
          </div>
        </div>

        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleTermsChange}
            />
          </label>
          <>I accept the Terms and Conditions</>
        </div>
        <div>
          {errors.termsAccepted && (
            <p className="error-message">{errors.termsAccepted}</p>
          )}
        </div>

        <div>
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            id="profilePicture"
            name="profilePicture"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
        </div>
        <div>{imageError && <p className="error-message">{imageError}</p>}</div>

        <div>
          <CountrySelector setSelectedCountry={setSelectedCountry} />
        </div>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
