import React from 'react'
import { storiesOf } from '@storybook/react';
import { SecondaryButton } from '../components/button'
import { ThemeProvider } from '@material-ui/styles';
import theme from '../components/theme';
import { withKnobs, select } from "@storybook/addon-knobs";

export default {
  title: "Atoms/Button/Secondary",
  decorators: [withKnobs]
};

const options = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  Docked: 'docked'
};

export const DefaultButton = () => {
  const value = select('Type', options, 'small');
  return (
    <ThemeProvider theme={theme}>
      <SecondaryButton type={value}>Submit</SecondaryButton>
    </ThemeProvider>
  )
}
export const ButtonWithMoreThan_8_Characters = () => {
  const value = select('Type', options, 'small');
  return (
    <ThemeProvider theme={theme}>
      <SecondaryButton type={value}>Please submit</SecondaryButton>
    </ThemeProvider>
  )
}
export const DisabledButton = () => {
  const value = select('Type', options, 'small');
  return (
    <ThemeProvider theme={theme}>
      <SecondaryButton disabled={true} type={value}>Submit</SecondaryButton>
    </ThemeProvider>
  )
}
export const NegativeButton = () => {
  const value = select('Type', options, 'small');
  return (
    <ThemeProvider theme={theme}>
      <SecondaryButton disabled={true} negative={true} type={value}>Submit</SecondaryButton>
    </ThemeProvider>
  )
}
