import React from "react";
import PropTypes from "prop-types";
import useStyles from "../styles/material-styles";

const ChatWindow = (props) => {
  const classes = useStyles();
  return <div className={classes.chatWindow}>chat window!</div>;
};

ChatWindow.propTypes = {};

export default ChatWindow;