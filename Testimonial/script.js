const modal = document.getElementById("reviewModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".closeBtn");
const form = document.getElementById("reviewForm");
const nameInput = document.getElementById("nameInput");
const imgInput = document.getElementById("imgInput");
const ratingInput = document.getElementById("ratingInput");
const reviewInput = document.getElementById("reviewInput");
const testimonialsContainer = document.getElementById("testimonialsContainer");
const stars = document.querySelectorAll(".star-input span");

// Modal
openBtn.onclick = () => modal.style.display = "flex";
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
};

// Star selection
stars.forEach(star => {
    star.onclick = () => {
        ratingInput.value = star.dataset.val;
        stars.forEach(s => s.classList.remove("active"));
        for (let i = 0; i < star.dataset.val; i++) {
            stars[i].classList.add("active");
        }
    };
});

// Handle submit
form.onsubmit = (e) => {
    e.preventDefault();
    const testimonial = {
        name: nameInput.value,
        img: imgInput.value,
        rating: "⭐".repeat(+ratingInput.value),
        text: reviewInput.value
    };
    saveTestimonial(testimonial);
    renderTestimonials();
    form.reset();
    stars.forEach(s => s.classList.remove("active"));
    modal.style.display = "none";
};

// Save to localStorage
function saveTestimonial(t) {
    let testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
    testimonials.push(t);
    localStorage.setItem("testimonials", JSON.stringify(testimonials));
}

// Render testimonials
function renderTestimonials() {
    let testimonials = JSON.parse(localStorage.getItem("testimonials")) || getDefaultTestimonials();
    testimonialsContainer.innerHTML = "";
    testimonials.forEach(t => {
        testimonialsContainer.innerHTML += `
            <div class="testimonial-card">
                <img src="${t.img}" alt="${t.name}">
                <h3>${t.name}</h3>
                <p class="stars">${t.rating}</p>
                <p>"${t.text}"</p>
            </div>`;
    });
}

// Provide some initial testimonials
function getDefaultTestimonials() {
    return [
        {
            name: "Jane Doe",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: "⭐⭐⭐⭐⭐",
            text: "I purchased the eco-friendly yoga mat and it's amazing! Super comfy and durable."
        },
        {
            name: "John Smith",
            img: "https://randomuser.me/api/portraits/men/35.jpg",
            rating: "⭐⭐⭐⭐",
            text: "The wireless headphones exceeded my expectations. Great sound and battery life."
        },
        {
            name: "Emily White",
            img: "https://randomuser.me/api/portraits/women/65.jpg",
            rating: "⭐⭐⭐⭐⭐",
            text: "Love the handmade ceramic mugs I ordered. They brighten up my kitchen!"
        },
        {
            name: "Mike Johnson",
            img: "https://randomuser.me/api/portraits/men/72.jpg",
            rating: "⭐⭐⭐⭐⭐",
            text: "Fast shipping and fantastic quality on my leather wallet. Highly recommend."
        }
    ];
}

// Initialize
renderTestimonials();
