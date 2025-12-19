    // Image data
    const images = [
      { src: 'img/img1.jpg', alt: 'Kenangan 1' },
      { src: 'img/img2.jpg', alt: 'Kenangan 2' },
      { src: 'img/img3.jpg', alt: 'Kenangan 3' },
      { src: 'img/img4.jpg', alt: 'Kenangan 4' },
      { src: 'img/img5.jpg', alt: 'Kenangan 5' },
      { src: 'img/img6.jpg', alt: 'Kenangan 6' },
      { src: 'img/img7.jpg', alt: 'Kenangan 7' },
      { src: 'img/img8.jpg', alt: 'Kenangan 8' },
      { src: 'img/img9.jpg', alt: 'Kenangan 9' },
      { src: 'img/img10.jpg', alt: 'Kenangan 10' },
      { src: 'img/img11.jpg', alt: 'Kenangan 11' },
      { src: 'img/img12.jpg', alt: 'Kenangan 12' },
      { src: 'img/img13.jpg', alt: 'Kenangan 13' },
      { src: 'img/img14.jpg', alt: 'Kenangan 14' },
      { src: 'img/img15.jpg', alt: 'Kenangan 15' },
      { src: 'img/img16.jpg', alt: 'Kenangan 16' },
      { src: 'img/img17.jpg', alt: 'Kenangan 17' },
      { src: 'img/img18.jpg', alt: 'Kenangan 18' },
      { src: 'img/img19.jpg', alt: 'Kenangan 19' },
      { src: 'img/img20.jpg', alt: 'Kenangan 20' }
    ];

    const gallery = document.getElementById('gallery');
    let currentImageIndex = 0;

    // Load images
    images.forEach((img, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `
        <span class="image-number">#${index + 1}</span>
        <img src="${img.src}" alt="${img.alt}" loading="lazy">
      `;
      
      item.onclick = () => openLightbox(index);
      gallery.appendChild(item);
    });

    // Animate images on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all gallery items with staggered delay
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      setTimeout(() => {
        observer.observe(item);
      }, index * 100); // Stagger by 100ms
    });

    // Lightbox functions
    function openLightbox(index) {
      currentImageIndex = index;
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = document.getElementById('lightboxImg');
      lightboxImg.src = images[index].src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      const lightbox = document.getElementById('lightbox');
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    function changeImage(direction) {
      currentImageIndex += direction;
      if (currentImageIndex < 0) currentImageIndex = images.length - 1;
      if (currentImageIndex >= images.length) currentImageIndex = 0;
      
      const lightboxImg = document.getElementById('lightboxImg');
      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.style.opacity = '1';
      }, 150);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const lightbox = document.getElementById('lightbox');
      if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
      }
    });

    // Close lightbox when clicking outside image
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') {
        closeLightbox();
      }
    });

