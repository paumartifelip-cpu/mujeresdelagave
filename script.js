document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            }
        });
    }

    // Modal and Form logic
    const modal = document.getElementById('register-modal');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.querySelector('.close-modal');
    const registerForm = document.getElementById('register-form');

    if (modal && closeBtn) {
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('show');
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Mostrar estado de carga visual
            submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Procesando...";
            submitBtn.disabled = true;

            const scriptURL = 'https://script.google.com/macros/s/AKfycbzE_kKYikgfcUETyB86Gb6ujyMaJ8YnPRYEoklCIwIPxeSG_7IyeObuICDVhjbz8Hqgpg/exec';
            const formData = new FormData(registerForm);

            // Enviar datos en segundo plano a Google Sheets
            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    // Éxito: limpiar y enviar a Stripe
                    registerForm.reset();
                    window.location.href = 'https://buy.stripe.com/3cIeVf6ZgdHn0mE4ln5Ne0i';
                })
                .catch(error => {
                    console.error('Error al guardar en Sheets:', error.message);
                    // Como el pago es prioridad, redirigir igualmente
                    window.location.href = 'https://buy.stripe.com/3cIeVf6ZgdHn0mE4ln5Ne0i';
                })
                .finally(() => {
                    // Restaurar botón (por si falla la redirección)
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    // Initial check and scroll event listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
});
