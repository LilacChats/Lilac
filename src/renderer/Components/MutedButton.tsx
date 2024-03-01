import { motion } from 'framer-motion';
import { useUIStateContext } from '../Contexts';
import '../Styles/Signup.css';

const MutedButton: React.FC<{
  clicked: Function;
  direction: 'left' | 'right';
  label: string;
  style?: React.CSSProperties;
}> = ({ clicked, direction, label, style = { width: '30px' } }) => {
  const { mode } = useUIStateContext();
  return (
    <motion.div
      initial={{ y: -50, x: 0 }}
      animate={{ y: 0, x: 0 }}
      transition={{ duration: 0.4 }}
      className="PageControlsContainer"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#989898',
        }}
      >
        <div
          onClick={() => {
            clicked();
          }}
          style={style}
          className={`back-button${mode == 'dark' ? 'Dark' : 'Light'}`}
        >
          {direction == 'left' ? (
            <div
              className={`triangle-left${mode == 'dark' ? 'Dark' : 'Light'}`}
            ></div>
          ) : null}
          <div>{label}</div>
          {direction == 'right' ? (
            <div
              className={`triangle-right${mode == 'dark' ? 'Dark' : 'Light'}`}
            ></div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default MutedButton;
