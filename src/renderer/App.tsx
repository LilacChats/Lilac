import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import {
  KeyBindsProvider,
  ProfileCreationBreakerProvider,
  ProfileInfoProvider,
} from './Contexts';
import HomePage from './Pages/HomePage';
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
