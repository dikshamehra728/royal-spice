const bookingButton= document.getElementById("bookingBtn");
const modal=document.querySelector(".modal");
const closeModal=document.querySelector(".class-modal");
const bookingForm= document.querySelector(".booking-form");
bookingForm.addEventListener("submit",function(event) {
    event.preventDefault();
    const name= event.target.elements.name.value.trim()
    ;
    const email=event.target.elements.email.value;
    const date=event.target.elements.date.value;
    const guests=event.target.elements.guests.value;
    if (guests<1 ) {
        alert("Number of guests must be atleast 1.");
        return;
    }
    if(guests>20) {
        alert ("Number of guests cannot be more than 20.");
        return;
    }
    console.log(name);
    console.log(email);
    console.log(date);
    console.log(guests);
    bookingButton.textContent="Booking Started";
    modal.classList.add("show");
});
closeModal.addEventListener("click", function() {
    modal.classList.remove("show");
    bookingButton.textContent="booked";
});
const heading=document.querySelector("#restaurant-name");
console.log(heading);
console.log(heading.textContent);
heading.textContent="Royal Spice";
const button= document.querySelector(".btn");
console.log(button);
button.addEventListener("click",function(event) {
    event.preventDefault();
    heading.textContent="Welcome to our Menu";
});
const themeButton = document.querySelector("#themeButton");
     themeButton.addEventListener("click",function() {
        document.body.classList.toggle("dark");
     });
const menuButton= document.querySelector("#menuButton");
const navLinks=document.querySelector(".nav-links");
     menuButton.addEventListener("click", function() {
        navLinks.classList.toggle("show");
        menuButton.classList.toggle("active");
        const isOpen= navLinks.classList.contains("show");
        menuButton.setAttribute("aria-expanded",isOpen);
    });
const navItems=document.querySelectorAll(".nav-links a");
navItems.forEach(function(item) { 
    item.addEventListener("click",function() {
        navLinks.classList.remove("show");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded","false");
    })
})     
const dropdownBtn= document.querySelector(".dropdown-btn");
dropdownBtn.addEventListener("click", function() { 
   const menu=this.nextElementSibling;
    menu.classList.toggle("show");
});
const faqQuestions=document.querySelectorAll(".faq-question");
faqQuestions.forEach(function(question) {
    question.addEventListener("click", function() {
        const answer= this.nextElementSibling;
        answer.classList.toggle("show");
    });
});
const tabButtons= document.querySelectorAll(".tab-button");
const tabContents=document.querySelectorAll(".tab-content");
tabButtons.forEach(function(button,index) {
    button.addEventListener("click",function() {
        tabButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });
        tabContents.forEach(function(content) {
            content.classList.remove("active");
        });
        button.classList.add("active");
        tabContents[index].classList.add("active");
    });
});
modal.addEventListener("click", function(event) {
    if (event.target===modal) {
        modal.classList.remove("show");
        bookingButton.textContent="Book a table";
    }
});
document.addEventListener("keydown",function(event) {
    if (event.key==="Escape") {
        modal.classList.remove("show");
        bookingButton.textContent=" Book a table";
    }
});