document.addEventListener('DOMContentLoaded', function() {
    const estimateForm = document.getElementById('estimateForm');

    estimateForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Initialize jsPDF
        const doc = new jsPDF();

        // Set starting position for the content
        let yPosition = 10;

        // Add form data to PDF
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Estimate Sheet Roofing - Owen\'s Construction', 10, yPosition);
        yPosition += 10; // Increment position for the next line

        // Convert form fields to text and add to PDF
        doc.setFont('helvetica', 'normal');
        const formElements = estimateForm.elements;
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.type !== "submit") { // Skip the submit button
                let text = `${element.previousElementSibling.innerText} ${element.value}`;
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
    });
});
