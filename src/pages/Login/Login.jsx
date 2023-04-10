import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import styles from './style.module.scss';
import { useFormik } from 'formik';
import { LoginValidations } from './validations';
import { useNavigate } from 'react-router-dom';
import { decryptHash } from '../Background';
import { clearAllStorageKeys, getValue, saveValue } from '../../utils/storage';

let initialValues = {
  password: '',
};

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginValidations,
      onSubmit: async (values, action) => {
        const { password: hashed } = await getValue('password');
        const decrypted = await decryptHash(hashed);

        if (values.password === decrypted) {
          await saveValue({ isLoggedIn: true });
          navigate('/regenerate');
        } else {
          setError(true);
        }
        action.resetForm();
      },
    });

  const handleReset = () => {
    clearAllStorageKeys().then(() => {
      navigate('/');
    });
  };

  return (
    <Box className="themeBg">
      <Box className={styles.createToken}>
        <Box className={styles.container}>
          <Box className={styles.createTokenFormBox}>
            <Box>
              <Typography variant="h1">Login </Typography>
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
                {error && (
                  <p className={styles.formErrors}> Invalid Password</p>
                )}
              </div>
              <div>
                <Button type="submit">Submit</Button>
              </div>
            </form>
            <Button variant="text" onClick={handleReset}>
              Reset Extension
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
