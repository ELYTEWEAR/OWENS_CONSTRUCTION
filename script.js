document.addEventListener('DOMContentLoaded', function() {
    const estimateForm = document.getElementById('estimateForm');

    window.createPDF = function() { // Define createPDF as a global function
        event.preventDefault(); // Prevent the default form submission behavior

        // Initialize jsPDF
        const doc = new jsPDF();

        // Set starting position for the content
        let yPosition = 10;

        // Add form data to PDF
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Estimate Sheet Roofing - Owen\'s Construction', 10, yPosition);
        yPosition += 20; // Increment position for the next line

        // Convert form fields to text and add to PDF
        doc.setFont('helvetica', 'normal');
        const formElements = estimateForm.elements;
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.type !== "submit" && element.name !== "") {
                let text;
                if (element.type === 'checkbox') {
                    text = `${element.checked ? 'Yes' : 'No'} - ${element.previousElementSibling.innerText}`;
                } else {
                    text = `${element.previousElementSibling.innerText} ${element.value}`;
                }
                doc.text(text, 10, yPosition);
                yPosition += 10; // Increment for next item
                if (yPosition > 280) {
                    doc.addPage();
                    yPosition = 10; // Reset position for the new page
                }
            }
        }

        // Save the PDF
        doc.save('Estimate-Sheet-Roofing.pdf');
    };
});
