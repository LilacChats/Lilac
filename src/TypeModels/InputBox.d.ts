type InputBoxProps = {
  type: 'email' | 'password' | 'name' | 'server' | 'chat';
  // onChanged: Function;
  errorState: boolean;
  style: React.CSSProperties;
  placeholder: string;
};

export { InputBoxProps };
