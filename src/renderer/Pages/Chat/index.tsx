import { AnimatePresence, motion } from 'framer-motion';
import '../../Styles/Chat.css';
import { useEffect, useRef, useState } from 'react';
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
import RocketIcon from '../../Assets/rocket.svg';
import PlusIcon from '../../Assets/plus-circle.svg';
import LogoutIcon from '../../Assets/sign-out.svg';
import { DMData } from '../../../types';
import GroupManageDialog from './GroupManageDialog';

const ChatHome = () => {
  const ATTACHMENTS: { name: string; icon: string }[] = [
    { name: 'Image/Video', icon: MediaIcon },
    { name: 'Code', icon: CodeIcon },
    { name: 'File', icon: FileIcon },
    { name: 'Poll', icon: GraphIcon },
  ];
  const { id, pictureData, serverURL } = useAccountContext();
  const { mode } = useUIStateContext();
  const [serverListState, setServerListState] = useState<boolean>(false);
  const [createGroupState, setCreateGroupState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [groupData, setGroupData] = useState<
    { name: string; id: string; members: string[]; active?: boolean }[]
  >([]);
  const [selectedGroup, setSelectedGroup] = useState<{
    id: string;
    name: string;
    members: string[];
  }>({ id: '', name: '', members: [] });
  const [selectedDM, setSelectedDM] = useState<DMData>({
    id: '',
    name: '',
    pictureData: '',
  });
  const [dmData, setDMData] = useState<DMData[]>([]);
  const [hoverLogout, setHoverLogout] = useState<boolean>(false);
  const [chatTypeState, setChatTypeState] = useState<0 | 1>(0);
  const [attachmentListState, setAttachmentListState] =
    useState<boolean>(false);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(CHANNELS.FetchServerData, {
      type: chatTypeState == 0 ? 'Groups' : 'DM',
      id: id,
      serverURL: serverURL,
    });
  }, [chatTypeState]);
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(CHANNELS.FetchID, { id: id });
  }, [id]);

  window.electron.ipcRenderer.on(CHANNELS.FetchServerData, (arg: any) => {
    if (chatTypeState == 0 && arg.type == 'Groups') {
      if (arg.data) {
        if (arg.data.length > 0) {
          for (var i = 0; i < arg.data.length; i++) {
            arg.data[i].active = false;
          }
          setGroupData(arg.data);
          setDMData([]);
        } else setGroupData([]);
      } else {
        setGroupData([]);
        setDMData([]);
      }
    } else if (chatTypeState == 1 && arg.type == 'DM') {
      if (arg.data.length > 0) {
        setDMData(arg.data);
      } else setDMData([]);
    }
    setLoadingState(false);
  });

  return (
    <motion.div
      className={`MainChatContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
    >
      <motion.div className={`ServerList${mode == 'dark' ? 'Dark' : 'Light'}`}>
        {Array.from({ length: 4 }, (index: number, _) => (
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
            className={`ChatListTypeSwitcherContainer${
              mode == 'dark' ? 'Dark' : 'Light'
            }`}
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
              className={`ChatListTypeSelector${
                mode == 'dark' ? 'Dark' : 'Light'
              }`}
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
            {chatTypeState === 0 ? (
              <>
                <div
                  onClick={() => {
                    // setAddGroupDialogState(true);
                    if (!createGroupState) setCreateGroupState(true);
                  }}
                  style={{
                    padding: createGroupState ? '10px' : '0px',
                    minHeight: !createGroupState ? '40px' : 'fit-content',
                  }}
                  className={
                    !createGroupState
                      ? `AddGroup${mode == 'dark' ? 'Dark' : 'Light'}`
                      : `HistoryItem${mode == 'dark' ? 'Dark' : 'Light'}`
                  }
                >
                  {!createGroupState ? (
                    <img
                      src={PlusIcon}
                      style={{
                        height: '20px',
                        width: '20px',
                        filter: mode == 'dark' ? 'invert(50)' : 'invert(0)',
                      }}
                    />
                  ) : null}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: createGroupState ? '100%' : '',
                      alignItems: 'flex-start',
                    }}
                  >
                    <AnimatePresence>
                      {!createGroupState ? <>{'Add Group'}</> : null}
                    </AnimatePresence>
                    <AnimatePresence>
                      {createGroupState ? (
                        <GroupManageDialog
                          mode="create"
                          displayStateChanged={(state: boolean) => {
                            setCreateGroupState(state);
                          }}
                        />
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
                {groupData.map((item, index) => (
                  <HistoryItem
                    onClick={(data: {
                      id: string;
                      name: string;
                      members: string[];
                    }) => {
                      setSelectedGroup(data);
                    }}
                    key={index}
                    data={item}
                    type={chatTypeState}
                  />
                ))}
              </>
            ) : (
              <>
                {dmData.map((item, index) => {
                  return (
                    <HistoryItem
                      onClick={(data: {
                        name: string;
                        id: string;
                        pictureData: string;
                      }) => {
                        setSelectedDM(data);
                        if (data)
                          window.electron.ipcRenderer.sendMessage(
                            CHANNELS.TriggerChat,
                            {
                              senderID: id,
                              receiverID: data.id,
                              serverURL: serverURL,
                            },
                          );
                      }}
                      key={index}
                      data={item}
                      type={chatTypeState}
                    />
                  );
                })}
              </>
            )}
          </motion.div>
        </motion.div>
        <motion.div className="RightSubContainer">
          {selectedGroup.id != '' || selectedDM.id != '' ? (
            <>
              <div
                className={`TopProfileView${mode == 'dark' ? 'Dark' : 'Light'}`}
              >
                {chatTypeState == 1 ? (
                  <img
                    className={`ProfilePicture${
                      mode == 'dark' ? 'Dark' : 'Light'
                    }`}
                    src={selectedDM.pictureData}
                  />
                ) : null}
                <div className="ChatBoxProfileContainer">
                  <div>
                    {chatTypeState == 0 ? selectedGroup.name : selectedDM.name}
                  </div>
                  <div
                    className={`ProfileStatus${
                      mode == 'dark' ? 'Dark' : 'Light'
                    }`}
                  >
                    {chatTypeState == 0 ? (
                      <div
                        style={{
                          borderRadius: '50px',
                          paddingLeft: '10px',
                          paddingRight: '10px',
                          width: 'fit-content',
                          color: mode == 'dark' ? 'black' : 'rgb(207,207,207)',
                          background:
                            mode == 'dark' ? 'rgb(75,75,75)' : '#989898',
                        }}
                      >
                        {selectedGroup.members.length}
                      </div>
                    ) : null}
                    Online
                    <div
                      className={`OnlineStatus${
                        mode == 'dark' ? 'Dark' : 'Light'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
              <ChatBox />
              <motion.div
                style={{
                  height: attachmentListState ? '60px' : '10px',
                  opacity: attachmentListState ? '100%' : '0%',
                }}
                className={`AttachmentListContainer${
                  mode == 'dark' ? 'Dark' : 'Light'
                }`}
              >
                {ATTACHMENTS.map((item, index) => {
                  return (
                    <div
                      style={{
                        pointerEvents: attachmentListState ? 'all' : 'none',
                      }}
                      className={`AttachmentItem${
                        mode == 'dark' ? 'Dark' : 'Light'
                      }`}
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
                receiverID={selectedDM.id}
                changeAttachmentState={(value: boolean) => {
                  setAttachmentListState(value);
                }}
                attachmentState={attachmentListState}
              />
            </>
          ) : (
            <div
              className={`EmptyChatContainer${
                mode == 'dark' ? 'Dark' : 'Light'
              }`}
            >
              <img
                style={{
                  filter: mode == 'dark' ? 'invert(50)' : 'invert(0)',
                  height: '200px',
                  width: '200px',
                  opacity: '0.05',
                }}
                src={RocketIcon}
              />
              <p style={{ opacity: '0.50' }}>Start a New Chat</p>
            </div>
          )}
        </motion.div>
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '20%',
            height: '100%',
            paddingTop: '20px',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
          }}
        >
          <div
            onClick={() => {
              window.electron.ipcRenderer.sendMessage(CHANNELS.Logout, {
                id: id,
                serverURL: serverURL,
              });
            }}
            onMouseEnter={() => {
              setHoverLogout(true);
            }}
            onMouseLeave={() => {
              setHoverLogout(false);
            }}
            className={`LogoutButton${mode == 'dark' ? 'Dark' : 'Light'}`}
          >
            <div
              style={{
                height: '100%',
                paddingBottom: '2px',
                width: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Logout
            </div>
            <img
              src={LogoutIcon}
              style={{
                transition: '0.4s all',
                height: '50%',
                filter:
                  mode == 'dark'
                    ? hoverLogout
                      ? 'invert(0)'
                      : 'invert(50)'
                    : 'invert(0)',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ChatHome;
