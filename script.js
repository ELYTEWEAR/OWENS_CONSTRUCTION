document.addEventListener('DOMContentLoaded', function() {
    window.createPDF = function() { // Ensure createPDF is globally accessible
        // Prevent default form submission behavior, if needed
        // event.preventDefault();

        // Initialize jsPDF
        const doc = new jsPDF();

        // Set starting position for the content
        let yPosition = 10;

        // Title for the PDF
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Estimate Sheet Roofing - Owen\'s Construction', 10, yPosition);
        yPosition += 20; // Increment position for the next line

        // Access the form and its elements
        const estimateForm = document.getElementById('estimateForm');
        const formElements = estimateForm.elements;

        // Convert form fields to text and add to PDF
        doc.setFont('helvetica', 'normal');
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.type !== "submit" && element.name !== "" && element.type !== "button") { // Skip submit and button elements
                let text;
                if (element.type === 'checkbox') {
                    text = `${element.checked ? 'Yes' : 'No'} - ${element.previousElementSibling.innerText}`;
                } else {
                    text = `${element.previousElementSibling ? element.previousElementSibling.innerText : ''} ${element.value}`;
                }
                doc.text(text, 10, yPosition);
                yPosition += 10; // Increment for next item
                if (yPosition > 280) { // Add a new page if the current page is full
                    doc.addPage();
                    yPosition = 10; // Reset position for the new page
                }
            }
        }

        // Save the PDF
        doc.save('Estimate-Sheet-Roofing.pdf');
    };
});
