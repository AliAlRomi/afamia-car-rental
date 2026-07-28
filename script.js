// ===============================
// ELEMENTS
// ===============================

const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

const navLinks = document.querySelectorAll(".nav-link");

const filterButtons = document.querySelectorAll(".filter-button");
const carCards = document.querySelectorAll(".car-card");

const faqItems = document.querySelectorAll(".faq-item");

const heroBookingForm = document.getElementById("heroBookingForm");
const mainBookingForm = document.getElementById("mainBookingForm");

const customerCar = document.getElementById("customerCar");

const carButtons = document.querySelectorAll(".car-book-button");

const notification = document.getElementById("notification");
const notificationText = document.getElementById("notificationText");

const year = document.getElementById("currentYear");

// ===============================
// YEAR
// ===============================

year.textContent = new Date().getFullYear();

// ===============================
// STICKY HEADER
// ===============================

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

// ===============================
// MOBILE MENU
// ===============================

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    document.body.classList.toggle("menu-open");

});

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

        document.body.classList.remove("menu-open");

    });

});

// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 180;

        if (scrollY >= top) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// ===============================
// FLEET FILTER
// ===============================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        carCards.forEach(card => {

            if (
                filter === "all" ||
                card.dataset.category === filter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});

// ===============================
// FAQ
// ===============================

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

// ===============================
// CAR BUTTONS
// ===============================

carButtons.forEach(button => {

    button.addEventListener("click", () => {

        customerCar.value = button.dataset.car;

        document
            .getElementById("booking")
            .scrollIntoView({

                behavior: "smooth"

            });

        showNotification(
            button.dataset.car +
            " selected."
        );

    });

});

// ===============================
// HERO FORM
// ===============================

heroBookingForm.addEventListener("submit", e => {

    e.preventDefault();

    document
        .getElementById("booking")
        .scrollIntoView({

            behavior: "smooth"

        });

    showNotification(
        "Complete the booking request below."
    );

});

// ===============================
// MAIN BOOKING FORM
// ===============================

mainBookingForm.addEventListener("submit", e => {

    e.preventDefault();

    const name =
        document
        .getElementById("customerName")
        .value;

    const phone =
        document
        .getElementById("customerPhone")
        .value;

    const car =
        customerCar.value;

    const plan =
        document
        .getElementById("rentalPlan")
        .value;

    const pickup =
        document
        .getElementById("mainPickupDate")
        .value;

    const dropoff =
        document
        .getElementById("mainReturnDate")
        .value;

    const message =
        document
        .getElementById("bookingMessage")
        .value;

    const whatsappMessage =

`Hello,

I would like to request a rental.

Name:
${name}

Phone:
${phone}

Vehicle:
${car}

Rental Plan:
${plan}

Pickup:
${pickup}

Return:
${dropoff}

Additional Information:
${message}`;

    const url =

`https://wa.me/971500000000?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(
        url,
        "_blank"
    );

    showNotification(
        "Opening WhatsApp..."
    );

    mainBookingForm.reset();

});

// ===============================
// NOTIFICATION
// ===============================

function showNotification(text){

    notificationText.textContent = text;

    notification.classList.add("show");

    setTimeout(() => {

        notification.classList.remove("show");

    },3000);

}

// ===============================
// FADE ANIMATION
// ===============================

const observer = new IntersectionObserver(

entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";

            entry.target.style.transform =
                "translateY(0)";

        }

    });

},
{
    threshold:.15
}

);

document
.querySelectorAll(

".car-card,.process-card,.branch-card,.policy-item,.about-content,.about-images"

)
.forEach(element=>{

    element.style.opacity="0";

    element.style.transform="translateY(40px)";

    element.style.transition=".7s ease";

    observer.observe(element);

});