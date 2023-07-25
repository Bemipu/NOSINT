// Listen Form Submit Event
var currentUrl;

document.addEventListener('submit', function(event) {
    // Fetch Current URL
    const formUrl = window.location.href;

    // Prevent form default behavior (submit)
    event.preventDefault();
  
    // Fetch input data
    const formData = {};
    const form = event.target;
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      formData[input.name] = input.value;
    });
  
    // Use Confirm to inspect info
    const result = confirm('Submit?\nHere is the inputs:\n' + JSON.stringify(formData, null, 2) + '\nThe Current URL:' + formUrl);
  
    if (result) {
      // Yes, submit
      form.submit();
    } else {
      // No, cancel
      console.log('Form submission stopped');
    }
  });
  