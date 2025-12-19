// =====================
// GSAP Timeline
// =====================
const tl = gsap.timeline();

tl.to('.one', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
  .to('.three', { opacity: 1, scale: 1, duration: 1, ease: 'back.out' }, '+=0.5')
  .to('.four', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '+=0.3')
  .to('.six', { opacity: 1, scale: 1, duration: 1, ease: 'back.out' }, '+=0.5')
  .to('#showGalleryBtn', { opacity: 1, y: 0, duration: 1, ease: 'bounce.out' }, '+=0.5');

// Initial states
gsap.set('.one', { opacity: 0, y: 50 });
gsap.set('.three', { opacity: 0, scale: 0.5 });
gsap.set('.four', { opacity: 0, y: 30 });
gsap.set('.six', { opacity: 0, scale: 0.8 });
gsap.set('#showGalleryBtn', { opacity: 0, y: 20 });


// =====================
// AUTOPLAY AUDIO (1 klik)
// =====================
document.addEventListener('click', function () {
  const audio = document.getElementById('bgm');
  if (audio) {
    audio.volume = 0.7;
    audio.play().catch(() => {});
  }
}, { once: true });


// =====================
// Fake Button (SweetAlert)
// =====================
document.querySelector('.fake-btn').addEventListener('click', () => {
  Swal.fire({
    title: '💐 Doa untuk Ibu',
    html: `
      <p style="color:#8d6e63; font-size:1.1rem; line-height:1.8;">
        Semoga Ibu selalu dilimpahi kesehatan, kebahagiaan,
        dan keberkahan. Terima kasih atas semua cinta dan
        pengorbanan yang tak terhingga. ❤️
      </p>
    `,
    confirmButtonText: 'Aamiin 🤲',
    confirmButtonColor: '#c77b6b',
    background: '#fef5f1',
    customClass: {
      popup: 'rounded-popup'
    }
  });
});


// =====================
// Gallery Navigation
// =====================
const home = document.getElementById("home");
const gallery = document.getElementById("gallery");
const showGalleryBtn = document.getElementById("showGalleryBtn");
const backHomeBtn = document.getElementById("backHome");

showGalleryBtn.addEventListener("click", () => {
  home.style.display = "none";
  gallery.style.display = "block";
});

backHomeBtn.addEventListener("click", () => {
  gallery.style.display = "none";
  home.style.display = "block";
});


