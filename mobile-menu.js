document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu');
    const navLinks = document.querySelector('.links');
    const navItems = document.querySelectorAll('.links div');

    // Toggle mobile menu
    menuButton?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a nav item
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !e.target.closest('.links') && 
            !e.target.closest('.menu') &&
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
