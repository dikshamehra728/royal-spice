import { formatPrice } from "./utils.js";
//Whatsapp number for testing (India country code:91)
const WHATSAPP_NUMBER="918837742728";
const bookingButton= document.getElementById("bookingBtn");
const modal=document.querySelector(".modal");
const closeModal=document.querySelector(".class-modal");
const bookingForm= document.querySelector(".booking-form");
const bookingDate=document.getElementById("date");
//prevent booking dates in the past
const today=new Date();
const localToday= new Date(
    today.getTime()-today.getTimezoneOffset()*60000
).toISOString().split("T")[0];
bookingDate.min=localToday;
//day 13- browser storage
const CUSTOMER_KEY="royalSpiceCustomer";
const saveConsent= document.querySelector("#saveConsent");
const saveDetailsButton=document.querySelector("#saveDetails");
console.log("Save button found:", saveDetailsButton);
const skipSavingButton=document.querySelector("#skipSaving");
function saveCustomer (name,email) {
    const customer= {
        name: name,
        email: email
    };
    try {
        localStorage.setItem(
            CUSTOMER_KEY,
            JSON.stringify(customer)
        );
    } catch (error) {
        console.error("Unable to save customer details:", error);
    }
}
function getSavedCustomer() {
    try {
        const savedCustomer= localStorage.getItem(CUSTOMER_KEY);
        if(!savedCustomer) {
            return null;
        }
        return JSON.parse(savedCustomer);
    } catch (error) {
        console.error("Unable to retrieve customer details:", error);
            return null;
    }
}
const savedCustomer= getSavedCustomer();
    if (savedCustomer) {
        const nameInput= document.querySelector('[name="name"]');
        const emailInput= document.querySelector('[name="email"]');
        if (nameInput) {
           nameInput.value= savedCustomer.name || "";
        }
        if (emailInput) {
            emailInput.value= savedCustomer.email || "";
        }
}
function sendBookingToWhatsapp(booking) {
    const orderLines = cart.length
    ? cart.map(item =>
        `• ${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`
    )
    : ["• No dishes selected"];

const orderTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
);
    const message = [
    "*ROYAL SPICE | TABLE RESERVATION*",
    "",
    "Hello Royal Spice Team!",
    "I'd like to request a table reservation.",
    "",
    "*GUEST DETAILS*",
    `• Name: ${booking.name}`,
    `• Email: ${booking.email}`,
    "",
    "*RESERVATION DETAILS*",
    `• Date: ${booking.date}`,
    `• Guests: ${booking.guests}`,
    "",
    "*ORDER SUMMARY*",
    ...orderLines,
    "",
    `*Order Total: ${formatPrice(orderTotal)}*`,
    "",
    "Please confirm table availability and the order details.",
    "",
    "Thank you!"
].join("\n");
    const whatsappURL=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL,"_blank", "noopener,noreferrer");
}
let pendingBooking=null;
bookingForm.addEventListener("submit",function(event) {
    event.preventDefault();
    const name= event.target.elements.name.value.trim();
    const email= event.target.elements.email.value.trim();
    const date= event.target.elements.date.value;
    const guests= Number(event.target.elements.guests.value);
    if (guests<1 || guests>20 ){ 
        alert ("Number of guests must be between 1 and 20.");
        return;
    }
    pendingBooking ={
        name: name,
        email: email,
        date: date,
        guests: guests
    };
    saveConsent.hidden =false
});
// Save customer details only with permission
saveDetailsButton.addEventListener("click", 
    function() {
        if (!pendingBooking) return;
        saveCustomer(pendingBooking.name, pendingBooking.email);
        saveConsent.hidden=true;
        sendBookingToWhatsapp(pendingBooking);
        pendingBooking=null;
    });
// continue without saving customer details 
skipSavingButton.addEventListener("click",
    function() {
       if(!pendingBooking) return;
       saveConsent.hidden=true;
       sendBookingToWhatsapp(pendingBooking);
       pendingBooking=null;
    });
closeModal.addEventListener("click", function() {
    modal.classList.remove("show");
    bookingButton.textContent="booked";
});
const heading=document.querySelector("#restaurant-name");
console.log(heading);
console.log(heading.textContent);
heading.textContent="Royal Spice";
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
const faqQuestions=document.querySelectorAll(".Faq-question");
faqQuestions.forEach(function(question) {
    question.addEventListener("click", function() {
        const answer= this.nextElementSibling;
        if( answer && answer.classList.contains("Faq-answer")) {
            answer.classList.toggle("show");
        }
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
//===============================================
// DAY 11 -MODERN JAVASCRIPT
//===============================================
function showMessage(name) {
    console.log (`Welcome to ${name}!`);
}
setTimeout(() => {
    showMessage("Royal Spice");
},2000);    
const testButton =document.querySelector("#themeButton");
testButton.addEventListener("click", (event) => {
    console.log(`you clicked: ${event.target.id}`);
});
const menuItems= [
    {
        name: "Paneer Tikka",
        price:320,
        description: "Char-grilled cottagecheese with aromatic spices and mint.",
        image: "images/Paneer-Tikka.jpg"
    },
    {
        name:"Hara Bhara Kebab",
        price: 240,
        description:" Crispy spinach and green pea kebabs with aromatic Indian spices.",
        image: "images/hara-bhara-kebab.jpg"
    },
    {
        name:"Tandoori Mushroom Tikka",
        price:280,
        description:"Tandoor-roasted mushrooms marinated in creamy yoghurt and Indian spices.",
        image: "images/tandoori-mushroom-tikka.jpg"
    },
    {
        name:"Malai Tikka",
        price:320,
        description: " Tender cottage cheese marinated with creamy spices and herbs.",
        image: "images/Malai-tikka.jpg"
    }
];
const mainCourseItems= [
    {
        name:"Paneer Butter Masala",
        price: 280,
        description: "Silken paneer in a rich tomato, butter and cream sauce.",
        image: "images/paneer-butter-masala.jpg"
    },
    {
        name:"Dal Makhani",
        price: 220,
        description: "Slow cooked black lentils finished with butter and cream.",
        image:"images/dal-makhani.jpg"
    },
    {
        name:"Vegetable Biryani",
        price:240,
        description: "Fragrant basmati rice layered with seasonal vegetables and spices.",
        image: "images/vegetable-biryani.jpg"
    },
    {
        name:"Garlic Naan",
        price:80,
        description: "Soft naan bread topped with garlic.",
        image: "images/garlic-naan.jpg"
    }
];
const dessertItems= [
    {
        name: "Gulab Jamun",
        price: 120,
        description: " Soft milk dumplings served warm in fragrant syrup.",
        image: "images/gulab-jamun.jpg"
    },
    {
        name: "Rasmalai",
        price: 150,
        description: "Soft cheese dumplings served in sweetened milk .",
        image: "images/Rasmalai.jpg"
    },
    {
        name: "Kesar Kulfi",
        price: 140,
        description: "Creamy frozen dessert flavoured with saffron.",
        image: "images/kesar-kulfi.jpg"
    },
    {
        name: "Chocolate Brownie",
        price: 180,
        description: "Rich chocolate brownie.",
        image: "images/chocolate-brownie.jpg"
    }
];

function renderDish(item,list) {
    const li=document.createElement("li");
    li.dataset.dish=item.name;
    li.classList.add("dish-card");
    const image= document.createElement("img");
    image.src=item.image;
    image.alt=item.name;
    image.classList.add("dish-image");
    image.loading="lazy";
    li.appendChild(image);
    const dishInfo= document.createElement("div");
    dishInfo.classList.add("dish-info");
    const dishName=document.createElement("span");
    dishName.textContent=item.name;
    dishInfo.appendChild (dishName);
    const description = document.createElement("p");
    description.textContent=item.description;
    dishInfo.appendChild(description);
    const price= document.createElement("strong");
    price.textContent= formatPrice(item.price);
    li.appendChild(dishInfo);
    li.appendChild(price);
    list.append(li);
}
const startersMenu= document.querySelector("#startersMenu");
const mainCourseMenu= document.querySelector("#mainCourseMenu");
const dessertsMenu= document.querySelector("#dessertsMenu");
function renderMenu(items,container){
    const list= document.createElement("ul");
    items.forEach(item=> {
        renderDish (item,list);
    });
    container.replaceChildren(list);
}
renderMenu(menuItems, startersMenu);
renderMenu(mainCourseItems, mainCourseMenu);
renderMenu(dessertItems,dessertsMenu);
// Shopping cart
// ========================================
// ROYAL SPICE — SLIDE-OUT SHOPPING CART
// ========================================

const cart = [];

const cartToggle = document.querySelector("#cart-toggle");
const cartDrawer = document.querySelector("#cart-drawer");
const cartBackdrop = document.querySelector("#cart-backdrop");
const cartClose = document.querySelector("#cart-close");
const cartItemsContainer = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const cartContinue = document.querySelector("#cart-continue");
const bookingSection= document.querySelector("#booking");
const cartKeepBrowsing = document.querySelector("#cart-keep-browsing");
cartContinue.addEventListener("click", () => {
    closeCart();

    if (bookingSection) {
        bookingSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

function openCart() {
    cartDrawer.classList.add("is-open");
    cartBackdrop.hidden = false;
    cartDrawer.setAttribute("aria-hidden", "false");
    cartDrawer.removeAttribute("inert");
    cartToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    cartClose.focus();
}

function closeCart() {
    cartDrawer.classList.remove("is-open");
    cartBackdrop.hidden = true;
    cartDrawer.setAttribute("aria-hidden", "true");
    cartDrawer.setAttribute("inert", "");
    cartToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    cartToggle.focus();
}

function showSelectedDish(dishName) {
    const allMenuItems = [
        ...menuItems,
        ...mainCourseItems,
        ...dessertItems
    ];

    const selectedDish = allMenuItems.find(
        item => item.name === dishName
    );

    if (!selectedDish) return;

    const existingItem = cart.find(
        item => item.name === selectedDish.name
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: selectedDish.name,
            price: selectedDish.price,
            quantity: 1
        });
    }

    renderCart();
}

function renderCart() {
    cartItemsContainer.replaceChildren();

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = formatPrice(totalPrice);

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "cart-empty";
        emptyMessage.textContent =
            "Your order is waiting to be created.";
        cartItemsContainer.appendChild(emptyMessage);
        return;
    }

    cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "cart-item";

        const details = document.createElement("div");
        details.className = "cart-item-details";

        const name = document.createElement("h3");
        name.className = "cart-item-name";
        name.textContent = item.name;

        const price = document.createElement("p");
        price.className = "cart-item-price";
        price.textContent = formatPrice(item.price);

        details.append(name, price);

        const quantityControls = document.createElement("div");
        quantityControls.className = "cart-quantity-controls";

        const decreaseButton = document.createElement("button");
        decreaseButton.type = "button";
        decreaseButton.textContent = "−";
        decreaseButton.setAttribute(
            "aria-label",
            `Remove one ${item.name}`
        );
        decreaseButton.addEventListener("click", () => {
            changeQuantity(item.name, -1);
        });

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;
        quantity.setAttribute("aria-label", "Quantity");

        const increaseButton = document.createElement("button");
        increaseButton.type = "button";
        increaseButton.textContent = "+";
        increaseButton.setAttribute(
            "aria-label",
            `Add one ${item.name}`
        );
        increaseButton.addEventListener("click", () => {
            changeQuantity(item.name, 1);
        });

        quantityControls.append(
            decreaseButton,
            quantity,
            increaseButton
        );

        const lineTotal = document.createElement("strong");
        lineTotal.className = "cart-item-total";
        lineTotal.textContent = formatPrice(
            item.price * item.quantity
        );

        row.append(details, quantityControls, lineTotal);
        cartItemsContainer.appendChild(row);
    });
}

function changeQuantity(dishName, change) {
    const item = cart.find(
        entry => entry.name === dishName
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
    }

    renderCart();
}

// Open and close the drawer.
cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);
cartKeepBrowsing.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        cartDrawer.classList.contains("is-open")
    ) {
        closeCart();
    }
});

// Add dishes using event delegation.
document.querySelector("#menu").addEventListener("click", event => {
    const dishItem = event.target.closest("li[data-dish]");

    if (!dishItem) return;

    showSelectedDish(dishItem.dataset.dish);
});

// Initial cart display.
renderCart();