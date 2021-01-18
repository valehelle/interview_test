import MaterialButton from '@material-ui/core/Button'
import { styled } from '@material-ui/core/styles';

const StyledButton = styled(MaterialButton)({
    borderRadius: 24,
    height: (props) => props.height,
    width: (props) => props.width,
    fontSize: (props) => props.textSize,
    boxShadow: (props) => props.raised ? "0 1px 3px 0 rgba(0, 0, 0, 0.3)" : "0",
    paddingLeft: (props) => props.padding,
    paddingRight: (props) => props.padding,
    '&:hover': {
        backgroundColor: (props) => props.theme.palette.primary.main,
        boxShadow: (props) => props.raised ? "0 1px 3px 0 rgba(0, 0, 0, 0.3)" : "2px 2px 6px 0 rgba(0, 0, 0, 0.25)",
    },
    '&:disabled': {
        color: 'white',
        backgroundColor: (props) => props.negative ? 'red' : '#e5e7e9',
    },
});

const customTheme = {
    palette: {
        primary: {
            main: '#0067B1'
        },
    },
}

function getHeight(type) {
    switch (type) {
        case 'small':
            return '30px';
        case 'medium':
            return '36px';
        case 'large':
        case 'docked':
            return '48px';
    }
}


const Button = ({ children, negative = false, raised = false, type = 'docked', ...props }) => {
    const textSize = type == 'small' || type == 'medium' ? 12 : 14
    const height = getHeight(type)
    const padding = children.length < 8 ? 38 : 16
    const width = type == 'docked' ? 200 : 'inherit'
    return (
        <StyledButton disableElevation height={height} width={width} textSize={textSize} raised={raised} negative={negative} padding={padding} color='primary' theme={customTheme} {...props} variant="contained">{children}</StyledButton>
    )
}

export default Button