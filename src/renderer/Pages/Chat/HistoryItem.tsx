import { motion } from 'framer-motion';
import { useUIStateContext } from '../../Contexts';
import HashIcon from '../../Assets/hash.svg';
import '../../Styles/Chat.css';

const HistoryItem: React.FC<{
  data?:
    | { Name: string; ID: string }
    | { Name: string; ID: string; PictureData: string };
  type: 0 | 1;
  onClick: Function;
}> = (props) => {
  const { mode } = useUIStateContext();
  return (
    <>
      {props.type == 1 ? (
        <motion.div
          onClick={() => {
            if (props.data) {
              props.onClick(props.data);
            }
          }}
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
                src={props.data.PictureData}
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
          onClick={() => {
            if (props.data) {
              props.onClick(props.data);
            }
          }}
          style={{
            minHeight: '40px',
            color: mode == 'dark' ? '#bdbdbd' : '#2f2f2f',
          }}
          className={`HistoryItem${mode == 'dark' ? 'Dark' : 'Light'}`}
        >
          <img
            src={HashIcon}
            style={{
              width: '20px',
              height: '20px',
              filter: mode == 'dark' ? 'invert(50)' : 'invert(0)',
            }}
          />
          {props.data.Name}
        </motion.div>
      )}
    </>
  );
};

export default HistoryItem;
