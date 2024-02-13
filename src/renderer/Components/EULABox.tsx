import React from 'react';
import Markdown from 'react-markdown';
import { EULABoxProps } from '../../TypeModels/EULABoxModel';
import '../Styles/EULABox.css';

const EULABox: React.FC<EULABoxProps> = ({ content }) => {
  return (
    <div className="AgreementContainer">
      <Markdown>{content}</Markdown>
    </div>
  );
};

export default EULABox;
