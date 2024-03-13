import '../../Styles/Chat.css';
import { useUIStateContext, useKeyBindsContext } from '../../Contexts';
import { motion } from 'framer-motion';
import InputBox from '../../Components/InputBox';
import Button from '../../Components/Button';
import SelectUserDialog from '../../Components/SelectUserDialog';

const AddGroup: React.FC<{}> = (props) => {
  const { mode, setAddGroupDialogState } = useUIStateContext();
  const { keyBinds } = useKeyBindsContext();
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="AddGroupContainer"
    >
      <div className={`AddGroupDialog${mode == 'dark' ? 'Dark' : 'Light'}`}>
        {/* <InputBox
          style={{
            minWidth: '90%',
          }}
          placeholder="Enter Group Name"
          triggerValueChange={(value: string) => {}}
          type="text"
          triggerValidationFailAnimation=""
        /> */}
        <SelectUserDialog />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            width: '90%',
            // paddingLeft: '10px',
          }}
        >
          <Button
            onClick={() => {}}
            name={keyBinds.ADD_GROUP.name}
            keyCombination={keyBinds.ADD_GROUP.keyCombination}
            style={{
              width: '30%',
            }}
          />
          <Button
            onClick={() => {
              setAddGroupDialogState(false);
            }}
            name={keyBinds.CANCEL_GROUP.name}
            keyCombination={keyBinds.CANCEL_GROUP.keyCombination}
            style={{
              background: '#ad0040',
              width: '30%',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AddGroup;
