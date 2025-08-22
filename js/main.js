document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
        });
    }

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        animationObserver.observe(section);
    });

    // Add a class to nav-links to hide it by default on mobile
    if (window.innerWidth <= 768) {
        if (navLinks) {
            navLinks.style.display = 'none';
        }
    }

    // Adjust nav links display on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (navLinks) {
                navLinks.style.display = 'flex';
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            }
        } else {
            if (navLinks && !navLinks.classList.contains('active')) {
                navLinks.style.display = 'none';
            }
        }
    });

    // Handle mobile menu click to show/hide nav
    if(mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            if (navLinks) {
                const isNavActive = navLinks.classList.contains('active');
                if (isNavActive) {
                    navLinks.style.display = 'none';
                    navLinks.classList.remove('active');
                } else {
                    navLinks.style.display = 'flex';
                    navLinks.classList.add('active');
                }
            }
        });
    }
});

// Add some CSS for the active mobile menu
const style = document.createElement('style');
style.textContent = `
    .nav-links.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 70px;
        right: 20px;
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        gap: 1rem;
        z-index: 100;
    }
    .mobile-menu.is-active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .mobile-menu.is-active span:nth-child(2) {
        opacity: 0;
    }
    .mobile-menu.is-active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Deactivate all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Activate the clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});
