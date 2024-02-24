import { motion } from 'framer-motion';
import { useAccountContext } from '../Contexts';
import { CHANNELS } from '../../objs';

const ProfilePictureEditable: React.FC<{
  pictureHoverState: boolean;
  setPictureHoverState: (pictureHoverState: boolean) => void;
}> = ({ setPictureHoverState, pictureHoverState }) => {
  const { pictureData } = useAccountContext();
  return (
    <>
      <motion.div
        whileHover={{
          width: '200px',
          height: '200px',
          border: '6px dotted rgb(74,137,253)',
          // rotate: '70deg',
        }}
        onHoverStart={() => {
          setPictureHoverState(true);
        }}
        onHoverEnd={() => {
          setPictureHoverState(false);
        }}
        transition={{
          type: 'spring',
          damping: 10,
          mass: 0.75,
          stiffness: 100,
        }}
        onClick={() => {
          window.electron.ipcRenderer.sendMessage(
            CHANNELS.SelectProfilePicture,
            {},
          );
        }}
        className="PictureContainer"
      ></motion.div>
      {pictureData == '' ? (
        <motion.p id="AddPicture">{'+'}</motion.p>
      ) : (
        <motion.img
          src={pictureData}
          style={
            !pictureHoverState
              ? {
                  height: '135px',
                  width: '135px',
                }
              : {
                  height: '175px',
                  width: '175px',
                }
          }
          className="ProfileImage"
        />
      )}
    </>
  );
};

export default ProfilePictureEditable;
