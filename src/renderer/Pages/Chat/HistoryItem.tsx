import { motion } from 'framer-motion';
import { useAccountContext, useUIStateContext } from '../../Contexts';
import PeopleIcon from '../../Assets/people.svg';
import '../../Styles/Chat.css';
import { MutableRefObject, useState } from 'react';
import DotsIcon from '../../Assets/kebab-horizontal.svg';
import EditIcon from '../../Assets/pencil.svg';
import TrashIcon from '../../Assets/trash.svg';
import BellIcon from '../../Assets/bell.svg';
import MuteIcon from '../../Assets/bell-slash.svg';
import { CHANNELS } from '../../../objs';
import GroupManageDialog from './GroupManageDialog';

const HistoryItem: React.FC<{
  data?: { name: string; id: string; pictureData?: string; active?: boolean };
  type: 0 | 1;
  onClick: Function;
  key: number;
}> = (props) => {
  const { mode } = useUIStateContext();
  const { serverURL, id } = useAccountContext();
  const [hoverState, setHoverState] = useState<boolean>(false);
  const [groupMutedState, setGroupMutedState] = useState<boolean>(false);
  const [editGroupState, setEditGroupState] = useState<boolean>(false);
  return (
    <>
      {props.type == 1 ? (
        <motion.div
          onClick={() => {
            if (props.data) props.onClick(props.data);
          }}
          key={props.key}
          style={{
            justifyContent: 'flex-start',
            padding: '10px 0px 0px 10px',
          }}
          className={`HistoryItem${mode == 'dark' ? 'Dark' : 'Light'}`}
        >
          <motion.div
            className={`ProfilePicture${mode == 'dark' ? 'Dark' : 'Light'}`}
          >
            {props.data ? (
              <img
                className={`ProfilePicture${mode == 'dark' ? 'Dark' : 'Light'}`}
                src={
                  props.data.hasOwnProperty('pictureData')
                    ? props.data.pictureData
                    : ''
                }
              />
            ) : null}
          </motion.div>
          <motion.div className="HistoryBlockInfo">
            {!props.data ? (
              <motion.div
                className={`Name${mode == 'dark' ? 'Dark' : 'Light'}`}
              ></motion.div>
            ) : (
              <div
                style={{
                  fontSize: '20px',
                  color: mode == 'dark' ? '#bdbdbd' : '#2f2f2f',
                }}
              >
                {props.data.name}
              </div>
            )}
            <motion.div
              className={`LastMessage${mode == 'dark' ? 'Dark' : 'Light'}`}
            ></motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <>
          {!editGroupState ? (
            <motion.div
              className="GroupItem"
              style={{
                minHeight: hoverState ? '70px' : '40px',
                background: mode == 'dark' ? '#2f2f2f' : 'rgb(207,207,207)',
                paddingBottom: hoverState ? '5px' : '5px',
              }}
            >
              <motion.div
                onClick={() => {
                  if (props.data) {
                    props.onClick(props.data);
                  }
                }}
                className={`HistoryItem${
                  mode == 'dark' ? 'Dark' : 'Light'
                } GroupSubContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
              >
                <div className="GroupLabelContainer">
                  <img
                    src={PeopleIcon}
                    style={{
                      width: '20px',
                      height: '20px',
                      filter: mode == 'dark' ? 'invert(50)' : 'invert(0)',
                    }}
                  />
                  {props.data?.name}
                </div>
                <img
                  style={{
                    opacity: '0.5',
                    marginTop: '-10px',
                    filter: mode == 'dark' ? 'invert(50)' : 'invert(0)',
                  }}
                  onClick={() => {
                    var tempState = hoverState;
                    setHoverState(!tempState);
                  }}
                  src={DotsIcon}
                />
              </motion.div>
              {hoverState ? (
                <div className="HistoryItemOptions">
                  <motion.div
                    onClick={() => {
                      setEditGroupState(true);
                    }}
                    className={`EditIcon${mode == 'dark' ? 'Dark' : 'Light'}`}
                  >
                    <img
                      className={`Icon${mode == 'dark' ? 'Dark' : 'Light'}`}
                      src={EditIcon}
                    />
                  </motion.div>
                  <motion.div
                    onClick={() => {
                      window.electron.ipcRenderer.sendMessage(
                        CHANNELS.DeleteGroup,
                        {
                          groupID: props.data?.id,
                          serverURL: serverURL,
                          id: id,
                        },
                      );
                    }}
                    className={`EditIcon${mode == 'dark' ? 'Dark' : 'Light'}`}
                  >
                    <img
                      className={`Icon${mode == 'dark' ? 'Dark' : 'Light'}`}
                      src={TrashIcon}
                    />
                  </motion.div>
                  <motion.div
                    onClick={() => {
                      setGroupMutedState(!groupMutedState);
                    }}
                    className={`EditIcon${mode == 'dark' ? 'Dark' : 'Light'}`}
                  >
                    <img
                      className={`Icon${mode == 'dark' ? 'Dark' : 'Light'}`}
                      src={groupMutedState ? MuteIcon : BellIcon}
                    />
                  </motion.div>
                </div>
              ) : null}
            </motion.div>
          ) : (
            <motion.div
              style={{
                padding: '10px',
                background: mode == 'dark' ? '#2f2f2f' : 'rgb(207,207,207)',
                borderRadius: '5px',
              }}
            >
              <GroupManageDialog
                mode="update"
                data={{
                  name: props.data?.name ? props.data.name : '',
                  id: props.data?.id ? props.data.id : '',
                }}
                displayStateChanged={(state: boolean) => {
                  setEditGroupState(state);
                }}
              />
            </motion.div>
          )}
        </>
      )}
    </>
  );
};

export default HistoryItem;
