import IconButton from '@material-ui/core/IconButton'
import { styled, useTheme } from '@material-ui/core/styles';

const StyledButton = styled(IconButton)({
    '&:hover': {
        backgroundColor: (props) => props.theme.custom.commonColors
    }
});

const Button = ({ children, ...props }) => {
    const theme = useTheme();
    return (<StyledButton theme={theme} {...props}>{children}</StyledButton>)
}

export default Button