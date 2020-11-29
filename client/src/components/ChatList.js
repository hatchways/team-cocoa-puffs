import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatRoom from './ChatRoom';
import AppAlert from './AppAlert';
import { UserContext } from '../contexts/userContext';

const useStyles = makeStyles((theme) => ({
  chatListContainer: {},
  chatList: {},
}));

const ChatList = () => {
  const { userState, userActions, socket } = useContext(UserContext);
  console.log('userState:', userState);
  const classes = useStyles();

  const [activeIndex, setActiveIndex] = useState(null);
  const [chats, setChats] = useState(null);

  const handleFetch = async () => await userActions.fetchConversations();

  const handleActive = async (index, chatRoom) => {
    setActiveIndex(index);
    await userActions.messagesRead(chatRoom._id);
    userActions.switchConversation(chatRoom);
  };

  useEffect(() => {
    //Fetch all user conversations on load

    handleFetch();
    setChats(userState.user.conversations);

    //on load set active chat as most recent chat
    if (chats) userActions.switchConversation(chats[0]);
  }, [userState.user.conversations]);
  console.log('chats:', chats);
  return (
    <div className={classes.chatListContainer}>
      <ul className={classes.chatList}>
        {chats &&
          chats.map((chatRoom, index) => {
            return (
              <ChatRoom
                chatRoom={chatRoom}
                index={index}
                handleActive={handleActive}
                activeIndex={activeIndex}
              />
            );
          })}
      </ul>
      <AppAlert trigger={userState.errorMsg} />
    </div>
  );
};

export default ChatList;
