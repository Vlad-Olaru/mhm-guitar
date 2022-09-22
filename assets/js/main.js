(function () {
  "use strict";

  // ======= Sticky
  window.onscroll = function () {
    const ud_header = document.querySelector(".ud-header");
    const sticky = ud_header.offsetTop;
    const logo = document.querySelector(".header-logo");

    if (window.pageYOffset > sticky) {
      ud_header.classList.add("sticky");
    } else {
      ud_header.classList.remove("sticky");
    }

    // === logo change
    if (ud_header.classList.contains("sticky")) {
      logo.src = "assets/images/logo/logo.png";
    } else {
      logo.src = "assets/images/logo/logo-white.png";
    }

    // show or hide the back-top-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  // ===== responsive navbar
  let navbarToggler = document.querySelector("#navbarToggler");
  const navbarCollapse = document.querySelector("#navbarCollapse");

  navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("navbarTogglerActive");
    navbarCollapse.classList.toggle("hidden");
  });

  //===== close navbar-collapse when a  clicked
  document
    .querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a")
    .forEach((e) =>
      e.addEventListener("click", () => {
        navbarToggler.classList.remove("navbarTogglerActive");
        navbarCollapse.classList.add("hidden");
      })
    );

  // ===== Sub-menu
  const submenuItems = document.querySelectorAll(".submenu-item");
  submenuItems.forEach((el) => {
    el.querySelector("a").addEventListener("click", () => {
      el.querySelector(".submenu").classList.toggle("hidden");
    });
  });

  // ===== Faq accordion
  const faqs = document.querySelectorAll(".single-faq");
  faqs.forEach((el) => {
    el.querySelector(".faq-btn").addEventListener("click", () => {
      el.querySelector(".icon").classList.toggle("rotate-180");
      el.querySelector(".faq-content").classList.toggle("hidden");
    });
  });

  // ===== wow js
  new WOW().init();

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  document.querySelector(".back-to-top").onclick = () => {
    scrollTo(document.documentElement);
  };

  const request = {
    placeId: 'ChIJW6iKWxz_sUARzEOed2aqGQY',
    language: 'ro',
    fields: ['reviews']
  }

  const service = new google.maps.places.PlacesService(document.createElement("div"));
  service.getDetails(request, function(result, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      const reviews = result["reviews"]

      let carouselData = document.getElementById('carousel-data');
      for (let i = 0; i < reviews.length; i++) {
        let review = document.createElement("div");
        if (i === 0) {
          review.setAttribute("class", "duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20");
          review.setAttribute("data-carousel-item", "active");
        } else {
          review.setAttribute("class", "duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20");
          review.setAttribute("data-carousel-item", "");
        }

        let firstDiv = document.createElement("div");
        firstDiv.setAttribute("class", "ud-single-testimonial flex wow fadeInUp p-8 shadow-testimonial");
        firstDiv.setAttribute("style", "height: 100%; flex-direction: column; justify-content: space-between");

        let starDiv = document.createElement("div");
        starDiv.setAttribute("class", "ud-testimonial-ratings mb-3 flex items-center mx-8");
        for (let j = 1; j <= reviews[i]['rating']; j++) {
          let span = document.createElement("span");
          span.setAttribute("class", "mr-1 text-[#fbb040]");
          let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("width", "18");
          svg.setAttribute("height", "16");
          svg.setAttribute("viewBox", "0 0 18 16");
          svg.setAttribute("class", "fill-current");
          let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", "M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z");
          svg.appendChild(path);
          span.appendChild(svg);
          starDiv.appendChild(span);
        }

        let textDiv = document.createElement("div");
        textDiv.setAttribute("class", "ud-testimonial-content");
        let p = document.createElement("p");
        p.setAttribute("class", "text-base tracking-wide text-white mx-8");
        p.setAttribute("style", "display: -webkit-box; -webkit-line-clamp: 8; -webkit-box-orient: vertical; overflow:hidden;");
        p.textContent = reviews[i]['text'];
        textDiv.appendChild(p);

        let photoDiv = document.createElement('div');
        photoDiv.setAttribute("class", "ud-testimonial-info flex items-center mx-8");
        let innerPhotoDiv = document.createElement('div');
        innerPhotoDiv.setAttribute("class", "ud-testimonial-image mr-5 h-[50px] w-[50px] overflow-hidden rounded-full");
        let innerImg = document.createElement('img');
        innerImg.src = reviews[i]['profile_photo_url'];
        innerImg.alt = "author";
        innerPhotoDiv.appendChild(innerImg);
        let authorDiv = document.createElement('div');
        authorDiv.setAttribute("class", "ud-testimonial-meta");
        let author = document.createElement('h4');
        author.setAttribute("class", "text-sm font-semibold");
        author.textContent = reviews[i]['author_name'];
        let timeAgo = document.createElement('p');
        timeAgo.setAttribute("class", "text-xs");
        timeAgo.setAttribute("style", "color: #bcbcbc");
        timeAgo.textContent = reviews[i]['relative_time_description'];
        authorDiv.appendChild(author);
        authorDiv.appendChild(timeAgo);
        photoDiv.appendChild(innerPhotoDiv);
        photoDiv.appendChild(authorDiv);

        firstDiv.appendChild(starDiv);
        firstDiv.appendChild(textDiv);
        firstDiv.appendChild(photoDiv);
        review.appendChild(firstDiv);
        carouselData.appendChild(review);
      }

      let tag = document.createElement("script");
      tag.src = "assets/js/flowbite.js"
      document.getElementsByTagName("head")[0].appendChild(tag);
    }
  });
})();
