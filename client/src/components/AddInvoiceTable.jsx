import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Box from '@mui/material/Box';

export default function AddInvoiceTable({ invoice }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = invoice.map((row) => row.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const headCells = [
        { id: 'invoiceno', label: 'Invoice No.' },
        { id: 'date', label: 'Date' },
        { id: 'to', label: 'To M/s' },
        { id: 'address', label: 'Address' },
        { id: 'aadhar', label: 'Aadhar No.' },
        { id: 'gstin', label: 'GSTIN' },
        { id: 'particulars', label: 'Particulars' },
        { id: 'hsn', label: 'HSN Code' },
        { id: 'quantity', label: 'Quantity' },
        { id: 'rate', label: 'Rate' },
        { id: 'amount', label: 'Amount' },
    ];

    return (
        <TableContainer component={Paper}>
            <Toolbar>
                {selected.length > 0 ? (
                    <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                        {selected.length} selected
                    </Typography>
                ) : (
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                        Invoice
                    </Typography>
                )}
                {selected.length > 0 ? (
                    <button className="relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fd1d1d_0%,#833ab4_50%,#fd1d1d_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                            style={{
                                backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                backgroundSize: '200% 100%',
                                transition: 'background-position 0.5s ease',
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                            onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                        >
                            Download
                        </span>
                    </button>
                ) : (
                    null
                )}
            </Toolbar>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                <TableHead className='bg-gray-300'>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="success"
                                indeterminate={selected.length > 0 && selected.length < invoice.length}
                                checked={invoice.length > 0 && selected.length === invoice.length}
                                onChange={handleSelectAllClick}
                                inputProps={{
                                    'aria-label': 'select all invoices',
                                }}
                            />
                        </TableCell>
                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align="right"
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={() => handleRequestSort(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoice.map((row) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${row.id}`;

                        return (
                            <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id}
                                selected={isItemSelected}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="success"
                                        checked={isItemSelected}
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </TableCell>
                                <TableCell component="th" id={labelId} scope="row" padding="none" align="right">
                                    {row.invoiceno}
                                </TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.to}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.aadhar}</TableCell>
                                <TableCell align="right">{row.gstin}</TableCell>
                                <TableCell align="right">{row.particulars}</TableCell>
                                <TableCell align="right">{row.hsn}</TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">{row.rate}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

AddInvoiceTable.propTypes = {
    invoice: PropTypes.array.isRequired,
};
