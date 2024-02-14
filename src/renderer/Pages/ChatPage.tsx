import { MESSAGES } from '../../objs';
import ChatButton from '../Components/ChatButton';
import ChatHistoryBlock from '../Components/ChatHistoryBlock';
import InputBox from '../Components/InputBox';
import MessageBlock from '../Components/MessageBlock';
import ProfilePicture from '../Components/ProfilePicture';
import { useProfileInfoContext } from '../Contexts';
import '../Styles/ChatPage.css';

const ChatPage = () => {
  const { pictureData } = useProfileInfoContext();
  const arr: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return (
    <div className="MainChatContainer">
      <div className="ChatHistoryContainer">
        <ChatHistoryBlock
          active={true}
          name="Rose"
          lastMessage=""
          pictureData={pictureData}
          notifCount={0}
        />
        <ChatHistoryBlock
          active={false}
          name="Boo"
          lastMessage=""
          pictureData={pictureData}
          notifCount={12}
        />
        <ChatHistoryBlock
          active={false}
          name="Vivian"
          lastMessage=""
          pictureData={pictureData}
          notifCount={2}
        />
      </div>
      <div className="ChatBox">
        <div className="ProfileBox">
          <ProfilePicture
            style={{
              width: '50px',
              height: '50px',
              border: '2px solid',
            }}
            overridePicture={true}
            overrideData={pictureData}
          />
          <ProfilePicture
            style={{
              width: '50px',
              height: '50px',
              border: '2px solid',
              marginLeft: '-34px',
            }}
            overridePicture={true}
            overrideData={pictureData}
          />
        </div>
        <div className="MessageContainer">
          {MESSAGES.map((item, index) => {
            return (
              <MessageBlock
                originator={index % 2 == 0 ? true : false}
                index={index}
                pictureData={pictureData}
                data={item}
              />
            );
          })}
        </div>
        <div className="ChatControls">
          <InputBox
            style={{
              height: '25px',
              width: '100%',
              textAlign: 'start',
            }}
            type="chat"
            errorState={false}
            placeholder="Enter Something"
          />
          <ChatButton onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
