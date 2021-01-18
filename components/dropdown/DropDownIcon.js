import Popover from '@material-ui/core/Popover';


const DropDownIcon = ({ handleClose, anchorEl, children, ...props }) => {

    const open = Boolean(anchorEl);
    return (
        <Popover
            elevation={0}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
            PaperProps={{ style: { margin: 0, padding: 6, height: 'min-content', overflow: 'hidden' } }}
        >
            {children}
        </Popover>
    )
}

export default DropDownIcon