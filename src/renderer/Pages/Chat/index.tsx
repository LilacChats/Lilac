import { AnimatePresence, motion } from 'framer-motion';
import '../../Styles/Chat.css';
import { useEffect, useState } from 'react';
import Hamburger from '../../Components/Hamburger';
import { CHANNELS } from '../../../objs';
import {
  useAccountContext,
  useKeyBindsContext,
  useUIStateContext,
} from '../../Contexts';
import HistoryItem from './HistoryItem';
import MessageBox from './MessageBox';
import ChatBox from './ChatBox';
import CodeIcon from '../../Assets/code.svg';
import MediaIcon from '../../Assets/media.svg';
import FileIcon from '../../Assets/file.svg';
import GraphIcon from '../../Assets/graph.svg';
import RocketIcon from '../../Assets/rocket.svg';
import PlusIcon from '../../Assets/plus-circle.svg';
import AddGroup from './AddGroup';
import Button from '../../Components/Button';
import SelectUserDialog from '../../Components/SelectUserDialog';
import EditIcon from '../../Assets/pencil.svg';
import { DMData } from '../../../types';
import CrossCircleIcon from '../../Assets/x-circle.svg';

const ChatHome = () => {
  const ATTACHMENTS: { name: string; icon: string }[] = [
    { name: 'Image/Video', icon: MediaIcon },
    { name: 'Code', icon: CodeIcon },
    { name: 'File', icon: FileIcon },
    { name: 'Poll', icon: GraphIcon },
  ];
  const { id, pictureData, serverURL } = useAccountContext();
  const { keyBinds } = useKeyBindsContext();
  const { mode, addGroupDialogState, setAddGroupDialogState } =
    useUIStateContext();
  const [serverListState, setServerListState] = useState<boolean>(false);
  const [createGroupState, setCreateGroupState] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<DMData[]>([]);
  const [groupNameEditState, setGroupNameEditState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [groupData, setGroupData] = useState<
    { Name: string; ID: string; Members: string[] }[]
  >([]);
  const [selectedGroup, setSelectedGroup] = useState<{
    ID: string;
    Name: string;
    Members: string[];
  }>({ ID: '', Name: '', Members: [] });
  const [selectedDM, setSelectedDM] = useState<DMData>({
    ID: '',
    Name: '',
    PictureData: '',
  });
  const [dmData, setDMData] = useState<DMData[]>([]);
  const [chatTypeState, setChatTypeState] = useState<0 | 1>(0);
  const [attachmentListState, setAttachmentListState] =
    useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(CHANNELS.FetchServerData, {
      type: chatTypeState == 0 ? 'Groups' : 'DM',
      id: id,
      serverURL: serverURL,
    });
  }, [chatTypeState]);

  window.electron.ipcRenderer.once(CHANNELS.FetchServerData, (arg: any) => {
    if (chatTypeState == 0 && arg.type == 'Groups') {
      if (arg.data) {
        if (arg.data.length > 0) {
          setGroupData(arg.data);
          setDMData([]);
        } else setGroupData([]);
      } else {
        setGroupData([]);
        setDMData([]);
      }
    } else if (chatTypeState == 1 && arg.type == 'DM') {
      if (arg.data.length > 0) setDMData(arg.data);
      else setDMData([]);
    }
    setLoadingState(false);
  });

  return (
    <motion.div
      className={`MainChatContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
    >
      <AnimatePresence>
        {addGroupDialogState ? <AddGroup /> : null}
      </AnimatePresence>
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
                        <motion.div
                          initial={{
                            scale: 0,
                          }}
                          animate={{
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.1,
                          }}
                          exit={{
                            scale: 0,
                          }}
                          style={{
                            // transition: '4s all',
                            width: '100%',
                            flexDirection: 'column',
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              color: mode == 'dark' ? '#bdbdbd' : '#2f2f2f',
                              fontSize: '20px',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '10px',
                              width: '100%',
                            }}
                          >
                            {groupNameEditState ? (
                              <input
                                value={groupName}
                                onChange={(e) => {
                                  setGroupName(e.target.value);
                                }}
                                style={{
                                  fontSize: '15px',
                                  width: '70%',
                                  height: '30px',
                                  borderBottom: `1px solid ${
                                    mode == 'dark' ? '#bdbdbd' : '#2f2f2f'
                                  }`,
                                  color: mode == 'dark' ? '#bdbdbd' : '#2f2f2f',
                                }}
                                type="text"
                                placeholder="Enter Group Name"
                              />
                            ) : (
                              <div>Group</div>
                            )}
                            <img
                              onClick={() => {
                                setGroupNameEditState(!groupNameEditState);
                              }}
                              src={
                                groupNameEditState ? CrossCircleIcon : EditIcon
                              }
                              style={{
                                width: '20px',
                                height: '20px',
                                opacity: '0.5',
                                filter:
                                  mode == 'dark' ? 'invert(50)' : 'invert(0)',
                              }}
                            />
                          </div>
                          <SelectUserDialog
                            onChange={(data: any) => {
                              var tempData: DMData[] = [];
                              for (var i = 0; i < data.length; i++) {
                                if (data[i].selected)
                                  tempData.push({
                                    ID: data[i].ID,
                                    Name: data[i].Name,
                                    PictureData: data[i].PictureData,
                                  });
                              }
                              setSelectedUsers(tempData);
                            }}
                          />
                          <Button
                            onClick={() => {
                              setGroupNameEditState(false);
                              setCreateGroupState(false);
                              window.electron.ipcRenderer.sendMessage(
                                CHANNELS.AddGroup,
                                {
                                  name: groupName,
                                  members: selectedUsers
                                    .filter((i) => i.ID)
                                    .map((i) => String(i.ID)),
                                  id: id,
                                  serverURL: serverURL,
                                },
                              );
                            }}
                            name={keyBinds.ADD_GROUP.name}
                            keyCombination={keyBinds.ADD_GROUP.keyCombination}
                            style={{
                              width: '50%',
                              height: '10px',
                            }}
                          />
                          <Button
                            onClick={() => {
                              setGroupNameEditState(false);
                              setCreateGroupState(false);
                            }}
                            name={keyBinds.CANCEL_GROUP.name}
                            keyCombination={
                              keyBinds.CANCEL_GROUP.keyCombination
                            }
                            style={{
                              zIndex: '6',
                              background: '#ad0040',
                              width: '50%',
                              height: '10px',
                            }}
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
                {groupData.map((item, index) => {
                  return (
                    <HistoryItem
                      onClick={(data: {
                        ID: string;
                        Name: string;
                        Members: string[];
                      }) => {
                        setSelectedGroup(data);
                      }}
                      key={index}
                      data={item}
                      type={chatTypeState}
                    />
                  );
                })}
              </>
            ) : (
              <>
                {dmData.map((item, index) => {
                  return (
                    <HistoryItem
                      onClick={(data: {
                        Name: string;
                        ID: string;
                        PictureData: string;
                      }) => {
                        setSelectedDM(data);
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
          {selectedGroup.ID != '' || selectedDM.ID != '' ? (
            <>
              <div
                className={`TopProfileView${mode == 'dark' ? 'Dark' : 'Light'}`}
              >
                {chatTypeState == 1 ? (
                  <img
                    className={`ProfilePicture${
                      mode == 'dark' ? 'Dark' : 'Light'
                    }`}
                    src={pictureData}
                  />
                ) : null}
                <div className="ChatBoxProfileContainer">
                  <div>
                    {chatTypeState == 0 ? selectedGroup.Name : selectedDM.Name}
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
                        {selectedGroup.Members.length}
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
      </motion.div>
    </motion.div>
  );
};

export default ChatHome;
