import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import {
  KeyBindsProvider,
  ProfileCreationBreakerProvider,
  ProfileInfoProvider,
} from './Contexts.tsx';
import HomePage from './Pages/HomePage.tsx';
import icon from '../../assets/icon.svg';
import './App.css';

const App = () => {
  return (
    <ProfileInfoProvider>
      <ProfileCreationBreakerProvider>
        <KeyBindsProvider>
          <div className="App">
            <HomePage />
          </div>
        </KeyBindsProvider>
      </ProfileCreationBreakerProvider>
    </ProfileInfoProvider>
  );
};

export default App;
