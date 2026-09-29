import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

const generatePDF = (expenses, filterMonth, searchEmp) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('GUNDAL BUSINESS PVT. LTD.', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text('OFFICE EXPENSE REPORT', pageWidth / 2, 28, { align: 'center' });

  doc.setLineWidth(0.5);
  doc.line(14, 32, pageWidth - 14, 32);

  // Period / Details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  
  const monthNames = {
    '01': 'January', '02': 'February', '03': 'March', '04': 'April',
    '05': 'May', '06': 'June', '07': 'July', '08': 'August',
    '09': 'September', '10': 'October', '11': 'November', '12': 'December'
  };
  const periodText = filterMonth ? `Month: ${monthNames[filterMonth]} 2026` : 'All Available Records';
  doc.text(`Period: ${periodText}`, 14, 42);

  if (searchEmp) {
    doc.text(`Employee Search: ${searchEmp}`, 14, 48);
  } else {
    // If multiple distinct employees, maybe grouping or no single employee header
    const uniqueEmps = [...new Set(expenses.map(e => e.empName))];
    if (uniqueEmps.length === 1) {
      doc.text(`Employee: ${uniqueEmps[0]}`, 14, 48);
      const empId = expenses[0].empId;
      doc.text(`Employee ID: ${empId}`, 14, 54);
    }
  }

  const tableColumn = ["Date", "Employee", "Type", "Details", "Amount"];
  const tableRows = [];
  let totalAmount = 0;

  expenses.forEach(exp => {
    const expenseData = [
      format(new Date(exp.date), 'dd-MM-yyyy'),
      exp.empName,
      exp.expenseType || exp.cabType || 'Cab',
      exp.expenseType === 'Cab' || exp.cabType ? `${exp.from} ➔ ${exp.to}` : `${exp.from} - ${exp.to}`,
      `Rs. ${parseFloat(exp.amount).toFixed(2)}`
    ];
    tableRows.push(expenseData);
    totalAmount += parseFloat(exp.amount);
  });

  doc.autoTable({
    startY: searchEmp || [...new Set(expenses.map(e => e.empName))].length === 1 ? 60 : 50,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    styles: { fontSize: 10, cellPadding: 3 },
  });

  const finalY = doc.lastAutoTable.finalY || 60;
  
  doc.setFont('helvetica', 'bold');
  doc.text(`TOTAL: Rs. ${totalAmount.toFixed(2)}`, pageWidth - 14, finalY + 10, { align: 'right' });

  // Signature Section
  doc.setLineWidth(0.2);
  doc.line(14, finalY + 40, pageWidth - 14, finalY + 40);

  doc.text('Prepared By:', 20, finalY + 50);
  doc.line(48, finalY + 50, 90, finalY + 50);

  doc.text('Approved By:', 120, finalY + 50);
  doc.line(148, finalY + 50, 190, finalY + 50);

  doc.text('Date:', 20, finalY + 65);
  doc.line(32, finalY + 65, 70, finalY + 65);

  doc.save(`Office_Expense_Report_${format(new Date(), 'dd_MMM_yyyy')}.pdf`);
};

export default generatePDF;
