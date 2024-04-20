
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import InvoiceTamplet from '../components/InvoiceTamplet';

export default function InvoiceDownload() {

    const invoices = useSelector(state => state.invoice.filterInvoice);
    const componentRef = useRef();


    return (
        <>
            <ReactToPrint
                trigger={() =>
                    <div className='flex my-7 justify-end max-w-7xl mx-auto'>
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
                                Download Invoice
                            </span>
                        </button>
                    </div>}
                content={() => componentRef.current}
            />
            <div ref={componentRef}>
                {invoices.map((invoice, i) => {
                    return (
                        <InvoiceTamplet
                            key={i}
                            invoiceno={invoice.invoiceno}
                            date={invoice.date}
                            to={invoice.to}
                            address={invoice.address}
                            aadhar={invoice.aadhar}
                            gstin={invoice.gstin}
                            particulars={invoice.particulars}
                            hsn={invoice.hsn}
                            quantity={invoice.quantity}
                            rate={invoice.rate}
                            amount={invoice.amount}
                        />
                    )
                })}
            </div>
        </>

    )
}
