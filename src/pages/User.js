import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function User() {
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    const logged = localStorage.getItem('logged');
    if (logged !== "true" && !location.search.includes("signup=true")) {
      history.push({
        ...location,
        search: "?signup=true"
      })
    }
  }, [location, history]);

  return (<div>User</div>)
}