import { motion } from 'framer-motion';
import { useAccountContext, useUIStateContext } from '../Contexts';
import '../Styles/SelectUserDialog.css';
import '../Styles/Chat.css';
import { useEffect, useState } from 'react';
import { CHANNELS } from '../../objs';
import { DMData } from '../../types';
import CheckIcon from '../Assets/check.svg';

const SelectUserDialog: React.FC<{
  onChange: (data: DMData & { selected: boolean }[]) => void;
  members?: string[];
}> = (props) => {
  const { mode } = useUIStateContext();
  const { id, serverURL } = useAccountContext();
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(CHANNELS.FetchServerData, {
      type: 'DM',
      id: id,
      serverURL: serverURL,
    });
  }, []);

  useEffect(() => {
    var tempData = selectedUsers;
    for (var i = 0; i < tempData.length; i++) {
      if (props.members?.findIndex((item) => item === tempData[i].ID)) {
        tempData[i].selected = true;
      }
    }
    setSelectedUsers(tempData);
  }, [props.members]);

  window.electron.ipcRenderer.once(CHANNELS.FetchServerData, (args: any) => {
    if (args.type == 'DM') {
      if (args.data) {
        if (args.data.length > 0) {
          var tempData: any = [];
          for (var i = 0; i < args.data.length; i++) {
            tempData.push({
              selected:
                props.members?.findIndex((item) => item === args.data[i].id) !=
                -1
                  ? true
                  : false,
              ...args.data[i],
            });
          }
          setSelectedUsers(tempData);
        }
      }
    }
  });
  useEffect(() => {
    props.onChange(selectedUsers);
  }, [selectedUsers]);

  return (
    <motion.div
      className={`ErrorDialogContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
    >
      <motion.div className={`UserList${mode == 'dark' ? 'Dark' : 'Light'}`}>
        {selectedUsers.map(
          (item: DMData & { selected: boolean }, index: number) => {
            return (
              <motion.div
                key={index + Date.now() + ''}
                className={`UserItem${mode == 'dark' ? 'Dark' : 'Light'}`}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <motion.div
                    style={{
                      height: '40px',
                      width: '40px',
                    }}
                    className={`ProfilePicture${
                      mode == 'dark' ? 'Dark' : 'Light'
                    }`}
                  >
                    <img
                      style={{
                        height: '40px',
                        width: '40px',
                      }}
                      className={`ProfilePicture${
                        mode == 'dark' ? 'Dark' : 'Light'
                      }`}
                      src={item.pictureData}
                    />
                  </motion.div>
                  <div>{item.name}</div>
                </div>
                <div
                  key={Date.now() + index + ''}
                  onClick={() => {
                    setSelectedUsers((prevUsers: any) => {
                      return prevUsers.map((user: any, idx: number) => {
                        if (idx === index) {
                          return { ...user, selected: !user.selected };
                        }
                        return user;
                      });
                    });
                  }}
                  style={{
                    background: item.selected
                      ? mode == 'dark'
                        ? 'rgb(74, 137, 253)'
                        : 'rgb(56, 104, 192)'
                      : mode == 'dark'
                      ? '#202020'
                      : '#bdbdbd',
                  }}
                  className={`CheckBox${mode == 'dark' ? 'Dark' : 'Light'}`}
                >
                  <img
                    src={CheckIcon}
                    style={{
                      opacity: '0.5',
                      filter:
                        mode == 'dark'
                          ? !item.selected
                            ? 'invert(50)'
                            : 'invert(0)'
                          : !item.selected
                          ? 'invert(0)'
                          : 'invert(50)',
                    }}
                  />
                </div>
              </motion.div>
            );
          },
        )}
      </motion.div>
    </motion.div>
  );
};

export default SelectUserDialog;
