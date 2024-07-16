const home = document.getElementById('home');
const about = document.getElementById('about');
const contact = document.getElementById('contact');

if (home) {
    home.addEventListener('click', () => {
        window.location.href = '/';
    });
}

if (about) {
    about.addEventListener('click', () => {
        window.location.href = '/about';
    });
}

if (contact) {
    contact.addEventListener('click', () => {
        window.location.href = '/contact';
    });
}
