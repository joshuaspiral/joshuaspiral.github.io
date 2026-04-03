document.addEventListener('DOMContentLoaded', () => {
    setupEmailCopy();
    setupCodeCopy();
    setupBackToTop();
    setupSpiralHover();
});

function setupSpiralHover() {
    const spiral = document.querySelector('.site-logo-container');
    const heroQuote = document.querySelector('.hero-quote');
    
    if (!spiral || !heroQuote) return;

    spiral.addEventListener('mouseenter', () => {
        heroQuote.classList.add('highlighted');
    });

    spiral.addEventListener('mouseleave', () => {
        heroQuote.classList.remove('highlighted');
    });
}

function setupEmailCopy() {
    const emailLinks = document.querySelectorAll('.email-copy');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = link.getAttribute('data-email');
            
            if (!email) return;

            try {
                await navigator.clipboard.writeText(email);
                showTooltip(link, 'Copied!');
            } catch (err) {
                console.error('Failed to copy email:', err);
                showTooltip(link, 'Failed to copy');
            }
        });
        
    });
}

function showTooltip(element, message) {
    let tooltip = element.querySelector('.tooltip-feedback');
    if (!tooltip) {
        tooltip = document.createElement('span');
        tooltip.className = 'tooltip-feedback';
        element.appendChild(tooltip);
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
    }
    
    tooltip.textContent = message;
    tooltip.classList.add('visible');
    
    setTimeout(() => {
        tooltip.classList.remove('visible');
    }, 2000);
}

function setupCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(pre => {
        if (getComputedStyle(pre).position === 'static') {
            pre.style.position = 'relative';
        }

        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.ariaLabel = 'Copy code';
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;

        button.addEventListener('click', async () => {
            const code = pre.querySelector('code');
            const text = code ? code.innerText : pre.innerText;
            
            try {
                await navigator.clipboard.writeText(text);
                button.classList.add('copied');
                setTimeout(() => button.classList.remove('copied'), 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        });

        pre.appendChild(button);
    });
}

function setupBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
