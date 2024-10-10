import {
    Box,
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

export default function EnhancedTableHead({
    headCells,
    numSelected,
    rowCount,
    onSelectAllClick,
    orderDir,
    orderBy,
    onRequestSort,
}) {
    const createSortHandler = (property) => (e) => {
        onRequestSort(e, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={numSelected === rowCount}
                        onClick={onSelectAllClick}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={
                            orderBy === headCell.id ? orderDir : false
                        }
                        sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
                    >
                        {headCell.sort ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={
                                    orderBy === headCell.id ? orderDir : 'asc'
                                }
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {/* {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {orderDir === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending'}
                                    </Box>
                                ) : null} */}
                            </TableSortLabel>
                        ) : (
                            headCell.label
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
