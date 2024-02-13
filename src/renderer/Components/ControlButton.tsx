import React, { useEffect, useState } from 'react';
import { ControlButtonProps } from '../../TypeModels/ControlButton.d.ts';
import Button from '../Components/Button.tsx';
import { ControlButtonProps } from '../../TypeModels/ControlButton.d.ts';
import { useKeyBindsContext } from '../Contexts.tsx';
import '../Styles/ControlButton.css';
const ControlButton: React.FC<ControlButtonProps> = ({ lastPage, setPage }) => {
  const { keyBinds, setKeyBinds } = useKeyBindsContext();
  return (
    <div className="BackContainer">
      <Button
        label={keyBinds.BACK.name}
        keybinding={keyBinds.BACK.keyCombination}
        onClick={() => {
          setPage('backward');
        }}
      />
      {!lastPage ? (
        <Button
          label={keyBinds.FORWARD.name}
          keybinding={keyBinds.FORWARD.keyCombination}
          onClick={() => {
            setPage('forward');
          }}
        />
      ) : null}
    </div>
  );
};

export default ControlButton;
