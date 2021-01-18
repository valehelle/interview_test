import React from 'react'
import { storiesOf } from '@storybook/react';
import { PrimaryButton } from '../components/button'
import { ThemeProvider } from '@material-ui/styles';
import theme from '../components/theme';
import { withKnobs, select } from "@storybook/addon-knobs";

export default {
  title: "Atoms/Button/Primary",
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
      <PrimaryButton type={value}>PRIMARY</PrimaryButton>
    </ThemeProvider>
  )
}
export const ButtonWithMoreThan_8_Characters = () => {
  const value = select('Type', options, 'small');
  return (
    <ThemeProvider theme={theme}>
      <PrimaryButton type={value}>PRIMARY BUTTON</PrimaryButton>
    </ThemeProvider>
  )
}
export const DisabledButton = () => {
  const value = select('Type', options, 'small');
  return (
    <ThemeProvider theme={theme}>
      <PrimaryButton disabled={true} type={value}>Submit</PrimaryButton>
    </ThemeProvider>
  )
}
export const NegativeButton = () => {
  const value = select('Type', options, 'small');
  return (
    <ThemeProvider theme={theme}>
      <PrimaryButton disabled={true} negative={true} type={value}>Submit</PrimaryButton>
    </ThemeProvider>
  )
}
