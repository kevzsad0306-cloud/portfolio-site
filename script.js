// ================= FLIPBOOK CONFIG =================
const flipbook = document.getElementById('flipbook');
const flipSound = document.getElementById('flip-sound');
const resetSound = document.getElementById('reset-sound');

// Use your existing image names here
const projectImages = [
    'images/project1-page1.jpg',
    'images/project1-page2.jpg',
    'images/project1-page3.jpg',
    'images/project1-page4.jpg',
    'images/project1-page5.jpg',
    'images/project1-page6.jpg',
    'images/project1-page7.jpg',
    'images/project1-page8.jpg',
    'images/project1-page9.jpg',
    'images/project1-page10.jpg'
];

let currentPage = 0;

// CREATE PAGES
projectImages.forEach((src, index) => {
    const page = document.createElement('div');
    page.classList.add('page');
    page.style.zIndex = projectImages.length - index;

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Page ${index + 1}`;

    page.appendChild(img);
    flipbook.appendChild(page);
});

const pages = flipbook.querySelectorAll('.page');

// SHOW CURRENT PAGE
function updatePages() {
    pages.forEach((page, i) => {
        if (i < currentPage) {
            page.classList.add('flipped');
        } else {
            page.classList.remove('flipped');
        }
        page.style.zIndex = projectImages.length - i;
    });
}

// ================= NAVIGATION =================
document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage < pages.length) {
        pages[currentPage].classList.add('flipped');
        flipSound.currentTime = 0;
        flipSound.play();
        currentPage++;

        // Reset if at last page
        if (currentPage === pages.length) {
            setTimeout(() => {
                pages.forEach(p => p.classList.remove('flipped'));
                currentPage = 0;
                resetSound.currentTime = 0;
                resetSound.play();
            }, 1200); // small delay for flip animation
        }
    }
});

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        pages[currentPage].classList.remove('flipped');
        flipSound.currentTime = 0;
        flipSound.play();
    }
});

// ================= SCROLL BACKGROUND =================
const bgLayer = document.getElementById('bg-layer');
const bgOverlay = document.getElementById('bg-overlay');
const sectionBG = {
    portfolio: 'images/bg-portfolio.png',
    steps: 'images/bg-steps.png',
    branding: 'images/bg-branding.png',
    gallery: 'images/bg-gallery.png',
    about: 'images/bg-about.png',
    contact: 'images/bg-contact.png'
};

window.addEventListener('scroll', () => {
    const scrollRatio = window.scrollY / (document.body.scrollHeight - innerHeight);
    bgOverlay.style.backgroundColor = `rgba(0,0,0,${0.35 + scrollRatio * 0.4})`;

    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < innerHeight / 2 && rect.bottom > innerHeight / 2) {
            if(sectionBG[section.id]) bgLayer.style.backgroundImage = `url('${sectionBG[section.id]}')`;
        }
    });
});
const introImg = document.querySelector('.intro-img');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const fadeStart = 0;      // start fading immediately
    const fadeEnd = 400;      // fully faded at 400px scroll
    const opacity = 1 - Math.min(Math.max((scrollTop - fadeStart) / (fadeEnd - fadeStart), 0), 1);
    introImg.style.opacity = opacity;
});
