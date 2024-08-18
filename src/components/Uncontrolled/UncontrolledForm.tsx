import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/store';
import { setUserData } from '../../app/features/reacthookform/reacthookformSlice';
import { useNavigate } from 'react-router-dom';

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <label>Name</label>
          <input {...register('name')} />
        </>

        <>
          <label>Age</label>
          <input type="number" {...register('age')} />
        </>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
