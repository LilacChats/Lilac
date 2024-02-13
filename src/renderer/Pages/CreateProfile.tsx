import React, { useState, useEffect } from 'react';
import { CreateProfileProps } from '../../TypeModels/CreateProfileModel';
import { ProfilePicture, InputBox } from '../Components/Components';
import { PLACEHOLDERS } from '../../objs';
import {
  useKeyBindsContext,
  useProfileCreationBreakerContext,
} from '../Contexts';
import Button from '../Components/Button';
import EULABox from '../Components/EULABox';
import '../Styles/CreateProfile.css';
import '../Styles/HomePage.css';

let md = '# Title of your Agreement\nHi there!';

const CreateProfile: React.FC<CreateProfileProps> = ({
  displayPage,
  nameErrorState,
  emailErrorState,
  passwordErrorState,
  serverURLErrorState,
  acceptAgreement,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { keyBinds } = useKeyBindsContext();
  const { breakState } = useProfileCreationBreakerContext();
  const [offsetX, setOffsetX] = useState<number>(-100);
  const [opacity, setOpacity] = useState<0 | 100>(0);
  useEffect(() => {
    setTimeout(() => {
      setOpacity(100);
    }, 400);
  }, [currentPage]);
  useEffect(() => {
    setOpacity(0);
    setTimeout(() => {
      setCurrentPage(displayPage);
    }, 400);
  }, [displayPage]);
  return (
    <div className="HomePage">
      {currentPage == 0 ? (
        <ProfilePicture style={{ opacity: `${opacity}%` }} />
      ) : currentPage == 1 ? (
        <div
          style={{
            display: 'flex',
            gap: '50px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <InputBox
            errorState={emailErrorState}
            style={{
              width: '250px',
              opacity: `${opacity}%`,
            }}
            placeholder={PLACEHOLDERS.email}
            type="email"
          />
          <InputBox
            errorState={nameErrorState}
            style={{
              width: '250px',
              opacity: `${opacity}%`,
            }}
            placeholder={PLACEHOLDERS.name}
            type="name"
          />
          <InputBox
            errorState={passwordErrorState}
            style={{
              width: '250px',
              opacity: `${opacity}%`,
            }}
            placeholder={PLACEHOLDERS.password}
            type="password"
          />
        </div>
      ) : currentPage == 2 ? (
        <InputBox
          errorState={serverURLErrorState}
          style={{
            width: '400px',
            opacity: `${opacity}%`,
          }}
          placeholder={PLACEHOLDERS.server}
          type="server"
        />
      ) : currentPage == 3 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            height: '80%',
          }}
        >
          <EULABox content={md} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: 'fit-content',
              gap: '30px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              label={keyBinds.ACCEPT_AGREEMENT.name}
              keybinding={keyBinds.ACCEPT_AGREEMENT.keyCombination}
              onClick={() => {
                acceptAgreement();
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CreateProfile;
