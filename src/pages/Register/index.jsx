import React from 'react';
import { Typography, Box } from '@mui/material';
import styles from './style.module.scss';
import { useFormik } from 'formik';
import { PasswordValidations } from './validations';
import { useNavigate } from 'react-router-dom';
import { encryptHash } from '../Background';
import { getValue, saveValue } from '../../utils/storage';

let initialValues = {
  password: '',
  confirm_password: '',
};

const Register = () => {
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: PasswordValidations,
      onSubmit: async (values, action) => {
        const { secret: secret_key } = await getValue('secret');
        const hash = await encryptHash(values);

        if (secret_key) {
          await saveValue({ password: hash });
          navigate('/login');
        }
        action.resetForm();
      },
    });

  return (
    <Box className="themeBg">
      <Box className={styles.createToken}>
        <Box className={styles.container}>
          <Box className={styles.createTokenFormBox}>
            <Box>
              <Typography variant="h1">Password </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className={
                    errors.password && touched.password
                      ? styles.errorBorder
                      : ''
                  }
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className={styles.formErrors}>{errors.password}</p>
                ) : null}
              </div>
              <div>
                <input
                  className={
                    errors.confirm_password && touched.confirm_password
                      ? styles.errorBorder
                      : ''
                  }
                  type="password"
                  name="confirm_password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <p className={styles.formErrors}>{errors.confirm_password}</p>
                ) : null}
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
