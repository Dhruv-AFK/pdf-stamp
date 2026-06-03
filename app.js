async function processPdf() {
    const fileInput = document.getElementById('pdfFile');
    const textInput = document.getElementById('watermarkText').value;
    const opacityInput = parseFloat(document.getElementById('opacity').value);
    const rotationInput = parseInt(document.getElementById('rotation').value);
    const statusDiv = document.getElementById('status');

    // 1. Validation check
    if (fileInput.files.length === 0) {
        alert("Please select a PDF file first!");
        return;
    }

    const file = fileInput.files[0];
    if (file.type !== "application/pdf") {
        alert("Invalid file format. Please upload a PDF.");
        return;
    }

    statusDiv.innerText = "Processing your PDF locally...";

    try {
        // 2. Read file data as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();

        // 3. Load the PDF document using pdf-lib
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        
        // Fetch standard fonts built into PDF readers
        const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

        // 4. Get all pages from the document
        const pages = pdfDoc.getPages();

        // 5. Loop through every page and apply the watermark
        for (const page of pages) {
            // Get page width and height dynamically to place it relatively near the center
            const { width, height } = page.getSize();

            page.drawText(textInput, {
                x: width / 3,                  // Start roughly 1/3 across the page
                y: height / 2,                 // Center vertically
                size: 50,                      // Text size
                font: helveticaFont,
                color: PDFLib.rgb(0.7, 0, 0),  // Subdued Red text color
                opacity: opacityInput,         // Transparency setting
                rotate: PDFLib.degrees(rotationInput), // Rotates text diagonally
            });
        }

        // 6. Serialize the document to bytes
        const modifiedPdfBytes = await pdfDoc.save();

        // 7. Trigger an automatic download in the browser
        downloadBlob(modifiedPdfBytes, "watermarked_" + file.name);
        
        statusDiv.innerText = "Done! Your file has been downloaded.";

    } catch (error) {
        console.error(error);
        statusDiv.innerText = "An error occurred while processing the file.";
    }
}

// Helper function to handle downloading raw bytes directly inside the browser
function downloadBlob(bytes, filename) {
    const blob = new Blob([bytes], { type: "application/pdf" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}