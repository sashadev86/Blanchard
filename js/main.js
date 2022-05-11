document.addEventListener("DOMContentLoaded", function () {

  // header-bottom-menu -- start

  const params = {
    btnClassName: "js-header-dropdown-btn",
    dropClassName: "js-header-drop",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`);

      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }

  setMenuListener();

  // header-bottom-menu -- finish

  // slider-hero start

  const swiper = new Swiper('.hero__swiper', {
    allowTouchMove: false,
    loop: true,
    effect: 'fade',
    speed: 8000,
    autoplay: {
      delay: 5000
    }
  });

  // slider-hero finish

  // select start

  const selector = document.querySelector(".choices");

  const choices = new Choices(selector, {
    searchEnabled: false,
    classNames: {
      containerOuter: 'choices header_choices',
    },
    shouldSort: false,
    itemSelectText: '',
  });

  // select finish

  // sliderGallery start

  let gallerySlider = new Swiper(".slides-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".gallery__pagination",
      type: "fraction"
    },

    navigation: {
      nextEl: ".btn-next",
      prevEl: ".btn-prev"
    },

    breakpoints: {
      441: {
        slidesPerView: 2,
        spaceBetween: 30
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });

  // sliderGallery finish

  // modalsGallery start

  const btns = document.querySelectorAll('.gallery__slide');
  const modalOverlay = document.querySelector('.modal-overlay ');
  const modals = document.querySelectorAll('.modal');
  const body = document.body;
  const fixBlocks = document.querySelectorAll('.fix-block');

  let disableScroll = function () {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    let pagePosition = window.scrollY;
    fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    body.style.paddingRight = paddingOffset;
    body.classList.add('disable-scroll');
    // body.dataset.position = pagePosition;
    // body.style.top = -pagePosition + 'px';
  }

  let enableScroll = function () {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    body.style.top = 'auto';
    body.classList.remove('disable-scroll');
    fixBlocks.forEach((el) => {
      el.style.paddingRight = '0px';
    });
    body.style.paddingRight = '0px';
    // window.scroll({top: pagePosition, left: 0});
    // body.removeAttribute('data-position');
  }

  btns.forEach((el) => {
    el.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-path');

      disableScroll();

      modals.forEach((el) => {
        el.classList.remove('modal--visible');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
      modalOverlay.classList.add('modal-overlay--visible');
    });
  });

  modalOverlay.addEventListener('click', (e) => {

    enableScroll();

    if (e.target == modalOverlay) {
      modalOverlay.classList.remove('modal-overlay--visible');
      modals.forEach((el) => {
        el.classList.remove('modal--visible');
      });
    }
  });

  // modalsGallery finish


  // accordion start

  (() => {
    new Accordion(".js-accordion-container", {
      openOnInit: [0]
    });
  })();

  // accordion finish

  // tabs start

  document.querySelectorAll('.tabs-btn').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.tab-content').forEach(function (tabContent) {
        tabContent.classList.remove('tab-content-active');
      });

      document.querySelectorAll('.accordion__painter-btn').forEach(function (btn) {
        btn.classList.remove('tabs-btn-active');
      });
      event.currentTarget.classList.add('tabs-btn-active');

      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
    });
  });

  // tabs finish

  // sliderEvents start

  const eventSwiper = new Swiper('.events__swiper', {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    pagination: {
      el: '.events__swiper-pagination',
      type: 'bullets',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });


  // sliderEvents finish

  // tippy start

  tippy('.tippy-tooltip', {
    content(reference) {
      const id = reference.getAttribute('data-template');
      const template = document.getElementById(id);
      return template.innerHTML;
    },
    allowHTML: true,
    arrow: true,
    delay: [100, 800],
    interactive: true,
    animation: 'rotate',
    theme: 'violet',
  });

  // tippy finish

  // sliderProject start

  const projectSwiper = new Swiper('.project__swiper', {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    loop: true,

    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },

    a11y: {
      paginationBulletMessage: "Перейти на слайд {{index}}",
      slideLabelMessage: "Слайд номер {{index}} из общего количества {{slidesLength}}"
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // sliderProject finish

  // validateContacts start

  new JustValidate('.contacts__form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        }
      }
    },

    colorWrong: '#D11616',

    messages: {
      name: "Как вас зовут?",
      tel: {
        required: "Укажите ваш телефон",
        function: "Не достаточно количество символов"
      }
    }
  });

  // validateContacts finish

  // inputmask start

  var inputTel = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999)-999-99-99");

  im.mask(inputTel);

  // inputmask finish

  // myMap start

  ymaps.ready(init);
  function init() {
    const mapElem = document.querySelector('myMap');
    const myMap = new ymaps.Map(
      "myMap",
      {
        center: [55.760236, 37.614877],
        zoom: 14,
        controls: ['geolocationControl', 'zoomControl']
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "370px", right: "20px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "300px", right: "20px" }
      }
    );

    myMap.behaviors.disable('scrollZoom');

    const myPlacemark = new ymaps.Placemark(
      [55.760236, 37.614877],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "img/contacts/customPoint.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-20, -20],
      }
    );

    myMap.geoObjects.add(myPlacemark);
    myMap.container.fitToViewport();
  }

  // myMap finish

  // smooth scroll start

  /*  Функция для прокрутки с контролем скорости
  /*  --------------------------------------------------------------*/
  function scrollTo(to, duration = 700) {
    const
      element = document.scrollingElement || document.documentElement;
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    const easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t + b;
      }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
    const animateScroll = function () {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10);
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
    animateScroll();
  }

  // const initScrollToAnchor = () => {
  //   const anchorLinks = document.querySelectorAll('.header__nav-link[data-scroll-to]');
  //   if (anchorLinks.length) {
  //     anchorLinks.forEach((link) => {
  //       link.addEventListener('click', (e) => {
  //         const currentBlock = link.getAttribute('href');
  //         const blockTop = document.querySelector(currentBlock).offsetTop;
  //         e.preventDefault();
  //         scrollTo(blockTop, 400);
  //       });
  //     });
  //   }
  // };
  // initScrollToAnchor();


  const initBtnToTop = () => {
    const btnToTop = document.querySelector('.button__to-top');
    if (btnToTop) {
      const scrollHeight = 1500;
      window.addEventListener('scroll', function () {
        // Если прокрутили дальше scrollHeight пикселей от верха вьюпорта, показываем кнопку
        // eslint-disable-next-line no-invalid-this
        if (this.scrollY > scrollHeight) {
          btnToTop.classList.add('button__to-top--is-shown');
          // Иначе прячем
        } else {
          btnToTop.classList.remove('button__to-top--is-shown');
        }
      });
      // При клике прокручиваем на самый верх
      btnToTop.addEventListener('click', (e) => {
        e.preventDefault();
        // Вызываем функцию, первый аргумент - отступ, второй - скорость скролла, чем больше значение, тем медленнее скорость прокрутки
        scrollTo(0, 400);
      });
    }
  };
  initBtnToTop();

  // smooth scroll finish

});
