// Function to check if all fields are filled
function checkFields() {
    const form = document.getElementById('generateForm');
    const inputs = form.querySelectorAll('input');
    const button = document.getElementById('generateBtn');
    
    // Check if all input fields have values
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    
    // Enable/Disable button based on input validation
    if (allFilled) {
        button.disabled = false;
        button.classList.add('active');
        button.classList.remove('inactive');
    } else {
        button.disabled = true;
        button.classList.remove('active');
    }
}

// Add event listeners to form inputs to check if all fields are filled
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', checkFields);
});

// Initial check when the page loads
document.addEventListener('DOMContentLoaded', checkFields);

// Existing code to handle form submission
document.getElementById('generateBtn').addEventListener('click', async function () {
    // Show the confirmation modal
    document.getElementById('confirmationModal').classList.add('show');
});

// Add event listener for the "Proceed" button inside the modal
document.getElementById('proceedBtn').addEventListener('click', async function () {
    const form = document.getElementById('generateForm');
    const formData = new FormData(form);

    const data = {
        video_title: formData.get('video_title'),
        nemotron_api: formData.get('nemotron_api'),
        eleven_api: formData.get('eleven_api'),
        huggingface_api: formData.get('huggingface_api'),
        email: formData.get('email'),
    };

    try {
        const response = await fetch('https://redesigned-cod-pjwjqxrg6px73r4vx-5000.app.github.dev/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        const messageElement = document.getElementById('responseMessage');

        if (response.ok) {
            messageElement.textContent = `Success: ${result.message}`;
            messageElement.style.color = 'green';
        } else {
            messageElement.textContent = `Error: ${result.message}`;
            messageElement.style.color = 'red';
        }

        // Clear the input fields after submission
        form.reset();

        // Close the modal after submission
        document.getElementById('confirmationModal').classList.remove('show');
    } catch (error) {
        document.getElementById('responseMessage').textContent = `Error: ${error.message}`;
        document.getElementById('responseMessage').style.color = 'red';

        // Close the modal if there's an error
        document.getElementById('confirmationModal').classList.remove('show');
    }
});

// Add event listener for the "Exit" button inside the modal
document.getElementById('exitBtn').addEventListener('click', function () {
    // Reload the page when "Exit" is clicked
    location.reload();
});
