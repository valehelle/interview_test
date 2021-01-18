import React from 'react'
import { MoreIcon } from '../components/icons'
import { ThemeProvider } from '@material-ui/styles';
import theme from '../components/theme';
import { withKnobs } from "@storybook/addon-knobs";
import { IconButton } from '../components/button';


export default {
  title: "Atoms/Button/Icon",
  decorators: [withKnobs]
};

export const DefaultButton = () => {
  return (
    <ThemeProvider theme={theme}>
      <IconButton color="primary" aria-label="more">
        <MoreIcon />
      </IconButton>
    </ThemeProvider>
  )
}