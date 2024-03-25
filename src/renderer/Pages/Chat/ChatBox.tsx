import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import { useUIStateContext, useAccountContext } from '../../Contexts';
import { Message } from '../../../types';
import { CHANNELS } from '../../../objs';
import { useEffect, useState, useRef } from 'react';
import '../../Styles/Chat.css';

const TextMessage: React.FC<Message> = (props) => {
  const { mode } = useUIStateContext();
  const { id } = useAccountContext();
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    var date = new Date(props.timestamp * 1000);
    var hours = date.getHours();
    var minutes = '0' + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    setTimestamp(formattedTime);
  }, []);
  return (
    <motion.div
      className={`MessageBlock${props.senderID == id ? 'Sender' : 'Receiver'}${mode == 'dark' ? 'Dark' : 'Light'}`}
    >
      <div>{props.message}</div>
      <div
        className={`TimestampBlock${props.senderID == id ? 'Sender' : 'Receiver'}`}
      >
        {timestamp}
      </div>
    </motion.div>
  );
};

const ChatBox = () => {
  const { mode } = useUIStateContext();
  const chatContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: chatContainerRef });
  const [messages, setMessages] = useState<Message[]>([]);
  const [pullDownButtonState, setPullDownButtonState] =
    useState<boolean>(false);

  window.electron.ipcRenderer.on(CHANNELS.TriggerChat, (arg) => {
    setMessages(arg);
  });

  useMotionValueEvent(scrollYProgress, 'change', (latestValue) => {
    // console.log(latestValue);
    if (latestValue <= 0.98) {
      setPullDownButtonState(true);
    } else {
      setPullDownButtonState(false);
    }
  });

  return (
    <motion.div
      ref={chatContainerRef}
      className={`ChatBoxContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
    >
      {messages.map((item, index) => {
        return (
          <TextMessage
            key={index}
            timestamp={item.timestamp + ''}
            senderID={item.senderID}
            message={item.message}
            receiverID={item.receiverID}
          />
        );
      })}
      <AnimatePresence>
        {pullDownButtonState ? (
          <motion.div
            onClick={() => {
              chatContainerRef.current.scroll({
                top: chatContainerRef.current.scrollHeight,
                behaviour: 'smooth',
              });
            }}
            className={`LatestMessageFetcher${mode == 'dark' ? 'Dark' : 'Light'}`}
          >
            Go to Latest Message
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatBox;
