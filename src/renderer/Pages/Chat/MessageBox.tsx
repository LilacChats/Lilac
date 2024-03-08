import '../../Styles/Chat.css';
import PlusIcon from '../../Assets/plus.svg';
import SendButton from '../../Assets/send.svg';
import { useUIStateContext, useMessageContext } from '../../Contexts';
import { useState, useEffect } from 'react';

const MessageBox: React.FC<{
  attachmentState: boolean;
  changeAttachmentState: (value: boolean) => void;
}> = (props) => {
  const { message, setMessage } = useMessageContext();
  const { mode } = useUIStateContext();
  const [height, setHeight] = useState<number>(50);
  useEffect(() => {
    var numberOfBreaks = 1;
    for (var i = 0; i < message.length; i++) {
      if (message[i] == '\n') {
        numberOfBreaks++;
      }
    }
    if (numberOfBreaks >= 7) numberOfBreaks = 7;
    if (numberOfBreaks <= 2) setHeight(50 * numberOfBreaks);
    else setHeight(30 * numberOfBreaks);
  }, [message]);
  return (
    <div className="MessageBoxSubContainer">
      <div
        style={{
          transform: props.attachmentState ? 'rotate(45deg)' : 'rotate(0deg)',
          background: props.attachmentState
            ? 'rgb(74, 137, 253)'
            : mode == 'dark'
              ? '#202020'
              : '#bdbdbd',
        }}
        onClick={() => {
          props.changeAttachmentState(!props.attachmentState);
        }}
        className={`AddAttachmentButton${mode == 'dark' ? 'Dark' : 'Light'}`}
      >
        <img
          src={PlusIcon}
          style={{
            height: '60%',
            width: '60%',
            filter: props.attachmentState
              ? mode == 'dark'
                ? 'invert(0)'
                : 'invert(50)'
              : mode == 'dark'
                ? 'invert(50)'
                : 'invert(0)',
          }}
        />
      </div>
      <div
        style={{
          padding: height == 50 ? '5px' : '30px 5px',
          borderRadius: height == 50 ? '50px' : '15px',
          height: `${height}px`,
          background:
            height == 50
              ? mode == 'dark'
                ? '#202020'
                : '#bdbdbd'
              : mode == 'dark'
                ? '#2020204d'
                : '#bdbdbd4d',
        }}
        className={`MessageBoxContainer${mode == 'dark' ? 'Dark' : 'Light'}`}
      >
        <textarea
          rows="10"
          cols="30"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Enter Your Message"
          className={`MessageTextBox${mode == 'dark' ? 'Dark' : 'Light'}`}
        />
        <div className="SendButton">
          <img
            src={SendButton}
            style={{
              height: '100%',
              width: '100%',
              filter: mode == 'dark' ? 'invert(0)' : 'invert(50)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
