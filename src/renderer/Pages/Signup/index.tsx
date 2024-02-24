import { useEffect, useRef, useState } from 'react';
import '../../Styles/Signup.css';
import { useAccountContext, useKeyBindsContext } from '../../Contexts';
import { CHANNELS } from '../../../objs';
import Button from '../../Components/Button';
import { Crop, PercentCrop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  validateEmail,
  validateName,
  validateServerURL,
} from '../../../validator';
import { AnimatePresence } from 'framer-motion';
import BackButton from '../../Components/BackButton';
import ProfilePictureEditable from '../../Components/ProfilePictureEditable';
import { canvasPreview, centerAspectCrop, refreshComponent } from './functions';
import PageContainer from './PageContainer';
import Page3 from './Page_3';
import Page2 from './Page_2';
import SignupPageIndicator from '../../Components/SignupPageIndicator';
import Page4 from './Page_4';
import PictureEditPage from './PictureEditPage';
import { AppPages } from '../../../types';

const md = '# Hi, *Pluto*!';

const SignupPage: React.FC<{
  triggerPageChange: (page: AppPages) => void;
}> = (props) => {
  const { keyBinds } = useKeyBindsContext();
  const {
    name,
    email,
    password,
    serverURL,
    pictureData,
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
      <BackButton
        clicked={() => {
          handleBackwardMotion();
        }}
      />
      <AnimatePresence>
        {editPictureState ? (
          <PictureEditPage
            onPictureLoaded={(e: React.SyntheticEvent<HTMLImageElement>) => {
              onImageLoad(e);
            }}
            crop={crop}
            imgRef={imgRef}
            onCropChanged={(percentCrop: PercentCrop) => {
              setCrop(percentCrop);
            }}
            onCropCompleted={(c: PixelCrop) => {
              setCompletedCrop(c);
            }}
            cropCompleted={completedCrop}
            previewCanvasRef={previewCanvasRef}
            onSubmit={() => {
              if (previewCanvasRef.current) {
                setPictureData(
                  previewCanvasRef.current.toDataURL('image/jpeg'),
                );
                setEditPictureState(false);
              }
            }}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {page == 1 ? (
          <PageContainer
            page={1}
            initialState={pageInitialState}
            componentLoaded={() => {
              setPageInitialState(1);
            }}
            direction={direction}
          >
            <ProfilePictureEditable
              pictureHoverState={pictureHoverState}
              setPictureHoverState={setPictureHoverState}
            />
          </PageContainer>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {page == 2 ? (
          <PageContainer page={2} direction={direction}>
            <Page2
              nameValidationString={nameValidationString}
              emailValidationString={emailValidationString}
              passwordValidationString={passwordValidationString}
            />
          </PageContainer>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {page == 3 ? (
          <PageContainer page={3} direction={direction}>
            <Page3
              serverURLValidationString={serverURLValidationString}
              onChange={(value: string) => {
                setServerURL(value);
              }}
            />
          </PageContainer>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {page == 4 ? (
          <PageContainer
            style={{ width: '90%', height: '70%' }}
            page={4}
            direction={direction}
          >
            <Page4
              data={md}
              onAccepted={() => {
                props.triggerPageChange('Chat');
              }}
            />
          </PageContainer>
        ) : null}
      </AnimatePresence>
      {page != 4 ? (
        <Button
          style={{
            marginTop: '50vh',
          }}
          name={keyBinds.FORWARD.name}
          keyCombination={keyBinds.FORWARD.keyCombination}
          onClick={handleForwardMotion}
        />
      ) : null}
      <SignupPageIndicator page={page} />
    </div>
  );
};

export default SignupPage;
