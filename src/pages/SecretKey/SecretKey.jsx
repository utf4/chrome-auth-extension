import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import styles from './style.module.scss';
import './SecretKey.css';
import { useNavigate } from 'react-router-dom';
import { getValue, saveValue } from '../../utils/storage';
import { generateRandomString } from '../../utils/helpers';

const SecretKey = () => {
  const [copied, setCopied] = useState(false);
  const [secret, setSecret] = useState('');
  const navigate = useNavigate();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(secret);
    setCopied(true);
    // await saveValue({secret})
  };

  useEffect(() => {
    welcome().catch(undefined);
  }, []);

  const welcome = async () => {
    const { isLoggedIn } = await getValue('isLoggedIn');
    if (isLoggedIn) {
      navigate('/regenerate');
    }

    const { secret } = await getValue('secret');
    if (secret) {
      navigate('/login');
    }

    const str = generateRandomString(30);
    setSecret(str);
  };

  const handleSecret = async () => {
    await saveValue({ secret });
    navigate('/register');
  };

  return (
    <Box className="themeBg">
      <Box className={styles.home}>
        <Box className={styles.container}>
          <Box className={styles.createTokenFormBox}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h4"> Secret Key </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <input id="secret" type="text" defaultValue={secret} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
              <Button size="small" onClick={handleCopy}>
                {' '}
                Copy!
              </Button>
              <Button onClick={handleSecret} size="small">
                Next
              </Button>
            </Box>
            {copied && (
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

export default SecretKey;
