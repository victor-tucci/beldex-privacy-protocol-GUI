import React from 'react';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';

const TextInput = (props) => {
  const { type, inputProps, formLabel, maxOnClick, placeholder, maxIcon, name, value, onChange, sxObj, publicHash } = props;

  const restrictMinus = e => {
    const inputKeyCode = e.keyCode ? e.keyCode : e.which;
    const blockInvalidKeyCode = [43, 45, 69, 101]
    if (inputKeyCode != null && blockInvalidKeyCode.includes(inputKeyCode)) {
      e.preventDefault();
    }
  };

  const onWheelUp = (e) => {
    if (e.target.type === "number") {
      // e.preventDefault();
      e.target.blur()
      // Prevent the page/container scrolling
      e.stopPropagation()
    }
  }

  return (
    <Box>
      <FormControl sx={{ width: '100%', maxWidth: '100%', m: 0, pb: '40px', ...sxObj }} variant="outlined">
        <OutlinedInput
          placeholder={placeholder}
          type={type}
          onWheel={onWheelUp}
          sx={{ border: 'solid 1px #2f2f3e', borderRadius: '10px', padding: '15px', height: '60px', color: 'text.light', fontSize: 20, backgroundColor: '#1b1b25', '.MuiInputBase-input': maxIcon ? { paddingRight: '25px' } : {} }}
          name={name}
          value={value}
          inputProps={inputProps}
          onChange={onChange}
          onKeyPress={restrictMinus}
          endAdornment={maxIcon && <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={maxOnClick}
              sx={{
                right: '15px',
                padding: '5px 15px',
                borderRadius: '10px',
                fontSize: '15px',
                height: '30px',
                border: 'solid 1px #1d1d29',
                backgroundColor: '#22222e'
              }}
            >
              Max
            </IconButton>
          </InputAdornment>}
        />
        {formLabel && <FormHelperText variant="filled" sx={{ textAlign: 'right', color: "text.primary", fontSize: 16, height: '27px', wordBreak: 'break-word', width: '100%' }} margin="dense">{formLabel}</FormHelperText>}
      </FormControl>
    </Box>
  )

}

export default TextInput;