import React from "react";
import { Container, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";
import Conversation from "./Conversation";

const Messenger = (props) => {
  const useStyles = makeStyles((theme) => ({
    messengerContainer: {
      boxSizing: "border-box",
      background: "#F5F7FB",
      display: "flex",
      justifyContent: "flex-start",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    },
  }));

  const classes = useStyles();
  return (
    <Container className={classes.messengerContainer}>
      <Sidebar />
      <Hidden smDown>
        <Conversation />
      </Hidden>
    </Container>
  );
};

Messenger.propTypes = {};

export default Messenger;
