import { motion } from 'framer-motion';
import '../Styles/Chat.css';

const Hamburger: React.FC<{ onClick: () => void }> = (props) => {
  return (
    <motion.div
      onClick={() => {
        props.onClick();
      }}
      className="Hamburger"
    >
      {Array.from({ length: 3 }, (_, index) => (
        <motion.div key={index} className="HamburgerLine"></motion.div>
      ))}
    </motion.div>
  );
};

export default Hamburger;
