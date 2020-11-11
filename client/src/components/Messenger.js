import React from "react";
import { Container } from "@material-ui/core";
import useStyles from "../styles/material-styles";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";
import Conversation from "./Conversation";

const Messenger = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.messengerContainer}>
      <Sidebar />
      <Conversation />
    </Container>
  );
};

Messenger.propTypes = {};

export default Messenger;
