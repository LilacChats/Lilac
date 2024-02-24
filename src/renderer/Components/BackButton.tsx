import { motion } from 'framer-motion';
import '../Styles/Signup.css';

const BackButton: React.FC<{ clicked: Function }> = ({ clicked }) => {
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
          className="back-button"
        >
          <div className="triangle"></div>
          <div>Back</div>
        </div>
      </div>
    </motion.div>
  );
};

export default BackButton;
