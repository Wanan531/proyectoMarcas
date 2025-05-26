document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[\d\s-]{10,}$/;

    // Error messages
    const errorMessages = {
        name: 'Por favor, ingrese su nombre completo',
        email: 'Por favor, ingrese un correo electrónico válido',
        phone: 'Por favor, ingrese un número de teléfono válido',
        subject: 'Por favor, ingrese un asunto',
        message: 'Por favor, ingrese un mensaje'
    };

    // Show error message
    function showError(input, message) {
        const errorElement = document.getElementById(`${input.id}Error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('invalid');
    }

    // Hide error message
    function hideError(input) {
        const errorElement = document.getElementById(`${input.id}Error`);
        errorElement.style.display = 'none';
        input.classList.remove('invalid');
    }

    // Validate input
    function validateInput(input, pattern = null) {
        if (input.value.trim() === '') {
            showError(input, errorMessages[input.id]);
            return false;
        }

        if (pattern && !pattern.test(input.value)) {
            showError(input, errorMessages[input.id]);
            return false;
        }

        hideError(input);
        return true;
    }

    // Add input event listeners for real-time validation
    [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            if (input === emailInput) {
                validateInput(input, emailPattern);
            } else if (input === phoneInput) {
                validateInput(input, phonePattern);
            } else {
                validateInput(input);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Validate all fields
        if (!validateInput(nameInput)) isValid = false;
        if (!validateInput(emailInput, emailPattern)) isValid = false;
        if (!validateInput(phoneInput, phonePattern)) isValid = false;
        if (!validateInput(subjectInput)) isValid = false;
        if (!validateInput(messageInput)) isValid = false;

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('¡Formulario enviado con éxito!');
            form.reset();
        }
    });
}); 