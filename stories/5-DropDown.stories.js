import React from 'react'
import { MoreIcon } from '../components/icons'
import { ThemeProvider } from '@material-ui/styles';
import theme from '../components/theme';
import { withKnobs } from "@storybook/addon-knobs";
import { IconButton } from '../components/button';
import { DropDownCard } from '../components/card';
import { DropDownIcon } from '../components/dropdown';
export default {
  title: "Molecules/DropDown",
  decorators: [withKnobs]
};

export const Icon = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <div style={{ paddingLeft: 500 }}>
        <div style={{ width: 'min-content' }}>
          <IconButton color="primary" aria-label="more" onClick={handleClick}>
            <MoreIcon />
          </IconButton>
          <DropDownIcon anchorEl={anchorEl} handleClose={handleClose}>
            <DropDownCard>
              <h4>HELOOO</h4>
              <h4>HELOOO</h4>
              <h4>HELOOO</h4>
              <h4>HELOOO</h4>
              <h4>HELOOO</h4>
              <h4>HELOOO</h4>
              <h4>HELOOO</h4>
              <h4>HELOOO</h4>
              <h4>HELOOO</h4>
            </DropDownCard>
          </DropDownIcon>
        </div>
      </div>
    </ThemeProvider >
  )
}