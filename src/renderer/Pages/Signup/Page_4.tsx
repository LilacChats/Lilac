import { motion } from 'framer-motion';
import Markdown from 'react-markdown';
import '../../Styles/Signup.css';
import Button from '../../Components/Button';
import { useKeyBindsContext } from '../../Contexts';

const Page4: React.FC<{ data: string; onAccepted: () => void }> = (props) => {
  const { keyBinds } = useKeyBindsContext();
  return (
    <>
      <motion.div className="MarkDownContainer">
        <Markdown>{props.data}</Markdown>
      </motion.div>
      <Button
        keyCombination={keyBinds.ACCEPT_AGREEMENT.keyCombination}
        name={keyBinds.ACCEPT_AGREEMENT.name}
        onClick={() => {
          props.onAccepted();
        }}
      />
    </>
  );
};

export default Page4;
