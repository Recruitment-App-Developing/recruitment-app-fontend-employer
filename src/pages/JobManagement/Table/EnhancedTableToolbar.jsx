import { faFilter, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { alpha, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';

export default function EnhancedTableToolbar({
    numSelected,
    title = 'Danh sách',
}) {
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity,
                        ),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {title}
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Xoá">
                    <IconButton>
                        <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Lọc">
                    <IconButton>
                        <FontAwesomeIcon icon={faFilter} />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}
