import { motion } from 'framer-motion';
import '../Styles/UISwitcher.css';
import Light from '../Assets/sun.svg';
import Dark from '../Assets/moon.svg';
import { useUIStateContext } from '../Contexts';

const UISwitcher = () => {
  const { mode, setMode } = useUIStateContext();
  return (
    <div className={`SwitcherContainer${mode == 'dark' ? 'Dark' : 'Light'}`}>
      <motion.div
        onClick={() => {
          if (mode == 'light') setMode('dark');
          else setMode('light');
        }}
        style={{
          marginLeft: mode == 'light' ? '0%' : '55%',
        }}
        className={`SwitcherThumb${mode == 'dark' ? 'Dark' : 'Light'}`}
      >
        <img
          style={{ filter: mode == 'light' ? '' : 'invert(100%)' }}
          src={mode == 'light' ? Light : Dark}
        />
      </motion.div>
    </div>
  );
};
export default UISwitcher;
