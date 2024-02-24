import { motion } from 'framer-motion';
import Markdown from 'react-markdown';
import '../../Styles/Signup.css';

const Page4: React.FC<{ data: string }> = (props) => {
  return (
    <motion.div className="MarkDownContainer">
      <Markdown>{props.data}</Markdown>
    </motion.div>
  );
};

export default Page4;
