import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import styles from './style.module.scss';
import './SecretKey.css';
import { useNavigate } from 'react-router-dom';
import { getValue, removeValue, saveValue } from '../../utils/storage';
import { generateRandomString } from '../../utils/helpers';

const RegenerateSecretKey = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    getValue('secret').then(({ secret }) => {
      setText(secret);
    });
  }, []);

  const logout = async () => {
    await removeValue('isLoggedIn');
    navigate('/login');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setShow(true);
    await saveValue({ secret: text });
  };

  const handleRegenerate = async () => {
    const str = generateRandomString(30);
    await saveValue({ secret: str });
    setText(str);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
  };
  return (
    <Box className="themeBg">
      <Box className={styles.home}>
        <Box className={styles.container}>
          <Box className={styles.createTokenFormBox}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h5"> Regenerate Secret Key </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <input
                id="myInput"
                type="text"
                onChange={(e) => handleChange(e)}
                value={text}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
              <button onClick={handleRegenerate}>Regenerate</button>
              <button onClick={handleCopy}> Copy!</button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
              <button onClick={logout}> Logout </button>
            </Box>
            {show && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={2}>
                <Typography> Text copied successfully ! </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegenerateSecretKey;
