import { motion } from 'framer-motion';
import '../Styles/Signup.css';

const SignupPageIndicator: React.FC<{ page: number }> = (props) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.4,
      }}
      className="PageIndicatorContainer"
    >
      {Array.from({ length: 4 }, (_, index) => (
        <div
          className={`PageIndicator${
            props.page - 1 == index ? 'Active' : 'Inactive'
          }`}
        ></div>
      ))}
    </motion.div>
  );
};

export default SignupPageIndicator;
