// ===== MOBILE MENU TOGGLE =====
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
};

// Close nav when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});


// ===== VIDEO MODAL =====
function openVideoModal(videoUrl) {
    const modal = document.getElementById('videoModal');
    const frame = document.getElementById('videoFrame');
    const localPlayer = document.getElementById('localVideoPlayer');

    const isLocal = videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.endsWith('.ogg');

    if (isLocal) {
        frame.style.display = 'none';
        localPlayer.style.display = 'block';
        localPlayer.src = videoUrl;
        localPlayer.play();
    } else {
        localPlayer.style.display = 'none';
        frame.style.display = 'block';
        frame.src = videoUrl + '?autoplay=1';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal(event) {
    if (event && event.target !== document.getElementById('videoModal')) return;

    const modal = document.getElementById('videoModal');
    const frame = document.getElementById('videoFrame');
    const localPlayer = document.getElementById('localVideoPlayer');

    frame.src = '';
    localPlayer.pause();
    localPlayer.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('videoModal');
        const frame = document.getElementById('videoFrame');
        const localPlayer = document.getElementById('localVideoPlayer');

        frame.src = '';
        localPlayer.pause();
        localPlayer.src = '';
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
