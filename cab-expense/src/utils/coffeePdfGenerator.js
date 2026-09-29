import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

const ITEM_LABELS = {
  coffee: 'Coffee',
  tea: 'Tea',
  lemonTea: 'Lemon Tea',
  gingerTea: 'Ginger Tea',
  irishCoffee: 'Irish Coffee',
  milk: 'Milk',
  boost: 'Boost',
  snacks: 'Snacks'
};

const monthNames = {
  '01': 'January', '02': 'February', '03': 'March', '04': 'April',
  '05': 'May', '06': 'June', '07': 'July', '08': 'August',
  '09': 'September', '10': 'October', '11': 'November', '12': 'December'
};

const generateCoffeePDF = (expenses, filterMonth, filterDate) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('GUNDAL BUSINESS PVT. LTD.', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text('COFFEE & SNACKS REPORT', pageWidth / 2, 28, { align: 'center' });

  doc.setLineWidth(0.5);
  doc.line(14, 32, pageWidth - 14, 32);

  // Period / Details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  
  let periodText = 'All Available Records';
  if (filterDate) {
    periodText = `Date: ${format(new Date(filterDate), 'dd-MM-yyyy')}`;
  } else if (filterMonth) {
    periodText = `Month: ${monthNames[filterMonth]} ${new Date().getFullYear()}`;
  }
  
  doc.text(`Period: ${periodText}`, 14, 42);

  // Table Data
  const tableColumn = ["Date", "Point Person", "Order Mode", "Items Ordered"];
  const tableRows = [];
  
  const totals = {
    coffee: 0, tea: 0, lemonTea: 0, gingerTea: 0, 
    irishCoffee: 0, milk: 0, boost: 0, snacks: 0
  };

  expenses.forEach(exp => {
    // Add to tally
    Object.keys(totals).forEach(key => {
      totals[key] += parseInt(exp[key] || 0);
    });

    // Build row breakdown string
    const breakdown = Object.keys(ITEM_LABELS).map(key => {
      const qty = parseInt(exp[key] || 0);
      if (qty > 0) return `${ITEM_LABELS[key]}: ${qty}`;
      return null;
    }).filter(Boolean).join(' | ');

    const expenseData = [
      format(new Date(exp.date), 'dd-MM-yyyy') + (exp.orderTime ? `\n(${exp.orderTime})` : ''),
      exp.empName,
      exp.orderMode || 'Delivery',
      breakdown || 'No items listed'
    ];
    tableRows.push(expenseData);
  });

  doc.autoTable({
    startY: 50,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [16, 185, 129], textColor: 255 }, // Emerald green
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: {
      3: { cellWidth: 80 }
    }
  });

  const finalY = doc.lastAutoTable.finalY || 50;

  // Render Tally Summary block
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL ITEMS CONSUMED:', 14, finalY + 15);
  doc.setFont('helvetica', 'normal');
  
  let currentY = finalY + 22;
  let colX1 = 14;
  let colX2 = 80;
  
  const keys = Object.keys(ITEM_LABELS);
  // Split into 2 columns
  for(let i = 0; i < keys.length; i+=2) {
    const key1 = keys[i];
    const key2 = keys[i+1];
    if (totals[key1] > 0) doc.text(`${ITEM_LABELS[key1]}: ${totals[key1]}`, colX1, currentY);
    if (key2 && totals[key2] > 0) doc.text(`${ITEM_LABELS[key2]}: ${totals[key2]}`, colX2, currentY);
    
    if (totals[key1] > 0 || (key2 && totals[key2] > 0)) {
      currentY += 6;
    }
  }

  // Signature Section
  currentY += 15;
  doc.setLineWidth(0.2);
  doc.line(14, currentY, pageWidth - 14, currentY);
  currentY += 10;
  doc.text('Prepared By:', 20, currentY);
  doc.line(48, currentY, 90, currentY);

  doc.text('Approved By:', 120, currentY);
  doc.line(148, currentY, 190, currentY);

  currentY += 15;
  doc.text('Date:', 20, currentY);
  doc.line(32, currentY, 70, currentY);

  const safeDateString = filterDate || format(new Date(), 'MMM_yyyy');
  doc.save(`Coffee_Snacks_Report_${safeDateString}.pdf`);
};

export default generateCoffeePDF;
