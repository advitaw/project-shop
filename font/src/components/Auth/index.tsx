import React, { useEffect, useState } from 'react';

function Auth(props) {
  const [coms, setComs] = useState('');
  useEffect(() => {
    const roles = JSON.parse(localStorage.getItem('com'))
    console.log(roles)
    let tmp = ''
    roles.forEach((i) => {
      tmp += i.disabledComponents
    })
    setComs(tmp);
    console.log(tmp)
  }, [])
  if (coms.indexOf(props.id) == -1) {
    return <div>{props.children}</div>
  }
  return (
    <div>
    </div>
  );
}

export default Auth;
