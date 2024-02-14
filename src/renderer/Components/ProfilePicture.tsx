import React, { useState, useEffect } from 'react';
import { ProfilePictureProps } from '../../TypeModels/ProfilePictureModel';
import { useProfileInfoContext } from '../Contexts';
import { CHANNELS } from '../../objs';
import '../Styles/ProfilePicture.css';

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  style,
  overridePicture = false,
  overrideData = '',
}) => {
  const { pictureData, setPictureData } = useProfileInfoContext();
  window.electron.ipcRenderer.once(
    CHANNELS.SelectProfilePicture,
    (args: any) => {
      // console.log(args);
      setPictureData(args.data);
    },
  );
  useEffect(() => {
    if (overridePicture) setPictureData(overrideData);
  }, []);

  return (
    <div
      style={style}
      className={
        pictureData == ''
          ? 'UnselectedPictureProfileContainer'
          : 'SelectedPictureProfileContainer'
      }
      onClick={() => {
        if (!overridePicture)
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
