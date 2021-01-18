import Paper from '@material-ui/core/Paper'
import { styled, useTheme } from '@material-ui/core/styles';

const StyledPaper = styled(Paper)({
    borderRadius: 8,
    paddingRight: 16,
    paddingLeft: 16,
    width: 213,
    maxHeight: 216,
    overflow: 'scroll'
});

const DropDownCard = ({ children, ...props }) => {
    const theme = useTheme();
    return (<StyledPaper elevation={3} theme={theme} {...props}>{children}</StyledPaper>)
}

export default DropDownCard