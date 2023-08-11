import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';

const swapList = [
  // { id: 1, text: "BNB" },
  // { id: 2, text: "DAI" },
  // { id: 3, text: "UDST" },
  // { id: 4, text: "BDX" },
  {id: 5, text: "MATIC"}
]
const SwapListMenu = (props) => {
  const { openSwapCollapse, handleCloseSwapMenu, swapMenuOrigin } = props;
  return (
    <Menu
      id="menu-appbar"
      anchorEl={openSwapCollapse}
      anchorOrigin={swapMenuOrigin.anchorOrigin}
      transformOrigin={swapMenuOrigin.transformOrigin}
      open={Boolean(openSwapCollapse)}
      onClose={handleCloseSwapMenu}
    >
      {swapList.map((list, index) => (
        <MenuItem key={list.text} onClick={(event) => handleCloseSwapMenu(event, list)}>
          <Typography sx={{ p: '0px' }} color="text.light" textAlign="center">{list.text}</Typography>
        </MenuItem>
      ))}
    </Menu>
  )
}

export default React.memo(SwapListMenu);