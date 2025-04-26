

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nav = document.querySelector('.carousel-nav');
let currentIndex = 0;

slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.classList.add('carousel-indicator');
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => moveToSlide(i));
    nav.appendChild(btn);
});

const indicators = Array.from(nav.children);
function moveToSlide(index) {
    track.style.transform = `translateX(-${100 * index}%)`;
    indicators[currentIndex].classList.remove('active');
    indicators[index].classList.add('active');
    currentIndex = index;
}

setInterval(() => {
    const next = currentIndex + 1 < slides.length ? currentIndex + 1 : 0;
    moveToSlide(next);
}, 5000);