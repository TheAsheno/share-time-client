let carouselImages;
export let imageCount;
export let currentIndex = 0;
let timerId;

export function initCarousel() {
    carouselImages = document.getElementsByClassName('carousel-item');
    imageCount = carouselImages.length;
    setTimeout(setupView, 10);
    bindEvents();
    clearInterval(timerId);
    startAutoPlay();
}

function setupView() {
    const gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap'), 10);
    const halfLength = Math.floor(imageCount / 2);
    for (let i = 0; i < halfLength; i++) {
        let leftIndex = (currentIndex - i - 1 + imageCount) % imageCount;
        let rightIndex = (currentIndex + i + 1) % imageCount;

        let opacity = 1 - (i + 1) * 0.2;
        carouselImages[leftIndex].style.transform = `translateX(${-gap * (i + 1)}px) translateZ(${200 - i * 100}px) rotateY(30deg)`;
        carouselImages[leftIndex].style.opacity = opacity;
        carouselImages[rightIndex].style.transform = `translateX(${gap * (i + 1)}px) translateZ(${200 - i * 100}px) rotateY(-30deg)`;
        carouselImages[rightIndex].style.opacity = opacity;
    }
    carouselImages[currentIndex].style.transform = `translateZ(300px)`;
    carouselImages[currentIndex].style.opacity = 1;

    const carouselIndicators = document.getElementsByClassName('carousel-indicator');
    for (let i = 0; i < carouselIndicators.length; i++) {
        carouselIndicators[i].classList.remove('active');
    }
    carouselIndicators[currentIndex].classList.add('active');
}

export function handleClick(index) {
    return function() {
        if (index == currentIndex) {
            window.location.href = "#target1";
            return;
        }
        currentIndex = index;
        setupView();
    };
}

export function handleMouseEnter() {
    clearInterval(timerId);
}

function handleMouseOut() {
    startAutoPlay();
}

function bindEvents() {
    for (let i = 0; i < imageCount; i++) {
        carouselImages[i].addEventListener('click', handleClick(i));
        carouselImages[i].addEventListener('mouseenter', handleMouseEnter);
        carouselImages[i].addEventListener('mouseout', handleMouseOut);
    }
}

function startAutoPlay() {
    timerId = setInterval(function () {
        currentIndex = (currentIndex + 1) % imageCount;
        setupView();
    }, 5000);
}