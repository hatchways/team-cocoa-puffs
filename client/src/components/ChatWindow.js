import React, { useState, useEffect, useContext } from 'react';
import ChatInput from './ChatInput';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../contexts/userContext';
import { Typography } from '@material-ui/core';
import moment from 'moment';

require('dotenv').config();
const useStyles = makeStyles((theme) => ({
  chatWindow: {
    width: '100%',
    height: '85vh',
    background: '#fff',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionChat: {
    width: '100%',
    display: 'inlineBlock',
    overflow: 'auto',
  },
  chatUnit: {
    float: 'left',
    marginBottom: '1rem',
    width: '50%',
    display: 'flex',
    marginLeft: theme.spacing(2),
  },
  chatUnitYours: {
    float: 'right',
    marginBottom: '1rem',
    width: '50%',
    marginRight: theme.spacing(2),
  },
  msgAvatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
  },
  msgHeader: {
    color: 'gray',
  },
  msgHeaderYours: {
    textAlign: 'right',
  },
  bubble: {
    background:
      'linear-gradient(0deg, rgba(26,114,183,1) 0%, rgba(14,172,117,1) 100%)',
    maxWidth: '18rem',
    wordWrap: 'break-word',
    borderRadius: '0px 15px 15px 15px',
    display: 'inline-block',
    float: 'left',
  },
  bubbleYours: {
    background:
      'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
    maxWidth: '18rem',
    wordWrap: 'break-word',
    borderRadius: '15px 15px 0px 15px',
    display: 'inline-block',
    float: 'right',
  },
  textInBubble: {
    color: 'white',
    padding: '10px 10px 10px 10px',
  },
}));

const ChatWindow = () => {
  const classes = useStyles();
  const { socket, userState } = useContext(UserContext);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (userState.user.activeRoom) setRoom(userState.user.activeRoom);
  }, [userState.user]);

  useEffect(() => {
    socket.on('connect', () => {
      const roomId = room ? room._id : null;
      socket.emit('join', roomId); // replace 123 with conversation id
    });

    socket.on('roomJoined', (room) => {
      console.log('successfully joined', room);
    });

    socket.on('messageFromServer', async (msgData) => {
      console.log('new message coming in', msgData);

      setRoom((prevRoom) => {
        return {
          ...prevRoom,
          messages: [...prevRoom.messages, msgData],
        };
      });
    });
  }, []);

  return (
    <div className={classes.chatWindow}>
      <div className={classes.sectionChat}>
        {room &&
          room.messages.length > 0 &&
          room.messages.map((msg, index) => {
            console.log('msg:', msg);
            // console.log('room:', room);

            const yours = msg.fromUser === userState.user.email;
            const indexOfContact = room.members.findIndex(
              (member) => member.email !== userState.user.email,
            );
            return (
              <section
                key={index}
                className={yours ? classes.chatUnitYours : classes.chatUnit}
              >
                {!yours && (
                  <img
                    src={room.members[indexOfContact].avatar}
                    className={classes.msgAvatar}
                  />
                )}
                <div>
                  <Typography
                    variant="subtitle2"
                    className={`${classes.msgHeader} ${
                      yours ? classes.msgHeaderYours : ''
                    }`}
                  >
                    {/* {yours
                      ? moment(msg.createdOn).calendar()
                      : room.members[indexOfContact].name +
                        ' ' +
                        moment(msg.createdOn).calendar()} */}
                    {moment(msg.createdOn).calendar()}
                  </Typography>
                  {msg.text && <ChatBubble message={msg.text} yours={yours} />}
                </div>
              </section>
            );
          })}
      </div>
      <ChatInput />
    </div>
  );
};

const ChatBubble = (props) => {
  const classes = useStyles();

  return (
    <section className={props.yours ? classes.bubbleYours : classes.bubble}>
      <Typography variant="subtitle1" className={classes.textInBubble}>
        {props.message}
      </Typography>
    </section>
  );
};

export default ChatWindow;
