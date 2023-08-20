import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card } from '../../components';

const LeftPanel = ({ swap, mintValue, balance }) => (
  <Box sx={{ marginRight: { md: '0', lg: '50px' } }}>
    <Typography variant="h5" color="text.light" component="div"> Balance</Typography>
    <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'block' }, flexWrap: 'wrap', justifyContent: 'space-around' }}>
      <Card variant="warning" unitValue={Number(balance).toFixed(2)} label={`${swap} Balance`} endLabel={`${swap} = (${(balance / 100).toFixed(4)} ${swap})`} />
      <Card variant="success" unitValue={mintValue} label={`r${swap} Balance`} endLabel={`r${swap} = ${Math.floor(mintValue) / 100} ${swap}`} />
      <Card variant="info" unitValue={'1:100'} label={`r${swap} Balance Ratio`} endLabel={`${swap}:r${swap}`} />
    </Box>
  </Box>
)

export default LeftPanel;