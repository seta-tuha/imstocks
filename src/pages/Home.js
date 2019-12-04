import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

import Background from '../components/Background';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <Typography.Title
        level={2}
        style={{ textAlign: 'center', position: 'absolute', width: '100%', zIndex: 100, top: '50%', transform: `translate(0, -200%)` }}
      >
        Start sharing your unforgettable moments
      </Typography.Title>
      <Link to={{
        search: "?signup=true"
      }}>
        <Button style={{ position: "absolute", top: '50%', left: '50%', transform: `translate(-50%, -50%)`, zIndex: 100 }} type="primary" size="large">Sign Up</Button>
      </Link>
      <Background />
    </div>
  )
};
