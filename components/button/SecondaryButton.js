import MaterialButton from '@material-ui/core/Button'
import { styled } from '@material-ui/core/styles';

const StyledButton = styled(MaterialButton)({
    borderRadius: 24,
    height: (props) => props.height,
    width: (props) => props.width,
    fontSize: (props) => props.textSize,
    paddingLeft: (props) => props.padding,
    paddingRight: (props) => props.padding,
    borderColor: '#0067B1',
    '&:disabled': {
        color: (props) => props.negative && 'red',
        borderColor: (props) => props.negative && 'red',
        backgroundColor: 'white',
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


const Button = ({ children, negative = false, type = 'docked', ...props }) => {
    const textSize = type == 'small' || type == 'medium' ? 12 : 14
    const height = getHeight(type)
    const padding = children.length < 8 ? 38 : 16
    const width = type == 'docked' ? 200 : 'inherit'
    return (
        <StyledButton disableElevation height={height} width={width} textSize={textSize} negative={negative} padding={padding} color='primary' theme={customTheme} {...props} variant="outlined">{children}</StyledButton>
    )
}

export default Button