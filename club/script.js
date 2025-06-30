// Parallax Effect
document.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed')) || 0.3;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// Dynamic Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Apply new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('hubist-theme', newTheme);
    
    // Button animation
    themeToggle.classList.add('animate');
    setTimeout(() => themeToggle.classList.remove('animate'), 500);
    
    // Icon change
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'light' 
        ? 'fas fa-moon' 
        : 'fas fa-sun';
});

// Social Media Tooltips
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = icon.getAttribute('data-tooltip');
    icon.appendChild(tooltip);
    
    icon.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    });
    
    icon.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px)';
    });
});
