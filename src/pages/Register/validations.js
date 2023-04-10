import * as Yup from 'yup';

export const PasswordValidations = Yup.object({
  password: Yup.string().required('Password is required'),
  confirm_password: Yup.string().test(
    'passwords-match',
    'Passwords must match',
    function (value) {
      return this.parent.password === value;
    }
  ),
});
