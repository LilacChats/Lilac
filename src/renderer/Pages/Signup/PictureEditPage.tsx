import { motion } from 'framer-motion';
import ReactCrop, { Crop, PercentCrop, PixelCrop } from 'react-image-crop';
import Button from '../../Components/Button';
import { useAccountContext, useKeyBindsContext } from '../../Contexts';
import '../../Styles/Signup.css';
import { PictureEditPageProps } from '../../../types';

const PictureEditPage: React.FC<PictureEditPageProps> = (props) => {
  const { keyBinds } = useKeyBindsContext();
  const { pictureData } = useAccountContext();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
      }}
      className="PictureEditContainer"
    >
      <div className="PictureEditWindow">
        <ReactCrop
          crop={props.crop}
          onChange={(_, percentCrop) => {
            props.onCropChanged(percentCrop);
          }}
          onComplete={(c) => {
            props.onCropCompleted(c);
          }}
          aspect={1}
          minWidth={200}
          minHeight={200}
          circularCrop={true}
        >
          <img
            ref={props.imgRef}
            alt="Crop me"
            src={pictureData}
            style={{ transform: `scale(${1}) rotate(${0}deg)` }}
            onLoad={(e) => {
              props.onPictureLoaded(e);
            }}
          />
        </ReactCrop>
        <Button
          name={keyBinds.SAVE_PICTURE.name}
          keyCombination={keyBinds.SAVE_PICTURE.keyCombination}
          onClick={() => {
            props.onSubmit();
          }}
        />
        <canvas
          ref={props.previewCanvasRef}
          style={{
            border: '1px solid black',
            objectFit: 'contain',
            width: props.cropCompleted ? props.cropCompleted?.width : undefined,
            height: props.cropCompleted
              ? props.cropCompleted.height
              : undefined,
            display: 'none',
            position: 'absolute',
          }}
        />
      </div>
    </motion.div>
  );
};

export default PictureEditPage;
