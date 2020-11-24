import React from "react";
import ChatInput from "./ChatInput";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
require('dotenv').config();

const BASE_URL = process.env.REACT_APP_baseURL;

const useStyles = makeStyles((theme) => ({
  chatWindow: {
    width: "100%",
    height: "85vh",
    background: "#fff",
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const ChatWindow = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.chatWindow}>
      chat window!
      <ChatInput />
    </div>
  );
};

ChatWindow.propTypes = {};

export default ChatWindow;
