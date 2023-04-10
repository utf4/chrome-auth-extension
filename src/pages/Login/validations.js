import * as Yup from 'yup';

export const LoginValidations = Yup.object().shape({
  password: Yup.string().required('Please Enter your password'),
});
