import { motion } from 'framer-motion';
import { useUIStateContext } from '../../Contexts';
import PeopleIcon from '../../Assets/people.svg';
import '../../Styles/Chat.css';
import { useState } from 'react';
import DotsIcon from '../../Assets/kebab-horizontal.svg';
import EditIcon from '../../Assets/pencil.svg';
import TrashIcon from '../../Assets/trash.svg';
import BellIcon from '../../Assets/bell.svg';
import MuteIcon from '../../Assets/bell-slash.svg';

const HistoryItem: React.FC<{
  data?:
    | { Name: string; ID: string; PictureData: string }
    | { Name: string; ID: string };
  type: 0 | 1;
  onClick: Function;
}> = (props) => {
  const { mode } = useUIStateContext();
  const [hoverState, setHoverState] = useState<boolean>(false);
  const [groupMutedState, setGroupMutedState] = useState<boolean>(false);
  return (
    <>
      {props.type == 1 ? (
        <motion.div
          style={{
            justifyContent: 'flex-start',
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
                  props.data.hasOwnProperty('PictureData')
                    ? props.data.PictureData
                    : null
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
                {props.data.Name}
              </div>
            )}
            <motion.div
              className={`LastMessage${mode == 'dark' ? 'Dark' : 'Light'}`}
            ></motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="GroupItem"
          style={{
            minHeight: hoverState ? '80px' : '40px',
            background: mode == 'dark' ? '#2f2f2f' : 'rgb(207,207,207)',
            paddingBottom: hoverState ? '10px' : '0px',
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
              {props.data?.Name}
            </div>
            <img
              style={{
                opacity: '0.5',
                marginTop: '-10px',
                filter: mode == 'dark' ? 'invert(50)' : 'invert(0)',
              }}
              onClick={() => {
                setHoverState(!hoverState);
              }}
              src={DotsIcon}
            />
          </motion.div>
          {hoverState ? (
            <div className="HistoryItemOptions">
              <motion.div
                className={`EditIcon${mode == 'dark' ? 'Dark' : 'Light'}`}
              >
                <img
                  className={`Icon${mode == 'dark' ? 'Dark' : 'Light'}`}
                  src={EditIcon}
                />
              </motion.div>
              <motion.div
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
      )}
    </>
  );
};

export default HistoryItem;
