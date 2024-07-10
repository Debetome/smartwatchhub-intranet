// pages/login.tsx
import React, { FC } from 'react';
import SigninForm from './SigninForm';

const Signin: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#212429',
      }}
    >
      <SigninForm />
    </div>
  );
};

export default Signin;
