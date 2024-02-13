import React, { useState, useEffect } from 'react';
import { ProfilePictureProps } from '../../TypeModels/ProfilePictureModel.d.ts';
import { useProfileInfoContext } from '../Contexts.tsx';
import { CHANNELS } from '../../objs.ts';
import '../Styles/ProfilePicture.css';

const ProfilePicture: React.FC<ProfilePictureProps> = ({ style }) => {
  const { pictureData, setPictureData } = useProfileInfoContext();
  window.electron.ipcRenderer.once(CHANNELS.SelectProfilePicture, (args) => {
    console.log(args);
    setPictureData(args.data);
  });
  useEffect(() => {
    console.log(pictureData);
  }, [pictureData]);
  return (
    <div
      className={
        pictureData == ''
          ? 'UnselectedPictureProfileContainer'
          : 'SelectedPictureProfileContainer'
      }
      onClick={() => {
        window.electron.ipcRenderer.sendMessage(
          CHANNELS.SelectProfilePicture,
          {},
        );
      }}
    >
      {pictureData == '' ? (
        <div className="AddSign">+</div>
      ) : (
        <img
          className="Picture"
          src={'data:image/png;base64,' + pictureData}
        ></img>
      )}
    </div>
  );
};

export default ProfilePicture;
