import { useEffect } from 'react';
import { useKeyBindsContext } from '../Contexts';
import '../Styles/HomePage.css';
import LoginPage from './Login';
import { CHANNELS } from '../../objs';
import Button from '../Components/Button';
import { HomePageProps } from '../../types';

const Home: React.FC<HomePageProps> = (props) => {
  const { setKeyBinds, keyBinds } = useKeyBindsContext();

  return (
    <div className="HomePageContainer">
      <div className="Title">Welcome To Lilac</div>
      <div className="SubContainer">
        <Button
          keyCombination={keyBinds.LOGIN.keyCombination}
          name={keyBinds.LOGIN.name}
          onClick={() => {
            props.triggerPageChange('Login');
          }}
        />
        <Button
          keyCombination={keyBinds.SIGNUP.keyCombination}
          name={keyBinds.SIGNUP.name}
          onClick={() => {
            props.triggerPageChange('Signup');
          }}
        />
      </div>
    </div>
  );
};

export default Home;
