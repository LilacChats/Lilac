import { INPUT_PLACEHOLDERS } from '../../../objs';
import InputBox from '../../Components/InputBox';

const Page3: React.FC<{
  serverURLValidationString: string;
  onChange: (value: string) => void;
}> = (props) => {
  return (
    <InputBox
      triggerValidationFailAnimation={props.serverURLValidationString}
      triggerValueChange={(value: string) => {
        props.onChange(value);
      }}
      style={{ width: '400px' }}
      type="text"
      placeholder={INPUT_PLACEHOLDERS.SERVER}
    />
  );
};

export default Page3;
