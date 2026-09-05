/**
 * ====================================================================
 *  AUDIO CONTROLLER — EXCLUSIVELY "APNA BANA LE"
 *  Official YouTube Stream & Spotify Embed for "Apna Bana Le" (Bhediya)
 *  No other songs or fallback melodies are played.
 * ====================================================================
 */

class BirthdayAudioPlayer {
  constructor() {
    this.audioElement = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.ytPlayer = null;
    this.ytReady = false;
    this.activeSource = 'none'; // 'local' | 'youtube' | 'spotify'

    // UI elements
    this.playBtn = document.getElementById('music-toggle-btn');
    this.muteBtn = document.getElementById('music-mute-btn');
    this.visualizer = document.getElementById('music-visualizer');
    this.trackTitle = document.getElementById('music-track-title');
    this.expandBtn = document.getElementById('music-expand-btn');
    this.coverToggle = document.getElementById('music-cover-toggle');
    this.infoToggle = document.getElementById('music-info-toggle');
    this.expandedPanel = document.getElementById('music-expanded-panel');
    this.closeExpandedBtn = document.getElementById('close-expanded-panel-btn');
    this.tabYtBtn = document.getElementById('tab-yt-btn');
    this.tabSpotifyBtn = document.getElementById('tab-spotify-btn');
    this.tabYtContent = document.getElementById('expanded-yt-tab');
    this.tabSpotifyContent = document.getElementById('expanded-spotify-tab');

    this.init();
  }

  init() {
    const config = window.birthdayConfig ? window.birthdayConfig.audio : null;
    const songPath = config ? (config.songFile || 'audio/apna-bana-le.mp3') : 'audio/apna-bana-le.mp3';

    // 1. Local HTML5 Audio (if user places apna-bana-le.mp3)
    this.audioElement = new Audio();
    this.audioElement.src = songPath;
    this.audioElement.loop = true;
    this.audioElement.volume = 0.85;

    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.activeSource = 'local';
      this.updateUI(true);
    });

    this.audioElement.addEventListener('pause', () => {
      if (this.activeSource === 'local') {
        this.isPlaying = false;
        this.updateUI(false);
      }
    });

    // 2. Setup YouTube Player for Apna Bana Le (Video ID: e-ORhEE9VVg)
    this.setupYouTubePlayer('e-ORhEE9VVg');

    // 3. UI Buttons
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.togglePlay());
    }
    if (this.muteBtn) {
      this.muteBtn.addEventListener('click', () => this.toggleMute());
    }

    // Toggle expanded player panel
    const togglePanel = () => {
      if (this.expandedPanel) {
        this.expandedPanel.classList.toggle('hidden');
        if (this.expandBtn) {
          this.expandBtn.textContent = this.expandedPanel.classList.contains('hidden') ? '▲' : '▼';
        }
      }
    };

    if (this.expandBtn) this.expandBtn.addEventListener('click', togglePanel);
    if (this.coverToggle) this.coverToggle.addEventListener('click', togglePanel);
    if (this.infoToggle) this.infoToggle.addEventListener('click', togglePanel);
    if (this.closeExpandedBtn) this.closeExpandedBtn.addEventListener('click', togglePanel);

    // Tabs switching between YouTube and Spotify
    if (this.tabYtBtn && this.tabSpotifyBtn) {
      this.tabYtBtn.addEventListener('click', () => {
        this.tabYtBtn.classList.add('active');
        this.tabSpotifyBtn.classList.remove('active');
        if (this.tabYtContent) this.tabYtContent.style.display = 'block';
        if (this.tabSpotifyContent) this.tabSpotifyContent.style.display = 'none';
      });

      this.tabSpotifyBtn.addEventListener('click', () => {
        this.tabSpotifyBtn.classList.add('active');
        this.tabYtBtn.classList.remove('active');
        if (this.tabYtContent) this.tabYtContent.style.display = 'none';
        if (this.tabSpotifyContent) this.tabSpotifyContent.style.display = 'block';
      });
    }
  }

  setupYouTubePlayer(videoId) {
    const initYT = () => {
      try {
        this.ytPlayer = new YT.Player('yt-player', {
          height: '100%',
          width: '100%',
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            loop: 1,
            playlist: videoId,
            playsinline: 1,
            modestbranding: 1,
            rel: 0
          },
          events: {
            onReady: (event) => {
              this.ytReady = true;
              event.target.setVolume(85);
            },
            onStateChange: (event) => {
              if (event.data === YT.PlayerState.PLAYING) {
                this.isPlaying = true;
                this.activeSource = 'youtube';
                this.updateUI(true);
              } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                if (this.activeSource === 'youtube') {
                  this.isPlaying = false;
                  this.updateUI(false);
                }
              }
            }
          }
        });
      } catch (e) {
        console.warn('YouTube Player initialization error:', e);
      }
    };

    if (window.YT && window.YT.Player) {
      initYT();
    } else {
      window.onYouTubeIframeAPIReady = initYT;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  /**
   * Start Apna Bana Le when user clicks "Open Your Surprise ✨"
   */
  async startOnGesture() {
    if (this.isPlaying) return;

    if (!this.audioElement) {
      this.audioElement = new Audio('audio/apna-bana-le.mp3');
      this.audioElement.loop = true;
      this.audioElement.volume = 0.9;
    }

    try {
      const p = this.audioElement.play();
      if (p !== undefined) {
        await p;
        this.isPlaying = true;
        this.activeSource = 'local';
        this.updateUI(true);
        return;
      }
    } catch (err) {
      console.warn('Direct audio play failed, starting YouTube stream:', err);
      if (this.ytPlayer && typeof this.ytPlayer.playVideo === 'function') {
        this.ytPlayer.playVideo();
        this.isPlaying = true;
        this.activeSource = 'youtube';
        this.updateUI(true);
      } else if (this.expandedPanel) {
        this.expandedPanel.classList.remove('hidden');
        if (this.expandBtn) this.expandBtn.textContent = '▼';
      }
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (this.activeSource === 'youtube' && this.ytPlayer && typeof this.ytPlayer.playVideo === 'function') {
      this.ytPlayer.playVideo();
    } else if (this.activeSource === 'local' && this.audioElement) {
      this.audioElement.play();
    } else if (this.ytPlayer && typeof this.ytPlayer.playVideo === 'function') {
      this.ytPlayer.playVideo();
      this.activeSource = 'youtube';
    } else if (this.audioElement) {
      this.audioElement.play();
      this.activeSource = 'local';
    } else if (this.expandedPanel) {
      this.expandedPanel.classList.remove('hidden');
    }
  }

  pause() {
    if (this.ytPlayer && typeof this.ytPlayer.pauseVideo === 'function') {
      this.ytPlayer.pauseVideo();
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.isPlaying = false;
    this.updateUI(false);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.ytPlayer) {
      if (this.isMuted && typeof this.ytPlayer.mute === 'function') {
        this.ytPlayer.mute();
      } else if (!this.isMuted && typeof this.ytPlayer.unMute === 'function') {
        this.ytPlayer.unMute();
      }
    }

    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }

    if (this.muteBtn) {
      this.muteBtn.setAttribute('aria-label', this.isMuted ? 'Unmute audio' : 'Mute audio');
      this.muteBtn.classList.toggle('is-muted', this.isMuted);
      this.muteBtn.textContent = this.isMuted ? '🔇' : '🔊';
    }
  }

  updateUI(playing) {
    if (this.playBtn) {
      this.playBtn.classList.toggle('is-playing', playing);
      this.playBtn.textContent = playing ? '⏸' : '▶';
      this.playBtn.setAttribute('aria-label', playing ? 'Pause Apna Bana Le' : 'Play Apna Bana Le');
    }
    if (this.visualizer) {
      this.visualizer.classList.toggle('is-active', playing && !this.isMuted);
    }
  }
}

// Auto instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.birthdayAudio = new BirthdayAudioPlayer();
});
