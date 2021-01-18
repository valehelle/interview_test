import React from 'react'
import { ThemeProvider, styled, useTheme } from '@material-ui/styles';
import theme from '../components/theme';
import { withKnobs } from "@storybook/addon-knobs";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from '@material-ui/core/FormHelperText';

export default {
  title: "Atoms/TextInput",
  decorators: [withKnobs]
};

const StyledForm = styled(FormControl)({

})

const StyledInput = styled(FilledInput)({
  caretColor: '#0067b1',
  '&.MuiFilledInput-underline:before': {
    borderBottom: (props) => props.validate ? '2px solid #5cc971' : '1px solid lightgrey'
  },
  '&.MuiFilledInput-underline:after': {
    borderBottom: (props) => props.validate ? '2px solid #5cc971' : '2px solid blue'
  },

})

const StyledInputLabel = styled(InputLabel)({
  '&.Mui-error': {
    color: '#424b57',
  }
})
const StyledFormHelperText = styled(FormHelperText)({
  color: 'rgba(0,103,177, 0.5)',
  '&.Mui-focused': {
    color: 'rgba(0,103,177)',
  },
  '&.MuiFormHelperText-filled': {
    color: (props) => props.validate ? '#5cc971' : 'rgba(0,103,177)'
  },
  '&.Mui-error': {
    color: 'red',
  }

})

export const TextInput = () => {
  const validate = true
  return (
    <ThemeProvider theme={theme}>
      <StyledForm
        variant="filled"
        fullWidth={true}
      >
        <StyledInputLabel  >
          To
          </StyledInputLabel>
        <StyledInput
          style={{ backgroundColor: '#d6e0ec' }}
          validate={validate}
        />
        <StyledFormHelperText validate={validate} id="component-helper-text">• 6-20 characters • 6-20 characters</StyledFormHelperText>
      </StyledForm>
    </ThemeProvider >
  )
}