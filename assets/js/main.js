// QUERY SELECTOR SNIPPET
const select = (selector, scope = document) => {
  return scope.querySelector(selector);
};
const selectAll = (selector, scope = document) => {
  return scope.querySelectorAll(selector);
};

// REVEALING ON SCROLL
const the_animation = selectAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
      // else {
      //     entry.target.classList.remove('active')
      // }
    });
  },
  { threshold: 0.3 }
);

for (let i = 0; i < the_animation.length; i++) {
  const elements = the_animation[i];

  observer.observe(elements);
}

// CALCULATOR
const revenueInput = select("#revenueInput");
const earnResult = select("#earnResult");
const weeksInput = select("#weeksInput");
const rangeProgressLine = select(".range-progress-line");
const sliderThumb = select(".slider-thumb");
const minDepNotification = select(".investment-part .notification");
let minDeposit = 250;
let depositStep = 10;

const calculateResult = () => {
  if (revenueInput.value < minDeposit) {
    minDepNotification.classList.add("active");
    setTimeout(() => {
      minDepNotification.classList.remove("active");
    }, 1800);
    return false;
  } else {
    earnResult.innerText = Math.ceil(
      +revenueInput.value + 0.25 * (revenueInput.value * weeksInput.value)
    );

    const sliderMaxValue = weeksInput.getAttribute("max");
    const sliderCurrentValue = (weeksInput.value / sliderMaxValue) * 100 + "%";

    rangeProgressLine.style.width = sliderCurrentValue;
    sliderThumb.style.left = sliderCurrentValue;
  }
};

calculateResult();

revenueInput.addEventListener("input", () => {
  calculateResult();
});

weeksInput.addEventListener("input", () => {
  calculateResult();
});

select(".btn-up").addEventListener("click", () => {
  revenueInput.value = +revenueInput.value + depositStep;
  calculateResult();
});

select(".btn-down").addEventListener("click", () => {
  if (revenueInput.value > minDeposit) {
    revenueInput.value = +revenueInput.value - depositStep;
    calculateResult();
  } else {
    minDepNotification.classList.add("active");
    setTimeout(() => {
      minDepNotification.classList.remove("active");
    }, 1800);
    return false;
  }
});

// MODAL
const modalCall = selectAll(".modal-call");
const modalClose = select(".close-icon");
const modal = select(".modal");
const modalContent = select(".modal-content");

function openModal() {
  modal.classList.add("active");
}

function closeModal() {
  if (modal.classList.contains("active")) {
    modal.classList.remove("active");
  }
}

modalCall.forEach((el) => el.addEventListener("click", openModal));

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", closeModal);

modalContent.addEventListener("click", (e) => e.stopPropagation());

// NAVIGATION
const scrollToElem = (elem) => {
  select(elem).scrollIntoView({ behavior: "smooth" });
};

// YEAR
selectAll(".year").forEach((el) => {
  el.innerText = new Date().getFullYear();
});

// MOBILE MENU
let menuUnderlay = select(".nav-underlay");
let menuOpenImg = select(".menu-btn-img");
let menuCloseImg = select(".menu-close-img");
let menuMobile = select(".mob-menu");

const menuOpening = () => {
  menuMobile.style.right = "0";
  menuUnderlay.classList.add("active");
};

const menuClosing = () => {
  menuMobile.style.right = "-100%";
  menuUnderlay.classList.remove("active");
};

menuOpenImg.addEventListener("click", () => {
  menuOpening();
});
menuCloseImg.addEventListener("click", () => {
  menuClosing();
});
menuUnderlay.addEventListener("click", () => {
  menuClosing();
});

// FORM SUBMIT
const formEl = document.querySelectorAll("form");

formEl.forEach((form) => {
  let nameValue = form.querySelector(".name");
  let lastnameValue = form.querySelector(".lastname");
  let emailValue = form.querySelector(".email");
  let phoneValue = form.querySelector(".phone");
  let requiredFields = form.querySelectorAll(".required-fields");

  const formReset = () => {
    nameValue.value = "";
    lastnameValue.value = "";
    emailValue.value = "";
    phoneValue.value = "";
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (
      nameValue.value != "" &&
      lastnameValue.value != "" &&
      emailValue.value != "" &&
      phoneValue.value != ""
    ) {
      window.location.href = "thankyou.html";
      formReset();
    } else {
      requiredFields.forEach((e) => {
        e.classList.add("visible");
      });
    }
  });

  const inputFields = form.querySelectorAll(".name, .lastname, .email, .phone");
  for (let inputItem of inputFields) {
    inputItem.addEventListener("focus", function () {
      requiredFields.forEach((e) => {
        if (e.classList.contains("visible")) {
          e.classList.remove("visible");
        }
      });
    });
  }
});
