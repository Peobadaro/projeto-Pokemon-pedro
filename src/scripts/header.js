document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.header__menu-button');
    const nav = document.querySelector('.header__nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', !isExpanded);
            nav.setAttribute('aria-hidden', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
                menuButton.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
            }
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('.header__nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuButton.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
            });
        });
    }
}); 