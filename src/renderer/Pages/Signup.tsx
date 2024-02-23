import { useEffect, useRef, useState } from 'react';
import '../Styles/Signup.css';
import InputBox from '../Components/InputBox';
import { useAccountContext, useKeyBindsContext } from '../Contexts';
import {
  CHANNELS,
  INPUT_PLACEHOLDERS,
  SIGNUP_ANIMATION_OBJS,
  TO_RADIANS,
} from '../../objs';
import Button from '../Components/Button';
import { InputBoxTypes, SignupPageProps } from '../../types';
import Markdown from 'react-markdown';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  validateEmail,
  validateName,
  validateServerURL,
} from '../../validator';
import { AnimatePresence, motion } from 'framer-motion';

const md = '# Hi, *Pluto*!';

const SignupPage: React.FC<SignupPageProps> = (props) => {
  const { keyBinds } = useKeyBindsContext();
  const {
    name,
    email,
    password,
    serverURL,
    pictureData,
    setName,
    setEmail,
    setPassword,
    setServerURL,
    setPictureData,
  } = useAccountContext();
  const [page, setPage] = useState<number>(1);
  const [nameValidationString, setNameValidationString] = useState<string>('');
  const [emailValidationString, setEmailValidationString] =
    useState<string>('');
  const [passwordValidationString, setPasswordValidationString] =
    useState<string>('');
  const [serverURLValidationString, setServerValidationString] =
    useState<string>('');
  const [editPictureState, setEditPictureState] = useState<boolean>(false);
  const [pictureHoverState, setPictureHoverState] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>('left');
  const [controlFlowHandler, setControlFlowHandler] = useState<boolean>(false);
  const [pageInitialState, setPageInitialState] = useState<number>(0);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // const handleKeyPress = (e: any) => {
  //   console.log(e.key);
  //   if (e.key == 'Escape') {
  //     handleBackwardMotion();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyPress);
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, []);

  useEffect(() => {
    refreshComponent(setNameValidationString, 'name', false);
    refreshComponent(setEmailValidationString, 'email', false);
    refreshComponent(setPasswordValidationString, 'password', false);
    refreshComponent(setServerValidationString, 'server', false);
  }, [page]);

  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        1,
        0,
      );
    }
  }, [completedCrop]);

  useEffect(() => {
    if (direction == 'right') {
      if (page > 1) setPage(page - 1);
      else {
        setPictureData('');
        props.triggerPageChange('Login');
      }
    } else {
      let nameValidationStatus: boolean = true,
        emailValidationStatus: boolean = true,
        passwordValidationStatus: boolean = true,
        serverURLValidationStatus: boolean = true;
      if (page == 1) {
        if (pictureData != '') setPage(page + 1);
      } else if (page == 2) {
        if (!validateName(name)) {
          nameValidationStatus = false;
          refreshComponent(setNameValidationString, 'name', true);
        }
        if (!validateEmail(email)) {
          emailValidationStatus = false;
          refreshComponent(setEmailValidationString, 'email', true);
        }
        if (password.length == 0) {
          console.log('Pass');
          passwordValidationStatus = false;
          refreshComponent(setPasswordValidationString, 'password', true);
        }
        if (
          nameValidationStatus &&
          emailValidationStatus &&
          passwordValidationStatus
        )
          setPage(page + 1);
      } else if (page == 3) {
        if (!validateServerURL(serverURL)) {
          serverURLValidationStatus = false;
          refreshComponent(setServerValidationString, 'server', true);
        }
        if (serverURLValidationStatus) setPage(page + 1);
      }
    }
  }, [direction, controlFlowHandler]);

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    );
  }

  async function canvasPreview(
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: PixelCrop,
    scale = 1,
    rotate = 0,
  ) {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    // devicePixelRatio slightly increases sharpness on retina devices
    // at the expense of slightly slower render times and needing to
    // size the image back down if you want to download/upload and be
    // true to the images natural size.
    const pixelRatio = window.devicePixelRatio;
    // const pixelRatio = 1

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const rotateRads = rotate * TO_RADIANS;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();

    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY);
    // 3) Rotate around the origin
    ctx.rotate(rotateRads);
    // 2) Scale the image
    ctx.scale(scale, scale);
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
    );

    ctx.restore();
    // setPictureData(canvas.toDataURL('image/jpeg'));x
  }

  function refreshComponent(
    compSetterFunction: Function,
    compLabel: InputBoxTypes,
    errorState: boolean,
  ) {
    compSetterFunction(
      Math.floor(Date.now() / 1000).toString() +
        '_' +
        compLabel +
        '_' +
        errorState,
    );
  }

  window.electron.ipcRenderer.once(
    CHANNELS.SelectProfilePicture,
    (args: any) => {
      setEditPictureState(true);
      setPictureData('data:image/png;base64,' + args.data);
    },
  );

  const handleForwardMotion = () => {
    setDirection('left');
    setControlFlowHandler(!controlFlowHandler);
  };

  const handleBackwardMotion = () => {
    setDirection('right');
    setControlFlowHandler(!controlFlowHandler);
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  return (
    <div className="SignupMainContainer">
      <motion.div
        initial={{ y: -50, x: 0 }}
        animate={{ y: 0, x: 0 }}
        transition={{ duration: 0.4 }}
        className="PageControlsContainer"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#989898',
          }}
        >
          <div
            onClick={() => {
              handleBackwardMotion();
            }}
            className="back-button"
          >
            <div className="triangle"></div>
            <div>Back</div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {editPictureState ? (
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
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                minWidth={200}
                minHeight={200}
                circularCrop={true}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={pictureData}
                  style={{ transform: `scale(${1}) rotate(${0}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
              <Button
                name={keyBinds.SAVE_PICTURE.name}
                keyCombination={keyBinds.SAVE_PICTURE.keyCombination}
                onClick={() => {
                  if (previewCanvasRef.current) {
                    setPictureData(
                      previewCanvasRef.current.toDataURL('image/jpeg'),
                    );
                    setEditPictureState(false);
                  }
                }}
              />
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: '1px solid black',
                  objectFit: 'contain',
                  width: completedCrop ? completedCrop?.width : undefined,
                  height: completedCrop ? completedCrop.height : undefined,
                  display: 'none',
                  position: 'absolute',
                }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {page == 1 ? (
          <motion.div
            exit={
              direction == 'left'
                ? SIGNUP_ANIMATION_OBJS.exitLeft
                : SIGNUP_ANIMATION_OBJS.exitRight
            }
            onLoad={() => {
              setPageInitialState(1);
            }}
            initial={
              pageInitialState == 0
                ? { scale: 0, opacity: 0 }
                : direction == 'left'
                ? SIGNUP_ANIMATION_OBJS.initialLeft
                : SIGNUP_ANIMATION_OBJS.initialRight
            }
            animate={SIGNUP_ANIMATION_OBJS.animate}
            transition={
              {
                // duration: 0.5,
              }
            }
            className="Page"
          >
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
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {page == 2 ? (
          <motion.div
            initial={
              direction == 'left'
                ? SIGNUP_ANIMATION_OBJS.initialLeft
                : SIGNUP_ANIMATION_OBJS.initialRight
            }
            animate={SIGNUP_ANIMATION_OBJS.animate}
            exit={
              direction == 'left'
                ? SIGNUP_ANIMATION_OBJS.exitLeft
                : SIGNUP_ANIMATION_OBJS.exitRight
            }
            transition={
              {
                // duration: 0.5,
              }
            }
            className="Page"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <InputBox
                triggerValidationFailAnimation={nameValidationString}
                triggerValueChange={(value: string) => {
                  setName(value);
                }}
                style={{ width: '300px' }}
                type="text"
                placeholder={INPUT_PLACEHOLDERS.NAME}
              />
              <InputBox
                triggerValidationFailAnimation={emailValidationString}
                triggerValueChange={(value: string) => {
                  setEmail(value);
                }}
                style={{ width: '300px' }}
                type="text"
                placeholder={INPUT_PLACEHOLDERS.EMAIL}
              />
              <InputBox
                triggerValidationFailAnimation={passwordValidationString}
                triggerValueChange={(value: string) => {
                  setPassword(value);
                }}
                style={{ width: '300px' }}
                type="password"
                placeholder={INPUT_PLACEHOLDERS.PASSWORD}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {page == 3 ? (
          <motion.div
            initial={
              direction == 'left'
                ? SIGNUP_ANIMATION_OBJS.initialLeft
                : SIGNUP_ANIMATION_OBJS.initialRight
            }
            animate={SIGNUP_ANIMATION_OBJS.animate}
            exit={
              direction == 'left'
                ? SIGNUP_ANIMATION_OBJS.exitLeft
                : SIGNUP_ANIMATION_OBJS.exitRight
            }
            transition={
              {
                // duration: 0.5,
              }
            }
            className="Page"
          >
            <InputBox
              triggerValidationFailAnimation={serverURLValidationString}
              triggerValueChange={(value: string) => {
                setServerURL(value);
              }}
              style={{ width: '400px' }}
              type="text"
              placeholder={INPUT_PLACEHOLDERS.SERVER}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {page == 4 ? (
          <motion.div
            className="Page"
            initial={
              direction == 'left'
                ? SIGNUP_ANIMATION_OBJS.initialLeft
                : SIGNUP_ANIMATION_OBJS.initialRight
            }
            animate={SIGNUP_ANIMATION_OBJS.animate}
            exit={
              direction == 'left'
                ? SIGNUP_ANIMATION_OBJS.exitLeft
                : SIGNUP_ANIMATION_OBJS.exitRight
            }
            transition={
              {
                // duration: 0.5,
              }
            }
          >
            <motion.div className="MarkDownContainer">
              <Markdown>{md}</Markdown>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <Button
        style={{
          marginTop: '50vh',
        }}
        name={keyBinds.FORWARD.name}
        keyCombination={keyBinds.FORWARD.keyCombination}
        onClick={handleForwardMotion}
      />
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.4,
        }}
        className="PageIndicatorContainer"
      >
        {Array.from({ length: 4 }, (_, index) => (
          <div
            className={`PageIndicator${
              page - 1 == index ? 'Active' : 'Inactive'
            }`}
          ></div>
        ))}
      </motion.div>
    </div>
  );
};

export default SignupPage;
