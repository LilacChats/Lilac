type ChatButtonProps = {
  onClick: () => void;
};
type MessageBlockProps = {
  index: number;
  pictureData: string;
  originator: boolean;
  data: {
    name: string;
    message: string;
  };
};

type ChatHistoryBlockProps = {
  name: string;
  lastMessage: string;
  pictureData: string;
  active: boolean;
  notifCount: number;
};

export { ChatButtonProps, MessageBlockProps, ChatHistoryBlockProps };
