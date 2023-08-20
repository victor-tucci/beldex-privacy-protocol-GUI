import React, { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { AppBar, Avatar, Box, Toolbar, Tooltip, MenuItem, Container, IconButton, Button, Typography, Menu, Link, Popover } from '@mui/material';
import { withStyles } from '@mui/styles';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import MenuIcon from '@mui/icons-material/Menu';
import binance from '../../icons/binance.png';
import metamask from '../../icons/metamask.png';
import logo from '../../icons/privacy-protocol-logo.svg';
import MaticLogo from '../../icons/polygon-matic-icon.png';
import * as actionTypes from "../../common/actionTypes";

const componentStyle = theme => {
  return ({
    tabBtn: {
      borderRadius: '10px',
      display: 'flex',
      fontWeight: 600,
      height: '45px',
      padding: '5px 10px',
      background: 'rgb(41, 41, 57)',
      border: 'solid 1px #3b3b3b',
      '&:hover': {
        border: 'solid 1px #3b3b3b'
      }
    },
    menuSelected: {
      '&.Mui-selected': {
        background: '#4a4a4a50'
      }
    },
    link: {
      marginRight: '40px', fontSize: '16px', fontFamily: 'poppins', fontWeight: 600
    },
    popoverPaper: {
      borderRadius: '10px',
      width: '350px'
    }
  })
};

const settings = [
  //{ id: 0, text: 'BSC', img: binance },
  { id: 0, text: 'Meta Mask', img: metamask }
];

const coinList = [
  { id: 0, text: 'Polygon Matic', img: MaticLogo }
];

const HeaderCom = (props) => {
  const walletName = useSelector((state) => state.walletReducer.walletName);
  const walletIndex = settings.findIndex(list => list.text === walletName);
  const [anchorElWallet, setAnchorElWallet] = React.useState(null);
  const [anchorElCoinList, setAnchorElCoinList] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(walletIndex);
  const { showNav, classes, walletAddress, handleDrawerToggle, handleWalletMenuClose, handleCloseMenu, walletBal } = props;
  const [sWalletAddress, setWalletAddress] = React.useState(walletAddress);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {setWalletAddress(walletAddress)}, [walletAddress])
  const handleOpenWalletMenu = (event) => {
    setAnchorElWallet(event.currentTarget);
    handleWalletMenuClose(walletName);
  };

  const handleCloseWalletMenu = (event, setting) => {
    if (setting.text) {
      handleWalletMenuClose(setting.text);
      setSelectedIndex(setting.id);
    }
    setAnchorElWallet(null);
  };
  const handleOpenCoinListMenu = (event) => {
    setAnchorElCoinList(event.currentTarget);
  };
  const handleCloseCoinListMenu = (event, setting) => {
    setAnchorElCoinList(null);
  };

  const connectWallet = (event) => {
    handleCloseMenu(event, { id: 0, text: "Swap" });
  }

  const addressTruncate = React.useMemo(() => addressTruncateFn(sWalletAddress), [sWalletAddress]);

  const disconnect = () => {
    dispatch({
      type: actionTypes.SETWALLETADDR,
      payload: {
        walletAddress: '',
        walletName: ''
      }
    });
    if(location.pathname === '/dashboard')    navigate('/')
  }
  return (
    <AppBar sx={{ padding: { xs: '10px', sm: '10px 90px' } }} position="fixed">
      <Container maxWidth="false" disableGutters>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon fontSize="large" sx={{ color: '#fff' }} />
          </IconButton> */}
          <img onClick={() => navigate('/')} alt="" height="74px" width="auto" src={logo} />

          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            color="text.secondary"

            sx={{ flexGrow: { xs: 1, md: showNav ? 0 : 1 }, mr: 2, display: { xs: 'flex' } }}
          >
            <img onClick={() => navigate('/')} alt="" height="35px" width="auto" src={logo} />
          </Typography> */}
          {/* {showNav && <Box sx={{ flexGrow: 1, mr: 2, display: { md: 'flex', xs: 'none' } }}>
             <Link color="text.light" onClick={connectWallet} component="button" underline="none" sx={{ ml: 2 }} classes={{ root: classes.link }}>Privacy Protocol</Link>
             <Link color="text.light" component="button" underline="none" classes={{ root: classes.link }}>Bridge</Link>
            <Link color="text.light" component="button" underline="none" classes={{ root: classes.link }}>Tutorial</Link>
            <Link color="text.light" component="button" underline="none" classes={{ root: classes.link }}>Q&A</Link>
            <Link color="text.light" component="button" underline="none" classes={{ root: classes.link }}>Info</Link>
          </Box>} */}
          <Box sx={{ flexGrow: 0, display: 'flex', gap: '10px' }}>
            <Button variant="outlined" classes={{ root: classes.tabBtn }}
              color="secondary" sx={{width: '75px', justifyContent: 'space-between'}} onClick={handleOpenCoinListMenu}>
              <img alt="" width="20" src={MaticLogo} /> <ExpandMoreRoundedIcon/>
            </Button>
            <Tooltip title="Open settings">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleOpenWalletMenu}
                classes={{ root: classes.tabBtn }}
                sx={{ border: sWalletAddress ? 'solid 1px rgb(80,175,75)' : 'solid 1px #3b3b3b9a', width: sWalletAddress ? '175px' : '140px', justifyContent: 'space-around' }}
              >
                {sWalletAddress && selectedIndex >= 0 && <Avatar sx={{ width: 24, height: 24 }} src={settings[selectedIndex].img} />}
                <Typography sx={{
                  fontWeight: 600,
                  overflow: 'hidden', whiteSpace: 'nowrap', color: sWalletAddress ? '#fff' : 'rgb(80,175,75)'
                }} textAlign="center">{sWalletAddress ? addressTruncate : 'Connect'}</Typography>
              </Button>

            </Tooltip>
            {sWalletAddress && selectedIndex >= 0 &&<Popover
              id="menu-appbar"
              open={Boolean(anchorElWallet)}
              anchorEl={anchorElWallet}
              onClose={handleCloseWalletMenu}
              classes={{ paper: classes.popoverPaper }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}

            >
              <Box sx={{  padding: '20px', background: 'rgb(41,41,57)', alignItems: 'center' }}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Avatar sx={{ width: 24, height: 24 }} src={settings[selectedIndex].img} />
                    <Typography sx={{
                      fontWeight: 600,
                      fontSize: 14,
                      overflow: 'hidden', whiteSpace: 'nowrap', color: '#fff'
                    }} textAlign="center">{addressTruncate}</Typography>
                  </Box>
                  <Button variant="outlined" sx={{color: 'rgb(152, 152, 177)', border: 'solid 1px rgb(58,58,80)', background: 'rgb(41,41,57)', borderRadius: '10px', '&:hover': {
                    border: 'solid 1px #fff', background: 'rgb(41,41,57)', color: '#fff'
                  }}} onClick={disconnect}>Disconnect</Button>
                </Box>
                <Box>
                  <Typography color="primary" sx={{fontWeight: 600, fontSize: '15px'}}>Balance</Typography>
                  <Typography component="div" color="text.light" sx={{fontWeight: 900, fontSize: '28px', lineHeight:'1', paddingTop: '5px'}}>{`${Number(walletBal).toFixed(2)} MATIC`}</Typography>
                </Box>
              </Box>

            </Popover>}
            {!Boolean(anchorElCoinList) && <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElWallet}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElWallet)}
              onClose={handleCloseWalletMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={setting.text}
                  classes={{ root: classes.menuSelected }}
                  selected={index === selectedIndex}
                  onClick={(event) => handleCloseWalletMenu(event, setting)}>
                  <Avatar sx={{ width: 24, height: 24 }} src={setting.img} />
                  <Typography sx={{ pl: '20px' }} color="text.light" textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>}
            {Boolean(anchorElCoinList) && <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElCoinList}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElCoinList)}
              onClose={handleCloseCoinListMenu}
            >
              {coinList.map((setting, index) => (
                <MenuItem key={setting.text}
                  classes={{ root: classes.menuSelected }}
                  selected={index === selectedIndex}
                  onClick={(event) => handleCloseCoinListMenu(event, setting)}>
                  <Avatar sx={{ width: 24, height: 24 }} src={setting.img} />
                  <Typography sx={{ pl: '20px' }} color="text.light" textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};


const addressTruncateFn = (str) => {
  if (str && str.length > 30) {
    return str.substr(0, 7) + '...' + str.substr(str.length - 5, str.length);
  }
  return str;
}
const Header = React.memo(withStyles(componentStyle, { withTheme: true })(HeaderCom));

export default Header;