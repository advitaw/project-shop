import React from 'react';
import { useAuth } from 'ice';
import NoAuth from '@/components/NoAuth';

function Auth({ children, authKey, fallback }) {
  const [auth] = useAuth();
  const hasAuth = auth[authKey];

  if (hasAuth) {
    return children;
  } else {
    return fallback || NoAuth;
  }
}

export default Auth;

function Button() {
    return (
      <Auth authKey={'downloadExcel'}>
        <Button type="button">下载</Button>
      </Auth>
    );
  }