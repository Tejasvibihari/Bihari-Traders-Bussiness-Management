import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function AddInvoiceTable({ invoice }) {

    const deleteInvoice = async (id) => {
        console.log(id)
        try {
            const response = await axios.delete(`/api/invoice/deleteinvoice/${id}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

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
    return (
        <>
            <div className='my-5'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Invoice No.</StyledTableCell>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>To M/s</StyledTableCell>
                                <StyledTableCell>Address</StyledTableCell>
                                <StyledTableCell>Aadhar No.</StyledTableCell>
                                <StyledTableCell>GSTIN</StyledTableCell>
                                <StyledTableCell>Particulars</StyledTableCell>
                                <StyledTableCell>HSN Code</StyledTableCell>
                                <StyledTableCell>Quantity</StyledTableCell>
                                <StyledTableCell>Rate</StyledTableCell>
                                <StyledTableCell>Amount</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoice && invoice.map((bill, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{bill.invoiceno}</StyledTableCell>
                                    <StyledTableCell>{bill.date}</StyledTableCell>
                                    <StyledTableCell>{bill.to}</StyledTableCell>
                                    <StyledTableCell>{bill.address}</StyledTableCell>
                                    <StyledTableCell>{bill.aadhar}</StyledTableCell>
                                    <StyledTableCell>{bill.gstin}</StyledTableCell>
                                    <StyledTableCell>{bill.particulars}</StyledTableCell>
                                    <StyledTableCell>{bill.hsn}</StyledTableCell>
                                    <StyledTableCell>{bill.quantity}</StyledTableCell>
                                    <StyledTableCell>{bill.rate}</StyledTableCell>
                                    <StyledTableCell>{bill.amount}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div >
        </>
    )
}
