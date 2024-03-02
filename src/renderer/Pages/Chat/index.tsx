import { AnimatePresence, motion } from 'framer-motion';
import '../../Styles/Chat.css';
import { useEffect, useState } from 'react';
import Hamburger from '../../Components/Hamburger';
import { CHANNELS } from '../../../objs';
import { useAccountContext, useUIStateContext } from '../../Contexts';
import HistoryItem from './HistoryItem';

const ChatHome = () => {
  const { pictureData } = useAccountContext();
  const { mode } = useUIStateContext();
  const [serverListState, setServerListState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [chatTypeState, setChatTypeState] = useState<number>(0);
  window.electron.ipcRenderer.once(CHANNELS.FetchServerData, (arg) => {
    setLoadingState(false);
  });
  return (
    <motion.div
      className={`MainChatContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
    >
      <motion.div
        animate={{
          transform: `translateX(${serverListState ? '80px' : '0%'})`,
          // left: serverListState ? 80 : 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className={`ServerContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
      >
        <Hamburger
          onClick={() => {
            setServerListState(!serverListState);
          }}
        />
        <motion.div className="LeftSubContainer">
          <motion.div
            className={`ChatListTypeSwitcherContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
          >
            <div
              onClick={() => {
                setChatTypeState(0);
              }}
              style={{
                zIndex: 2,
                cursor: 'pointer',
                color:
                  chatTypeState == 1
                    ? '#989898'
                    : mode == 'dark'
                      ? 'white'
                      : '#2f2f2f',
              }}
            >
              Groups
            </div>
            <div
              onClick={() => {
                setChatTypeState(1);
              }}
              style={{
                zIndex: 2,
                cursor: 'pointer',
                color:
                  chatTypeState == 0
                    ? '#989898'
                    : mode == 'dark'
                      ? 'white'
                      : '#2f2f2f',
              }}
            >
              DM &nbsp;
            </div>
            <motion.div
              style={{
                transform: `translateX(${chatTypeState == 0 ? '-52%' : '52%'}`,
              }}
              className={`ChatListTypeSelector${mode == 'dark' ? 'Dark' : 'Light'}`}
            ></motion.div>
          </motion.div>
          <motion.div
            className={`ChatHistoryBlock${mode == 'dark' ? 'Dark' : 'Light'}`}
          >
            <AnimatePresence>
              {loadingState ? (
                <motion.div
                  exit={{
                    scale: 0,
                  }}
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  className="LoadingContainer"
                >
                  <motion.div className="LoadingCircle"></motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            {Array.from({ length: 104 }, (_, index) => (
              <HistoryItem />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ChatHome;
