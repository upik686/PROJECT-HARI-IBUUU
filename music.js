// Music Controller dengan Force Autoplay
(function() {
  'use strict';
  
  // Buat Music Controller UI
  function createMusicController() {
    const controller = document.createElement('div');
    controller.id = 'musicController';
    controller.innerHTML = `
      <button id="musicToggle" class="music-btn">
        <span id="musicIcon">🔊</span>
      </button>
    `;
    document.body.appendChild(controller);
    
    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
      #musicController {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
      }
      
      .music-btn {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(240, 147, 251, 0.4);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .music-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(240, 147, 251, 0.6);
      }
      
      .music-btn:active {
        transform: scale(0.95);
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      .music-btn.playing {
        animation: pulse 2s infinite;
      }
      
      /* Overlay untuk trigger autoplay */
      #musicOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      
      #musicOverlay.show {
        opacity: 1;
        pointer-events: all;
      }
      
      #musicOverlay .start-btn {
        padding: 20px 50px;
        font-size: 20px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 10px 30px rgba(240, 147, 251, 0.5);
        transition: all 0.3s ease;
      }
      
      #musicOverlay .start-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 40px rgba(240, 147, 251, 0.6);
      }
    `;
    document.head.appendChild(style);
  }
  
  // Buat overlay untuk trigger autoplay
  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'musicOverlay';
    overlay.innerHTML = `
      <button class="start-btn">🎵 Mulai Musik</button>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }
  
  function initMusic() {
    const audio = document.getElementById('bgMusic');
    
    if (!audio) {
      console.error('Audio element tidak ditemukan!');
      return;
    }
    
    // Set volume
    audio.volume = 0.7;
    
    // Create controller UI
    createMusicController();
    
    const toggleBtn = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    
    // Load state dari localStorage
    const savedTime = localStorage.getItem('musicTime');
    const isPlaying = localStorage.getItem('musicPlaying');
    const hasInteracted = localStorage.getItem('musicInteracted');
    
    console.log('Music State:', { savedTime, isPlaying, hasInteracted });
    
    // Set posisi musik
    if (savedTime && !isNaN(parseFloat(savedTime))) {
      audio.currentTime = parseFloat(savedTime);
    }
    
    // Function untuk update icon
    function updateIcon(playing) {
      if (playing) {
        musicIcon.textContent = '🔊';
        toggleBtn.classList.add('playing');
      } else {
        musicIcon.textContent = '🔇';
        toggleBtn.classList.remove('playing');
      }
    }
    
    // Function untuk play musik
    function playMusic() {
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Musik berhasil diputar!');
            updateIcon(true);
            localStorage.setItem('musicPlaying', 'true');
            localStorage.setItem('musicInteracted', 'true');
          })
          .catch(error => {
            console.error('Autoplay gagal:', error);
            updateIcon(false);
            
            // Tampilkan overlay jika autoplay diblok
            if (!hasInteracted) {
              showOverlay();
            }
          });
      }
    }
    
    // Function untuk pause musik
    function pauseMusic() {
      audio.pause();
      updateIcon(false);
      localStorage.setItem('musicPlaying', 'false');
    }
    
    // Function untuk show overlay
    function showOverlay() {
      const overlay = document.getElementById('musicOverlay') || createOverlay();
      overlay.classList.add('show');
      
      const startBtn = overlay.querySelector('.start-btn');
      startBtn.onclick = () => {
        playMusic();
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
      };
    }
    
    // Toggle music saat tombol diklik
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (audio.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    });
    
    // Coba auto play
    if (isPlaying !== 'false') {
      // Tunggu sedikit untuk memastikan audio ready
      setTimeout(() => {
        playMusic();
      }, 200);
    } else {
      updateIcon(false);
    }
    
    // Fallback: coba play saat user klik/touch apapun di halaman
    let attempted = false;
    function attemptPlay() {
      if (!attempted && audio.paused && isPlaying !== 'false') {
        attempted = true;
        playMusic();
      }
    }
    
    document.addEventListener('click', attemptPlay, { once: true });
    document.addEventListener('touchstart', attemptPlay, { once: true });
    document.addEventListener('keydown', attemptPlay, { once: true });
    
    // Simpan posisi musik setiap 500ms
    setInterval(() => {
      if (!audio.paused && audio.currentTime > 0) {
        localStorage.setItem('musicTime', audio.currentTime.toString());
      }
    }, 500);
    
    // Simpan state sebelum pindah halaman
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('musicTime', audio.currentTime.toString());
      localStorage.setItem('musicPlaying', !audio.paused ? 'true' : 'false');
    });
    
    // Update icon saat audio state berubah
    audio.addEventListener('play', () => updateIcon(true));
    audio.addEventListener('pause', () => updateIcon(false));
    audio.addEventListener('ended', () => updateIcon(false));
    
    // Handle errors
    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      console.error('Audio error code:', audio.error?.code);
      console.error('Audio error message:', audio.error?.message);
    });
    
    // Log when audio is ready
    audio.addEventListener('canplay', () => {
      console.log('Audio ready to play');
    });
  }
  
  // Jalankan saat DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusic);
  } else {
    initMusic();
  }
})();