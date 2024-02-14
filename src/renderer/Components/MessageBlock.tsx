import { MessageBlockProps } from '../../TypeModels/ChatModel';
import '../Styles/ChatPage.css';
import ProfilePicture from './ProfilePicture';

const MessageBlock: React.FC<MessageBlockProps> = ({
  pictureData,
  data,
  index,
  originator,
}) => {
  return (
    <div key={index} className="ChatMessage">
      <div className="InternalMessageContainer">
        {/*<div style={{ fontSize: '20px', color: 'mediumpurple' }}>
          {data.name}
        </div>*/}
        <div
          style={{
            padding: '10px',
            // fontFamily: 'system-ui',
            fontSize: '15px',
            color: originator ? '#919191' : 'mediumpurple',
          }}
        >
          {data.message}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            color: '#9d9d9d',
          }}
        >
          3:10pm
        </div>
      </div>
    </div>
  );
};

export default MessageBlock;
