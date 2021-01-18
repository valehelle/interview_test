import React from 'react'
import { MoreIcon } from '../components/icons'
import { ThemeProvider } from '@material-ui/styles';
import theme from '../components/theme';
import { withKnobs } from "@storybook/addon-knobs";
import { DropDownCard } from '../components/card';
export default {
  title: "Atoms/Card",
  decorators: [withKnobs]
};

export const DropDown = () => {
  return (
    <ThemeProvider theme={theme}>
      <DropDownCard>
        <h1>helooo</h1>
      </DropDownCard>
    </ThemeProvider>
  )
}