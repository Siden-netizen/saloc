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


// ===== EMAILJS SETUP =====
// Replace these three values with your own from emailjs.com (it's free!)
// Step 1: Sign up at https://www.emailjs.com
// Step 2: Add a service (connect your Gmail) → copy the Service ID
// Step 3: Create an email template → copy the Template ID
//         In the template, use these variables: {{from_name}}, {{from_email}}, {{message}}
// Step 4: Go to Account → copy your Public Key
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'abc123XYZ'
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_xxxxxx'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xxxxxx'

emailjs.init(EMAILJS_PUBLIC_KEY);

// ===== CONTACT FORM =====
function sendMessage() {
    const name    = document.getElementById('senderName').value.trim();
    const email   = document.getElementById('senderEmail').value.trim();
    const message = document.getElementById('messageText').value.trim();

    // Validation
    if (!name) {
        showStatus('Please enter your name.', 'error');
        return;
    }
    if (!email || !isValidEmail(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
    }
    if (!message) {
        showStatus('Please write a message.', 'error');
        return;
    }

    // Disable button & show loading
    const btn        = document.getElementById('submitBtn');
    const btnText    = document.getElementById('btnText');
    const btnLoading = document.getElementById('btnLoading');
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';
    btnText.style.display    = 'none';
    btnLoading.style.display = 'flex';

    const templateParams = {
        from_name:  name,
        from_email: email,
        message:    message
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
            showStatus('✅ Message sent! I\'ll get back to you soon.', 'success');
            document.getElementById('senderName').value  = '';
            document.getElementById('senderEmail').value = '';
            document.getElementById('messageText').value = '';
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            showStatus('❌ Failed to send. Please try again or email me directly.', 'error');
        })
        .finally(() => {
            btn.style.pointerEvents = '';
            btn.style.opacity       = '';
            btnText.style.display    = 'flex';
            btnLoading.style.display = 'none';
        });
}

function showStatus(msg, type) {
    const statusEl = document.getElementById('formStatus');
    statusEl.textContent = msg;
    statusEl.className = 'form-status ' + type;
    setTimeout(() => {
        statusEl.textContent = '';
        statusEl.className = 'form-status';
    }, 6000);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}