import React, { useState } from 'react';
import OTPInput, { ResendOTP } from 'otp-input-react';
import { Box, Container } from '@mui/system';
import { Button } from '@mui/material';

function VerifyOtp() {
  const [OTP, setOTP] = useState('');
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            marginTop: '25vh',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
          }}>
          <p>
            {' '}
            <b style={{fontSize:"25px"}}> OTP Verification</b>
          </p>
          <div
            style={{
              width: '300px',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: '14px'
            }}>
            <p>An OTP has been sent to your entered email abcd@gmail.com</p>
              <p className="p3">Enter your Code here</p>
          </div>

          <div className="verifyDiv">
        
            <div className="otpElements">
              <div className="otp"></div>
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={false}
                secure={false}
              />
              <p className="p3">Didn't receive the code?</p>
              <ResendOTP onResendClick={() => console.log('Resend clicked')} />
              {/* <p className="resend">Resend</p> */}
            </div>
            {/* <button type="submit">Verify</button> */}
            <Button
              sx={{ mt: 3 }}
              className="login-btn"
              type="submit"
              fullWidth
              variant="contained">
              Verify
            </Button>
            <Box sx={{ textAlign: 'center', cursor: 'pointer' }}>
              <p>Cancel</p>
            </Box>
          </div>
        </Box>
      </Container>
    </>
  );
}

export default VerifyOtp;