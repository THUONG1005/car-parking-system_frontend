(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Preloader
   */
  const preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = select("#header");
  if (selectHeader) {
    document.addEventListener("scroll", () => {
      window.scrollY > 100 ? selectHeader.classList.add("sticked") : selectHeader.classList.remove("sticked");
    });
  }

  /**
   * Navbar links active state on scroll
   */
  const navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  document.addEventListener("scroll", navbarlinksActive);

  /**
   * Scroll top button
   */
  const backToTop = select(".back-to-top");
  if (backToTop) {
    const togglescrollTop = function () {
      window.scrollY > 100 ? backToTop.classList.add("active") : backToTop.classList.remove("active");
    };
    window.addEventListener("load", togglescrollTop);
    document.addEventListener("scroll", togglescrollTop);
    backToTop.addEventListener(
      "click",
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    );
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = select(".mobile-nav-show");
  const mobileNavHide = select(".mobile-nav-hide");

  select(".mobile-nav-toggle", true).forEach((el) => {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      mobileNavToogle();
    });
  });

  function mobileNavToogle() {
    select("body").classList.toggle("mobile-nav-active");
    mobileNavShow.classList.toggle("d-none");
    mobileNavHide.classList.toggle("d-none");
  }

  /**
   * Initiate Bootstrap validation check
   */
  const needsValidation = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(needsValidation).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  /**
   * Hide mobile nav on same-page/hash links
   */
  select("#navbar a", true).forEach((navbarlink) => {
    if (!navbarlink.hash) return;

    const section = select(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener("click", () => {
      if (select(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper(".slides-1", {
    speed: 500,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /**
   * Get year
   */
  const copyright = select(".copyright");
  if (copyright) {
    copyright.innerHTML = `<p>Copyright &copy; ${new Date().getFullYear()} </script> <strong>Car Parking System</strong>. All Rights Reserved.</p>`;
  }

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();
