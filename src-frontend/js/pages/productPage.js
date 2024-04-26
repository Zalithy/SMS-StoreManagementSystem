
    let addProduct = document.getElementById("add");
    let addCategory = document.getElementById("addCategory");
    

    addProduct.addEventListener("click", function() {

        const dialog = document.getElementById('addItemDialog');
        const openDialogButton = document.getElementById('openDialog');
        const closeButton = document.querySelectorAll('.dialog-btn[value="cancel"]')[0];
        const clearButton = document.getElementById('clear');

        dialog.showModal();

        // Function to close the dialog
        closeButton.addEventListener('click', function() {
            dialog.close();
        });

        // Clear form fields when clicking 'Clear'
        clearButton.addEventListener('click', function() {
            dialog.querySelectorAll('input, select').forEach(element => {
                element.value = ''; // Reset each field
            });
        });
});

    addCategory.addEventListener("click", function() {
        const dialog = document.getElementById('addCategoryDialog');
        const closeButtonCategory = document.getElementById('closeCategory');
        const clearButton = document.getElementById('clear');

        dialog.showModal();

        // Function to close the dialog
        closeButtonCategory.addEventListener('click', function() {
            dialog.close();
        });

        // Clear form fields when clicking 'Clear'
        clearButton.addEventListener('click', function() {
            dialog.querySelectorAll('input, select').forEach(element => {
                element.value = ''; // Reset each field
            });
        });
    });




    

    // const inputField = document.getElementById('price');
  
    // inputField.addEventListener('keydown', function (event) {
    //   // Prevent entry of non-numeric characters except backspace and delete
    //   if (!event.key.match(/^[0-9]$/) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
    //     event.preventDefault();
    //   }
  
    //   // Handle numeric input and backspace
    //   if (event.key.match(/^[0-9]$/)) {
    //     let currentVal = inputField.value.replace('.', ''); // Remove dot for calculation
    //     // Append the new digit to the end of the string (rightmost side)
    //     currentVal = currentVal + event.key;
    //     // Maintain two decimal places
    //     let integerPart = currentVal.slice(0, -2);
    //     let decimalPart = currentVal.slice(-2);
  
    //     // Remove leading zeros from integer part if integer part has significant value
    //     integerPart = integerPart.replace(/^0+/, '') || '0';
  
    //     // Format and set the new value
    //     inputField.value = integerPart + '.' + decimalPart;
    //     // Prevent the default input action
    //     event.preventDefault();
    //   }
    // });
  
    // // Force cursor to end on focus
    // inputField.addEventListener('click', function () {
    //   setTimeout(() => {
    //     inputField.selectionStart = inputField.selectionEnd = 10000; // large number to ensure end positioning
    //   }, 0);
    // });
  
    // inputField.addEventListener('focus', function () {
    //   setTimeout(() => {
    //     inputField.selectionStart = inputField.selectionEnd = 10000; // large number to ensure end positioning
    //   }, 0);
    // });
  
