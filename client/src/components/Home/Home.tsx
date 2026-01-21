
import React from 'react';
import LandingPage from '../LandingPage/LandingPage';
import GuestView from './GuestView';
import { useAuth } from '../../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  // If logged in, show the Dashboard. If not, show the marketing page.
  return user ? <LandingPage /> : <GuestView />;
};

export default Home;