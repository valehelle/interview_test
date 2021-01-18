import React from 'react'
import { LinkButton } from '../components/button'
import { ThemeProvider } from '@material-ui/styles';
import theme from '../components/theme';
import { withKnobs, select } from "@storybook/addon-knobs";

export default {
  title: "Atoms/Button/Link",
  decorators: [withKnobs]
};

const options = {
  Medium: 'medium',
  Large: 'large',
};

export const DefaultButton = () => {
  const value = select('Type', options, 'small');
  return (
    <ThemeProvider theme={theme}>
      <LinkButton type={value}>Submit</LinkButton>
    </ThemeProvider>
  )
}
export const NegativeButton = () => {
  const value = select('Type', options, 'small');
  return (
    <ThemeProvider theme={theme}>
      <LinkButton disabled={true} negative={true} type={value}>Submit</LinkButton>
    </ThemeProvider>
  )
}
