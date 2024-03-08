import { motion } from 'framer-motion';
import { useUIStateContext } from '../../Contexts';
import '../../Styles/Chat.css';

const HistoryItem: React.FC<{
  data?: { Name: string; ID: string }[];
  type: 0 | 1;
}> = (props) => {
  const { mode } = useUIStateContext();
  return (
    <motion.div
      style={{
        justifyContent: props.type == 0 ? 'center' : 'flex-start',
      }}
      className={`HistoryItem${mode == 'dark' ? 'Dark' : 'Light'}`}
    >
      {props.type == 1 ? (
        <motion.div
          className={`ProfilePicture${mode == 'dark' ? 'Dark' : 'Light'}`}
        >
          {props.data ? (
            <img
              className={`ProfilePicture${mode == 'dark' ? 'Dark' : 'Light'}`}
              src={props.data.PictureData}
            />
          ) : null}
        </motion.div>
      ) : null}
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
        {props.type == 1 ? (
          <motion.div
            className={`LastMessage${mode == 'dark' ? 'Dark' : 'Light'}`}
          ></motion.div>
        ) : null}
      </motion.div>
    </motion.div>
  );
};

export default HistoryItem;
