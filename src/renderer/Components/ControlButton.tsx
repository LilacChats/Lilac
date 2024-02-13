import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import { ControlButtonProps } from '../../TypeModels/ControlButton';
import { useKeyBindsContext } from '../Contexts';
import '../Styles/ControlButton.css';
const ControlButton: React.FC<ControlButtonProps> = ({
  loginPage,
  lastPage,
  setPage,
}) => {
  const { keyBinds } = useKeyBindsContext();
  return (
    <div className="BackContainer">
      <Button
        label={keyBinds.BACK.name}
        keybinding={keyBinds.BACK.keyCombination}
        onClick={() => {
          setPage('backward');
        }}
      />
      {!lastPage && !loginPage ? (
        <Button
          label={keyBinds.FORWARD.name}
          keybinding={keyBinds.FORWARD.keyCombination}
          onClick={() => {
            setPage('forward');
          }}
        />
      ) : (
        <Button
          label={keyBinds.LOGIN.name}
          keybinding={keyBinds.LOGIN.keyCombination}
          onClick={() => {
            setPage('triggerLogin');
          }}
        />
      )}
    </div>
  );
};

export default ControlButton;
