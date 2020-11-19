import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import happyChatter from '../assets/happy-chatter.png';
import { Typography } from '@material-ui/core';

import { UserContext } from '../contexts/userContext';

const useStyles = makeStyles((theme) => ({
  sideBarHeader: {
    height: 100,
    width: '85%',
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& div': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  sideBarImgWrapper: {
    '& span': {
      position: 'relative',
      transform: 'translate(-200%,180%)',
    },
  },
  sideBarImg: {
    borderRadius: '100%',
    overflow: 'hidden',
    width: '70px',
    marginRight: theme.spacing(1),
  },
  dotMenu: {
    cursor: 'pointer',
    color: '#BCC8D9',
  },
  statusIcon: {
    width: 12,
    height: 12,
    border: 'solid white 1px',
    borderRadius: '50%',
  },
  onlineIcon: { background: '#4DED84' },
  offlineIcon: { background: 'lightgray' },
}));

const SideBarHeader = () => {
  const { userState } = useContext(UserContext);
  const classes = useStyles();
  console.log('userState:', userState);
  return (
    <div className={classes.sideBarHeader}>
      <div>
        <div className={classes.sideBarImgWrapper}>
          <img
            src={userState.user.avatar ? userState.user.avatar : happyChatter}
            className={classes.sideBarImg}
          />
          <span
            className={`${classes.statusIcon} ${classes.onlineIcon}`}
          ></span>
        </div>
        <Typography variant="h5">{userState.user.name}</Typography>
      </div>
      <MoreHorizIcon className={classes.dotMenu}></MoreHorizIcon>
    </div>
  );
};

SideBarHeader.propTypes = {};

export default SideBarHeader;
