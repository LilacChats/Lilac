import { motion } from 'framer-motion';
import { useUIStateContext } from '../Contexts';
import '../Styles/ErrorDialog.css';

const ErrorDialog: React.FC<{ message: string }> = (props) => {
  const { mode } = useUIStateContext();
  return (
    <motion.div
      initial={{
        top: '-10p%',
      }}
      animate={{
        top: '2%',
      }}
      exit={{
        top: '-10%',
      }}
      className={`ErrorDialog${mode == 'dark' ? 'Dark' : 'Light'}`}
    >
      <div>{props.message}</div>
    </motion.div>
  );
};

export default ErrorDialog;
