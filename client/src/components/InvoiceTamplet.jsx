import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import React from 'react';
import { useSelector } from 'react-redux';

const InvoiceTamplet = React.forwardRef(({ invoiceno, date, to, address, particulars, aadhar, gstin, rate, amount, hsn, quantity }, ref) => {
    const user = useSelector(state => state.user.currentUser);
    const cgstRate = particulars === "Cement" ? 0.14 : 0.09;
    const sgstRate = particulars === "Cement" ? 0.14 : 0.09;
    const cgstAmount = amount * cgstRate;
    const sgstAmount = amount * sgstRate;
    //Calculate total amount
    const total = amount + cgstAmount + sgstAmount;
    // Round off the total amount
    const roundOff = Math.round(total);

    InvoiceTamplet.displayName = 'InvoiceTamplet';
    return (
        <>
            <div ref={ref}>
                <div className="max-w-7xl border mx-auto my-1">
                    {/* Header Section  */}
                    <div className="bg-slate-300 max-h-[95px]">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-10 font-bold font-[italina] text-xl">
                                {user.bussinessName}
                            </div>
                            <div className="col-span-1 flex flex-col bg-gradient-to-t from-[#ffb400] to-[#ff8a00] justify-center items-end pr-12 border rounded-es-[100px] text-white font-semibold">
                                <div>
                                    INVOICE
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div>
                                        Invoice Number:- {invoiceno}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        Date:- {date.slice(0, 10)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* To and From Section */}
                    <div>
                        <div className="">
                            <div className="flex justify-between">
                                <div className="flex flex-col p-7">
                                    <div className="text-[#ff8a00] text-lg">
                                        Invoice To
                                    </div>
                                    <div className="text-black text-xl font-semibold mt-1">
                                        {to}
                                    </div>
                                    <div className="flex flex-col text-slate-400  mt-4">
                                        <div className="max-w-64">
                                            {address}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-slate-700">
                                            Aadhar No.: {aadhar}
                                        </div>
                                        <div className="text-slate-700">
                                            GSTIN:- {gstin}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col p-7">
                                    <div className="text-[#ff8a00] text-lg">
                                        Invoice From
                                    </div>
                                    <div className="text-black text-xl font-semibold mt-1">
                                        {user.bussinessName}
                                    </div>
                                    <div className="flex flex-col text-slate-400  mt-4">
                                        <div className="max-w-64">
                                            {user.address}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-slate-700">
                                            Mobile No: {user.mobile}
                                        </div>
                                        <div className="text-slate-700">
                                            GSTIN:- {user.gstin}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* From To Section Ended */}
                    {/* Table Section Start */}
                    <div className="mt-2">
                        <div className="max-w-full p-4">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-t from-[#ffb400] to-[#ff8a00] text-white justify-between p-2">
                                        <th className="p-2 text-center">Sr No</th>
                                        <th className="p-2 text-center">Particular</th>
                                        <th className="p-2 text-center">HSN</th>
                                        <th className="p-2 text-center">Price</th>
                                        <th className="p-2 text-center">Quantity</th>
                                        <th className="p-2 text-center">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="p-2 text-center py-3">1</td>
                                        <td className="p-2 text-center py-3">{particulars}</td>
                                        <td className="p-2 text-center py-3">{hsn}</td>
                                        <td className="p-2 text-center py-3">{rate}</td>
                                        <td className="p-2 text-center py-3">{quantity}</td>
                                        <td className="p-2 text-center py-3">{amount}</td>
                                    </tr>
                                    <tr className="h-[150px]"></tr>
                                    <tr className="border-b">
                                        <td colSpan="4" className="p-2 text-right py-3">CGST</td>
                                        <td className="p-2 text-center py-3">{(cgstRate * 100).toFixed(2)} %</td>
                                        <td className="p-2 text-center py-3">{cgstAmount.toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td colSpan="4" className="text-right p-2 py-3">SGST</td>
                                        <td className="p-2 text-center py-3">{(sgstRate * 100).toFixed(2)} %</td>
                                        <td className="p-2 text-center py-3">{sgstAmount.toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td colSpan="4" className="text-right p-2 py-3">Total</td>
                                        <td className="p-2 text-center py-3"></td>
                                        <td className="p-2 text-center py-3">{total.toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td colSpan="4" className="text-right p-2 py-3 text-[#ff8a00] font-bold">Round Off</td>
                                        <td className="p-2 text-center py-3"></td>
                                        <td className="p-2 text-center py-3">{roundOff}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Table Section Ended  */}
                    {/* signature section started  */}
                    <div className="mt-20">
                        <div className="grid grid-cols-2">
                            <div>

                            </div>
                            <div className="text-center">
                                Authorised Signature
                            </div>
                        </div>
                    </div>
                    {/* signature section ended  */}
                    {/* footer Section Started  */}
                    <div className="mt-20">
                        <div className="bg-slate-300 text-center py-4">
                            <div className="flex flex-row justify-evenly">
                                <div className="text-[#ff8a00] font-bold">
                                    <LocationOnIcon />
                                    {user.address}
                                </div>
                                <div>
                                    <EmailIcon /> {user.email}
                                </div>
                                <div>
                                    <PhoneIcon /> +91{user.mobile}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
})

InvoiceTamplet.propTypes = {
    invoice: PropTypes.shape({
        invoiceNumber: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        invoiceTo: PropTypes.object.isRequired,
        invoiceFrom: PropTypes.object.isRequired,
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        totals: PropTypes.object.isRequired,
    }).isRequired,
};

export default InvoiceTamplet;