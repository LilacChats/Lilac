import { ChatButtonProps } from '../../TypeModels/ChatModel';
import '../Styles/ChatButton.css';

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      className="ChatButton"
    >
      {'>'}
    </div>
  );
};

export default ChatButton;
