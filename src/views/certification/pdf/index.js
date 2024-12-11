
import { jsPDF } from "jspdf";

const generatePDF = async (data) => {
    const doc = new jsPDF("l", "mm", "a4", true);
    const watermark = await import(
        "@/assets/bg_certificate.png"
    );
    const widthCenter = doc.internal.pageSize.getWidth() / 2
    const heightCenter = doc.internal.pageSize.getHeight() / 2
    doc.addImage(
        watermark.default,
        "PNG",
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight(),
        "bg_certificate",
        "FAST"
    );

    doc.setFont("Poppins", "bold");
    doc.setTextColor("#1f2937");
    doc.setFontSize(26);
    doc.text("CERTIFICATE", widthCenter, heightCenter - 50, 'center');
    doc.setFont("Poppins", "normal");
    doc.setTextColor("#1f2937");
    doc.setFontSize(23);
    doc.text("OF APPRECIATION", widthCenter, heightCenter - 40, 'center');


    doc.setFont("Poppins", "normal");
    doc.setTextColor("#1f2937");
    doc.setFontSize(22);
    doc.text("PROUDLY PRESENTED TO", widthCenter, heightCenter - 5, 'center');
    doc.setFont("Poppins", "bold");
    doc.setTextColor("#1f2937");
    doc.setFontSize(28);
    doc.text(data.employee_name.toUpperCase(), widthCenter, heightCenter + 5, 'center');

    doc.setFont("Poppins", "medium");
    doc.setTextColor("#1f2937");
    doc.setFontSize(20);
    doc.text("has participated in", widthCenter, heightCenter + 25, 'center');

    doc.text(doc.splitTextToSize(`${data.certification_name.toUpperCase()}`, 160), widthCenter, heightCenter + 35, 'center');
    // print
    doc.setProperties({
        title: `${data.employee_name.toUpperCase()}-${data.certification_name.toUpperCase()}.pdf`
    });

    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
}
export default generatePDF;