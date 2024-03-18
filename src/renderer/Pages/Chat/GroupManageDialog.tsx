import { motion } from 'framer-motion';
import {
  useUIStateContext,
  useKeyBindsContext,
  useAccountContext,
} from '../../Contexts';
import CrossCircleIcon from '../../Assets/x-circle.svg';
import EditIcon from '../../Assets/pencil.svg';
import SelectUserDialog from '../../Components/SelectUserDialog';
import { CHANNELS } from '../../../objs';
import { DMData } from '../../../types';
import Button from '../../Components/Button';
import '../../Styles/Chat.css';
import WarningIcon from '../../Assets/alert-fill.svg';
import { useEffect, useState } from 'react';

const GroupManageDialog: React.FC<{
  mode: 'update' | 'create';
  data?: { name: string; id: string };
  displayStateChanged: (state: boolean) => void;
}> = (props) => {
  const { mode } = useUIStateContext();
  const { keyBinds } = useKeyBindsContext();
  const { id, serverURL } = useAccountContext();
  const [groupNameEditState, setGroupNameEditState] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<DMData[]>([]);
  const [deletionConfirmationState, setDeletetionConfirmationState] =
    useState<boolean>(false);

  useEffect(() => {
    setGroupNameEditState(true);
    setGroupNameEditState(false);
    if (props.mode == 'update') {
      window.electron.ipcRenderer.sendMessage(CHANNELS.FetchGroupData, {
        id: id,
        groupID: props.data ? props.data.id : '',
        serverURL: serverURL,
      });
    }
  }, []);

  window.electron.ipcRenderer.once(CHANNELS.FetchGroupData, (arg: any) => {
    // console.log(arg);
    setGroupMembers(arg);
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
        flexDirection: 'column',
        display: 'flex',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10',
        backdropFilter: 'blur(10px)',
        background: '#00000057',
        // background: 'red',
      }}
    >
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
          height: deletionConfirmationState ? '250px' : '500px',
        }}
        transition={{
          duration: 0.1,
        }}
        exit={{
          scale: 0,
        }}
        style={{
          width: '300px',
          flexDirection: 'column',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          background: mode == 'dark' ? '#2f2f2f' : 'rgb(207,207,207)',
          borderRadius: '10px',
          padding: '10px',
          // position: 'absolute',
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
          {!deletionConfirmationState ? (
            groupNameEditState ? (
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
              <div>{props.mode == 'create' ? 'Group' : props.data?.name}</div>
            )
          ) : null}
          {!deletionConfirmationState ? (
            <img
              onClick={() => {
                setGroupNameEditState(!groupNameEditState);
              }}
              src={groupNameEditState ? CrossCircleIcon : EditIcon}
              style={{
                width: '20px',
                height: '20px',
                opacity: '0.5',
                filter: mode == 'dark' ? 'invert(50)' : 'invert(0)',
                cursor: 'pointer',
              }}
            />
          ) : null}
        </div>
        {props.mode == 'update' ? (
          groupMembers.length != 0 ? (
            !deletionConfirmationState ? (
              <SelectUserDialog
                key={props.data?.id}
                onChange={(data: any) => {
                  var tempData: DMData[] = [];
                  for (var i = 0; i < data.length; i++) {
                    if (data[i].selected)
                      tempData.push({
                        id: data[i].id,
                        name: data[i].name,
                        pictureData: data[i].pictureData,
                      });
                  }
                  setSelectedUsers(tempData);
                }}
                members={groupMembers}
              />
            ) : (
              <div
                className={`GroupDeletionNotice${
                  mode == 'dark' ? 'Dark' : 'Light'
                }`}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    style={{
                      height: '20px',
                      filter: mode == 'dark' ? 'invert(50)' : 'invert(0)',
                      opacity: mode == 'dark' ? '0.5' : '1',
                    }}
                    src={WarningIcon}
                  />
                  <h3>WARNING</h3>
                </div>
                Empty Group will be deleted!
              </div>
            )
          ) : null
        ) : (
          <SelectUserDialog
            key={props.data?.id}
            onChange={(data: any) => {
              var tempData: DMData[] = [];
              for (var i = 0; i < data.length; i++) {
                if (data[i].selected)
                  tempData.push({
                    id: data[i].id,
                    name: data[i].name,
                    pictureData: data[i].pictureData,
                  });
              }
              setSelectedUsers(tempData);
            }}
            members={groupMembers}
          />
        )}

        <Button
          onClick={() => {
            if (props.mode == 'update' && selectedUsers.length == 0) {
              setDeletetionConfirmationState(true);
            } else {
              setGroupNameEditState(false);
              props.displayStateChanged(false);
              window.electron.ipcRenderer.sendMessage(
                props.mode == 'create'
                  ? CHANNELS.AddGroup
                  : CHANNELS.UpdateGroup,
                props.mode == 'create'
                  ? {
                      name: groupName,
                      members: selectedUsers
                        .filter((i) => i.id)
                        .map((i) => String(i.id)),
                      id: id,
                      serverURL: serverURL,
                    }
                  : {
                      name: groupName == '' ? props.data?.name : groupName,
                      members: selectedUsers
                        .filter((i) => i.id)
                        .map((i) => String(i.id)),
                      serverURL: serverURL,
                      userID: id,
                      groupID: props.data?.id,
                    },
              );
            }
          }}
          name={
            props.mode == 'create'
              ? keyBinds.ADD_GROUP.name
              : deletionConfirmationState
              ? keyBinds.PROCEED.name
              : keyBinds.UPDATE_GROUP.name
          }
          keyCombination={
            props.mode == 'update'
              ? keyBinds.ADD_GROUP.keyCombination
              : deletionConfirmationState
              ? keyBinds.PROCEED.keyCombination
              : keyBinds.UPDATE_GROUP.keyCombination
          }
          style={{
            width: '50%',
            height: '10px',
          }}
        />
        <Button
          onClick={() => {
            if (deletionConfirmationState) {
              setDeletetionConfirmationState(false);
            } else {
              setGroupNameEditState(false);
              props.displayStateChanged(false);
            }
          }}
          name={keyBinds.CANCEL_GROUP.name}
          keyCombination={keyBinds.CANCEL_GROUP.keyCombination}
          style={{
            zIndex: '6',
            background: '#ad0040',
            width: '50%',
            height: '10px',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default GroupManageDialog;
