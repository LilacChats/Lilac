type InputBoxProps = {
  type: 'email' | 'password' | 'name' | 'server';
  // onChanged: Function;
  errorState: boolean;
  style: React.CSSProperties;
  placeholder: string;
};

export { InputBoxProps };
