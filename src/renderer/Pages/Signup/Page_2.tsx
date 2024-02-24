import { INPUT_PLACEHOLDERS } from '../../../objs';
import InputBox from '../../Components/InputBox';
import { useAccountContext } from '../../Contexts';

const Page2: React.FC<{
  nameValidationString: string;
  emailValidationString: string;
  passwordValidationString: string;
}> = (props) => {
  const { setName, setEmail, setPassword } = useAccountContext();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
      }}
    >
      <InputBox
        triggerValidationFailAnimation={props.nameValidationString}
        triggerValueChange={(value: string) => {
          setName(value);
        }}
        style={{ width: '300px' }}
        type="text"
        placeholder={INPUT_PLACEHOLDERS.NAME}
      />
      <InputBox
        triggerValidationFailAnimation={props.emailValidationString}
        triggerValueChange={(value: string) => {
          setEmail(value);
        }}
        style={{ width: '300px' }}
        type="text"
        placeholder={INPUT_PLACEHOLDERS.EMAIL}
      />
      <InputBox
        triggerValidationFailAnimation={props.passwordValidationString}
        triggerValueChange={(value: string) => {
          setPassword(value);
        }}
        style={{ width: '300px' }}
        type="password"
        placeholder={INPUT_PLACEHOLDERS.PASSWORD}
      />
    </div>
  );
};

export default Page2;
