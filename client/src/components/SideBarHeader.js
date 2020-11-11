import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import happyChatter from "../assets/5e4a118a03239f87632c8f33899048fd2c4af1ca.png";
import { Typography } from "@material-ui/core";

const SideBarHeader = (props) => {
  const useStyles = makeStyles((theme) => ({
    sideBarHeader: {
      height: 100,
      width: "85%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& div": {
        display: "flex",
      },
    },
    sideBarImgWrapper: {
      "& span": {
        position: "relative",
        left: "-32%",
        top: "75%",
      },
    },
    sideBarImg: {
      borderRadius: "100%",
      overflow: "hidden",
      width: "70px",
      marginRight: "15px",
    },
    onlineIcon: {
      width: 12,
      height: 12,
      border: "solid white 1px",
      borderRadius: "50%",
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.sideBarHeader}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <img src={happyChatter} className={classes.sideBarImg} />
          {/* background will depend on online status */}
          <span
            className={classes.onlineIcon}
            style={{ background: "#4DED84" }}
          ></span>
        </div>
        <h4>Steven</h4>
      </div>
      <MoreHorizIcon className={classes.dotMenu}></MoreHorizIcon>
    </div>
  );
};

SideBarHeader.propTypes = {};

export default SideBarHeader;
