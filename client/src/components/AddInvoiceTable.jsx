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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import client from '../service/axiosClient'
import { useDispatch } from 'react-redux'
import { deleteInvoice } from '../app/invoice/invoiceSlice'
import { useState, useEffect } from 'react';
import EditInvoiceDialogeForm from './EditInvoiceDialogeForm';
import React from 'react';
import Slide from '@mui/material/Slide';


const AddInvoiceTable = ({ invoice }) => {
    const dispatch = useDispatch();
    const [openDialoge, setOpenDialoge] = useState(false)
    const [rowId, setRowId] = useState("");
    const [amount, setAmount] = useState(0);
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
        { id: 'action', label: 'Action' },
    ];
    const handleDelete = async (id) => {
        const rowId = {
            id: id,
        }
        try {
            const delResponse = await client.post("/api/invoice/deleteinvoice", rowId)
            console.log(delResponse.data.message);
            dispatch(deleteInvoice(id));
        } catch (error) {
            console.log(error)
        }
    }


    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const handleClickOpen = (id) => {
        setOpenDialoge(true);
        setRowId(id);
    };
    const handleClose = () => {
        setOpenDialoge(false);
    };

    return (
        <>
            {openDialoge ? <EditInvoiceDialogeForm invoiceId={rowId} open={openDialoge} handleClose={handleClose} handleClickOpen={handleClickOpen} /> : null}
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
                        {invoice.map((row, i) => {
                            const amount = row.quantity * row.rate;
                            const cgstRate = row.particulars === "Cement" ? 0.14 : 0.09;
                            const sgstRate = row.particulars === "Cement" ? 0.14 : 0.09;
                            const cgstAmount = amount * cgstRate;
                            const sgstAmount = amount * sgstRate;
                            const totalGstAmount = cgstAmount + sgstAmount + amount;
                            return (
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
                                    <StyledTableCell align="right">{totalGstAmount}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div className='flex flex-row gap-1'>
                                            <div>
                                                <Tooltip title="Edit">
                                                    <IconButton onClick={() => handleClickOpen(row._id)}>
                                                        <EditIcon className='cursor-pointer text-green-500 hover:text-green-700' />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                {/* onClick={() => handleDelete(row._id)} */}
                                                <Tooltip title="Delete">
                                                    <IconButton onClick={() => handleDelete(row._id)}>
                                                        <DeleteIcon className='cursor-pointer text-red-600 hover:text-red-800' />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};



AddInvoiceTable.propTypes = {
    invoice: PropTypes.array.isRequired,
};
export default AddInvoiceTable;