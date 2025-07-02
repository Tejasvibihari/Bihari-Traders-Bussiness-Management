import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import client from '../service/axiosClient';
import { useDispatch } from 'react-redux';
import { deleteInvoice } from '../app/invoice/invoiceSlice';
import { useState } from 'react';
import EditInvoiceDialogeForm from './EditInvoiceDialogeForm';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1e293b',
        color: '#ffffff',
        fontWeight: '600',
        position: 'sticky',
        top: 0,
        zIndex: 1,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: '#1e293b',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f8fafc',
    },
    '&:hover': {
        backgroundColor: '#e2e8f0',
        transition: 'background-color 0.2s',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Transition = Slide;

const AddInvoiceTable = ({ invoice }) => {
    const dispatch = useDispatch();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

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
        { id: 'action', label: 'Actions' },
    ];

    const handleDelete = async (id) => {
        try {
            const response = await client.post('/api/invoice/deleteinvoice', { id });
            dispatch(deleteInvoice(id));
        } catch (error) {
            console.error('Error deleting invoice:', error);
        }
    };

    const handleEditOpen = (id) => {
        setSelectedInvoiceId(id);
        setOpenEditDialog(true);
    };

    const handleEditClose = () => {
        setOpenEditDialog(false);
        setSelectedInvoiceId('');
    };


    const handleViewOpen = (invoice) => {
        // Navigate to SingleInvoiceDownload page with invoice ID
        navigate(`/viewinvoice/${invoice._id}`);
    };

    const handleViewClose = () => {
        setOpenViewDialog(false);
        setSelectedInvoice(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    // Calculate the invoices to display based on pagination
    const paginatedInvoices = invoice.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    return (
        <>
            {openEditDialog && (
                <EditInvoiceDialogeForm
                    invoiceId={selectedInvoiceId}
                    open={openEditDialog}
                    handleClose={handleEditClose}
                    handleClickOpen={handleEditOpen}
                />
            )}

            <Dialog
                open={openViewDialog}
                onClose={handleViewClose}
                TransitionComponent={Transition}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle className="bg-slate-800 text-white">
                    Invoice Details - {selectedInvoice?.invoiceno}
                </DialogTitle>
                <DialogContent className="p-6 bg-white">
                    {selectedInvoice && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <p><strong>Invoice No:</strong> {selectedInvoice.invoiceno}</p>
                                <p><strong>Date:</strong> {selectedInvoice.date}</p>
                                <p><strong>To:</strong> {selectedInvoice.to}</p>
                                <p><strong>Address:</strong> {selectedInvoice.address}</p>
                            </div>
                            <div className="space-y-2">
                                <p><strong>Aadhar No:</strong> {selectedInvoice.aadhar}</p>
                                <p><strong>GSTIN:</strong> {selectedInvoice.gstin}</p>
                                <p><strong>Particulars:</strong> {selectedInvoice.particulars}</p>
                                <p><strong>HSN Code:</strong> {selectedInvoice.hsn}</p>
                            </div>
                            <div className="space-y-2 col-span-2">
                                <p><strong>Quantity:</strong> {selectedInvoice.quantity}</p>
                                <p><strong>Rate:</strong> ₹{selectedInvoice.rate}</p>
                                <p><strong>CGST ({selectedInvoice.particulars === 'Cement' ? '14' : '9'}%):</strong> ₹{(selectedInvoice.quantity * selectedInvoice.rate * (selectedInvoice.particulars === 'Cement' ? 0.14 : 0.09)).toFixed(2)}</p>
                                <p><strong>SGST ({selectedInvoice.particulars === 'Cement' ? '14' : '9'}%):</strong> ₹{(selectedInvoice.quantity * selectedInvoice.rate * (selectedInvoice.particulars === 'Cement' ? 0.14 : 0.09)).toFixed(2)}</p>
                                <p><strong>Total Amount:</strong> ₹{(selectedInvoice.quantity * selectedInvoice.rate * (1 + (selectedInvoice.particulars === 'Cement' ? 0.28 : 0.18))).toFixed(2)}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <div className="p-6 bg-slate-50 rounded-lg shadow-lg">
                <Typography variant="h5" className="mb-4 font-bold text-slate-800">
                    Invoices
                </Typography>
                <TableContainer component={Paper} className="shadow-md">
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <StyledTableCell
                                        key={headCell.id}
                                        align={headCell.id === 'action' ? 'center' : 'left'}
                                    >
                                        {headCell.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedInvoices.map((row, i) => {
                                const amount = row.quantity * row.rate;
                                const cgstRate = row.particulars === 'Cement' ? 0.14 : 0.09;
                                const sgstRate = row.particulars === 'Cement' ? 0.14 : 0.09;
                                const cgstAmount = amount * cgstRate;
                                const sgstAmount = amount * sgstRate;
                                const totalGstAmount = cgstAmount + sgstAmount + amount;

                                return (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell>{row.invoiceno}</StyledTableCell>
                                        <StyledTableCell>
                                            {new Date(row.date).toLocaleDateString('en-GB')}
                                        </StyledTableCell>

                                        <StyledTableCell>{row.to}</StyledTableCell>
                                        <StyledTableCell>{row.address}</StyledTableCell>
                                        <StyledTableCell>{row.aadhar}</StyledTableCell>
                                        <StyledTableCell>{row.gstin}</StyledTableCell>
                                        <StyledTableCell>{row.particulars}</StyledTableCell>
                                        <StyledTableCell>{row.hsn}</StyledTableCell>
                                        <StyledTableCell>{row.quantity}</StyledTableCell>
                                        <StyledTableCell>₹{row.rate}</StyledTableCell>
                                        <StyledTableCell>₹{totalGstAmount.toFixed(2)}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <div className="flex justify-center gap-2">
                                                <Tooltip title="View">
                                                    <IconButton onClick={() => handleViewOpen(row)}>
                                                        <VisibilityIcon className="text-blue-500 hover:text-blue-700" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                    <IconButton onClick={() => handleEditOpen(row._id)}>
                                                        <EditIcon className="text-green-500 hover:text-green-700" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton onClick={() => handleDelete(row._id)}>
                                                        <DeleteIcon className="text-red-500 hover:text-red-700" />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                        <Typography variant="body2" className="text-slate-600">
                            Rows per page:
                        </Typography>
                        <Select
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                            className="h-8"
                        >
                            {[5, 10, 25, 50].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <Pagination
                        count={Math.ceil(invoice.length / rowsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                        className="ml-auto"
                    />
                </div>
            </div>
        </>
    );
};

AddInvoiceTable.propTypes = {
    invoice: PropTypes.array.isRequired,
};

export default AddInvoiceTable;