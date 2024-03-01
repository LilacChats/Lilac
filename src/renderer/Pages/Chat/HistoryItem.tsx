import { motion } from 'framer-motion';
import { useUIStateContext } from '../../Contexts';
import '../../Styles/Chat.css';

const HistoryItem = () => {
  const { mode } = useUIStateContext();
  return (
    <motion.div className={`HistoryItem${mode == 'dark' ? 'Dark' : 'Light'}`}>
      <motion.div
        className={`ProfilePicture${mode == 'dark' ? 'Dark' : 'Light'}`}
      ></motion.div>
      <motion.div className="HistoryBlockInfo">
        <motion.div
          className={`Name${mode == 'dark' ? 'Dark' : 'Light'}`}
        ></motion.div>
        <motion.div
          className={`LastMessage${mode == 'dark' ? 'Dark' : 'Light'}`}
        ></motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HistoryItem;
