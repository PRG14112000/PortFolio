 // Function to set the theme and update UI
 function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    var switchThemeBtn = document.getElementById('switchTheme');
    if (switchThemeBtn) {
        switchThemeBtn.innerHTML = theme === 'dark' ?  '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    }
    //console.log(`Switched to ${theme} theme`);
}

var currentTheme = localStorage.getItem('theme') || 'dark';
setTheme(currentTheme);

// Event listener for the switch theme button
var switchThemeBtn = document.getElementById('switchTheme');
if (switchThemeBtn) {
    switchThemeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });
}

//AOS Initiliaze
AOS.init();

// Fixed Header & back to top button on Scroll
window.addEventListener('scroll', () => {
    // fixed header
    const header = document.getElementById('header');
    if (window.scrollY > 30 && !header.classList.contains('fixed-top')) {
        header.classList.add('fixed-top');
        document.getElementById('offcanvasNavbar').classList.add('fixedHeaderNavbar');
    } else if (window.scrollY <= 30 && header.classList.contains('fixed-top')) {
        header.classList.remove('fixed-top');
        document.getElementById('offcanvasNavbar').classList.remove('fixedHeaderNavbar');
    }

    //backtotop
    const backToTopButton = document.getElementById("backToTopButton");
    if (window.scrollY > 400 && backToTopButton.style.display === 'none') {
        backToTopButton.style.display = 'block';
    } else if (window.scrollY <= 400 && backToTopButton.style.display === 'block') {
        backToTopButton.style.display = 'none';
    }
});


//jumping to top function
function scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//Testimonial Slider
const TESTIMONIALS_URL = "https://script.google.com/macros/s/AKfycbwz0OUXn9BVtuljEnBYNHK1dbkwP1q1IKAXZa5PfoGb_lkZiB0YKbd2MhRMIiE6aSlJ/exec";

  // Emoji fallback list
  const emojiAvatars = ["😀","🧑","😎","👨‍💼","👩‍💼","🧑","👩‍💻","🧑","👨‍🏫","😊","😎"];

  // 👇 Get a shuffled copy of emojis (to ensure unique emojis per load)
function getShuffledEmojis(count) {
  const shuffled = [...emojiAvatars].sort(() => Math.random() - 0.5);
  // If there are more testimonials than emojis, loop over emojis again
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}


  function getRandomEmoji() {
    return emojiAvatars[Math.floor(Math.random() * emojiAvatars.length)];
  }

  async function loadTestimonials() {
    try {
      const res = await fetch(TESTIMONIALS_URL);
      const testimonials = await res.json();

      const slider = document.getElementById('testimonial-slider');
      slider.innerHTML = ""; // Reset

     testimonials.forEach(t => {
      // 🧠 Emoji avatar only
      const avatar = `<div class="emoji-avatar">${getRandomEmoji()}</div>`;
  

  // 🔗 LinkedIn link or plain name
  const nameHTML = t.linkedin
    ? `
      <a href="${t.linkedin}" target="_blank" class="linkedin-link d-flex align-items-center gap-1 justify-content-center">
        ${t.name}
        <i class="bi bi-linkedin linkedin-icon"></i>
      </a>
    `
    : `<span class="plain-name">${t.name}</span>`;

  const card = document.createElement("div");
  card.classList.add("testimonial");

  card.innerHTML = `
    <p class="description">${t.message}</p>
    <div class="pic">${avatar}</div>
    <div class="detail">
      <h4 class="name">${nameHTML}</h4>
      <small class="role">${t.role || ""}</small>
    </div>
  `;

  slider.appendChild(card);
});


      // 🦉 Reinitialize Owl Carousel
      $('#testimonial-slider').trigger('destroy.owl.carousel');
      $('#testimonial-slider').owlCarousel({
        items: 3,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          1170: { items: 3 }
        }
      });
    } catch (err) {
      console.error("❌ Failed to load testimonials:", err);
    }
  }

  // 🚀 Auto load & refresh every 5 minutes
  loadTestimonials();
  setInterval(loadTestimonials, 5 * 60 * 1000);
