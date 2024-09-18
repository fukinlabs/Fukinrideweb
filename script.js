// script.js
document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.getElementById('carousel-slides');
    const thumbnailsContainer = document.getElementById('carousel-thumbnails');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const close = document.querySelector('.close');

    let currentSlide = 0;

    // Read JSON data from embedded script tag
    const jsonData = document.getElementById('data-json').textContent;
    const data = JSON.parse(jsonData);

    function initializeCarousel() {
        data.forEach(item => {
            // Create slide
            const slide = document.createElement('div');
            slide.classList.add('carousel-slide');
            slide.dataset.slide = item.id;
            slide.innerHTML = `<img src="${item.image}" alt="Slide ${item.id}">`;
            slidesContainer.appendChild(slide);

            // Create thumbnail
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            thumbnail.dataset.slide = item.id;
            thumbnail.innerHTML = `<img src="${item.thumbnail}" alt="Thumbnail ${item.id}">`;
            thumbnailsContainer.appendChild(thumbnail);
        });

        showSlide(currentSlide);
        
        // Add event listeners for thumbnails
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const slideIndex = parseInt(thumbnail.dataset.slide, 10) - 1;
                showSlide(slideIndex);
            });
        });

        // Add event listeners for slides
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach(slide => {
            slide.addEventListener('click', () => {
                openModal(slide.querySelector('img').src);
            });
        });
    }

    function showSlide(index) {
        const totalSlides = slidesContainer.children.length;
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function openModal(src) {
        modal.style.display = 'block';
        modalImg.src = src;
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    close.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Initialize carousel with embedded data
    initializeCarousel();
});

document.addEventListener("mousemove", parallax);
        function parallax(event) {
            this.querySelectorAll(".mouse").forEach((shift) => {
                const position = shift.getAttribute("value");
                const x = (window.innerWidth - event.pageX * position) / 90;
                const y = (window.innerHeight - event.pageY * position) / 90;

                shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        }