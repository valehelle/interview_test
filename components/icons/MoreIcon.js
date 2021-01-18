import { SvgIcon } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
const MoreIcon = (props) => {
    const theme = useTheme();
    return (
        <SvgIcon {...props}>
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <g transform="translate(-215 -479)">
                    <path
                        fill={theme.palette.primary.main}
                        d="M218.5 493a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0-1a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm8.5 1a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0-1a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm8.5 1a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0-1a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    />
                </g>
            </g>
        </SvgIcon>
    );
}
export default MoreIcon