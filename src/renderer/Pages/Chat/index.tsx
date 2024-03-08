import { AnimatePresence, motion } from 'framer-motion';
import '../../Styles/Chat.css';
import { useEffect, useState } from 'react';
import Hamburger from '../../Components/Hamburger';
import { CHANNELS } from '../../../objs';
import { useAccountContext, useUIStateContext } from '../../Contexts';
import HistoryItem from './HistoryItem';
import MessageBox from './MessageBox';
import ChatBox from './ChatBox';
import CodeIcon from '../../Assets/code.svg';
import MediaIcon from '../../Assets/media.svg';
import FileIcon from '../../Assets/file.svg';
import GraphIcon from '../../Assets/graph.svg';

const ChatHome = () => {
  const ATTACHMENTS: { name: string; icon: HTMLImageElement }[] = [
    { name: 'Image/Video', icon: MediaIcon },
    { name: 'Code', icon: CodeIcon },
    { name: 'File', icon: FileIcon },
    { name: 'Poll', icon: GraphIcon },
  ];
  const { id, pictureData, serverURL } = useAccountContext();
  const { mode } = useUIStateContext();
  const [serverListState, setServerListState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [groupData, setGroupData] = useState<{ Name: string; ID: string }[]>(
    [],
  );
  const [dmData, setDMData] = useState<
    { Name: string; ID: string; PictureData: string }[]
  >([]);
  const [chatTypeState, setChatTypeState] = useState<number>(0);
  const [attachmentListState, setAttachmentListState] =
    useState<boolean>(false);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(CHANNELS.FetchServerData, {
      type: chatTypeState == 0 ? 'Groups' : 'DM',
      id: id,
      serverURL: serverURL,
    });
  }, [chatTypeState]);

  window.electron.ipcRenderer.once(CHANNELS.FetchServerData, (arg) => {
    if (chatTypeState == 0) setGroupData(arg.data);
    else setDMData(arg.data);
    setLoadingState(false);
  });

  return (
    <motion.div
      className={`MainChatContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
    >
      <motion.div className={`ServerList${mode == 'dark' ? 'Dark' : 'Light'}`}>
        {Array.from({ length: 4 }, (index, item) => (
          <div
            key={index}
            className={`ServerIcon${mode == 'dark' ? 'Dark' : 'Light'}`}
          >
            Lilly's Team
          </div>
        ))}
      </motion.div>
      <motion.div
        animate={{
          transform: `translateX(${serverListState ? '150px' : '0%'})`,
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
                window.electron.ipcRenderer.sendMessage(
                  CHANNELS.FetchServerData,
                  {
                    serverURL: serverURL,
                    id: id,
                    type: 'Groups',
                  },
                );
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
            {chatTypeState === 0
              ? groupData.map((item, index) => {
                  return (
                    <HistoryItem key={index} data={item} type={chatTypeState} />
                  );
                })
              : dmData.map((item, index) => {
                  return (
                    <HistoryItem key={index} data={item} type={chatTypeState} />
                  );
                })}
          </motion.div>
        </motion.div>
        <motion.div className="RightSubContainer">
          <div style={{ height: '100px' }}></div>
          <ChatBox />
          <motion.div
            style={{
              height: attachmentListState ? '60px' : '10px',
              opacity: attachmentListState ? '100%' : '0%',
            }}
            className={`AttachmentListContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
          >
            {ATTACHMENTS.map((item, index) => {
              return (
                <div
                  style={{
                    pointerEvents: attachmentListState ? 'all' : 'none',
                  }}
                  className={`AttachmentItem${mode == 'dark' ? 'Dark' : 'Light'}`}
                >
                  <img
                    src={item.icon}
                    style={{
                      opacity: '50%',
                      filter: mode == 'dark' ? 'invert(50)' : 'invert(0)',
                      height: '25px',
                      width: '25px',
                    }}
                  />
                  {item.name}
                </div>
              );
            })}
          </motion.div>
          <MessageBox
            changeAttachmentState={(value: boolean) => {
              setAttachmentListState(value);
            }}
            attachmentState={attachmentListState}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ChatHome;
