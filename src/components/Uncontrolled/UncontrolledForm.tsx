import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/store';
import { setUserData } from '../../app/features/reacthookform/reacthookformSlice';
import { useNavigate } from 'react-router-dom';
import './UncontrolledForm.css';

export const UncontrolledForm = () => {
  interface IFormInput {
    name: string;
    age: number;
  }
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<IFormInput>();

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
            <label>Name</label>
            <input {...register('name')} />
          </div>

          <div>
            <label>Age</label>
            <input type="number" {...register('age')} />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </>
    </>
  );
};
