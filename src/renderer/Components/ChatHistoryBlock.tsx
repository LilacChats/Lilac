import { ChatHistoryBlockProps } from '../../TypeModels/ChatModel';
import '../Styles/ChatPage.css';
import ProfilePicture from './ProfilePicture';

const ChatHistoryBlock: React.FC<ChatHistoryBlockProps> = ({
  name,
  lastMessage,
  pictureData,
  active,
  notifCount,
}) => {
  return (
    <div
      className={`HistoryBlockContainer${active ? 'Selected' : 'Unselected'}`}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <ProfilePicture
          style={{ border: '2px solid', width: '20px', height: '20px' }}
          overridePicture={true}
          overrideData={pictureData}
        />
        <div>{name}</div>
      </div>
      {notifCount > 0 ? (
        <div className="NotificationBubble">{notifCount}</div>
      ) : null}
    </div>
  );
};

export default ChatHistoryBlock;
