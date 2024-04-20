import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

const AddInvoiceTable = React.forwardRef(({ invoice }, ref) => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


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
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    Invoice
                </Typography>
            </Toolbar>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {headCells.map((headCell) => (
                            <StyledTableCell
                                key={headCell.id}
                                align={headCell.numeric || false ? 'right' : 'left'}
                            >
                                {headCell.label}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoice.map((row, i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell component="th" scope="row">
                                {row.invoiceno}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.date}</StyledTableCell>
                            <StyledTableCell align="right">{row.to}</StyledTableCell>
                            <StyledTableCell align="right">{row.address}</StyledTableCell>
                            <StyledTableCell align="right">{row.aadhar}</StyledTableCell>
                            <StyledTableCell align="right">{row.gstin}</StyledTableCell>
                            <StyledTableCell align="right">{row.particulars}</StyledTableCell>
                            <StyledTableCell align="right">{row.hsn}</StyledTableCell>
                            <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                            <StyledTableCell align="right">{row.rate}</StyledTableCell>
                            <StyledTableCell align="right">{row.amount}</StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
});

AddInvoiceTable.displayName = 'AddInvoiceTable';

AddInvoiceTable.propTypes = {
    invoice: PropTypes.array.isRequired,
};
export default AddInvoiceTable;