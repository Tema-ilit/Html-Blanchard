document.addEventListener('DOMContentLoaded', function () {

  const heroContent = document.querySelector(".hero__content")
  const heroSwiper = new Swiper('.hero__slider', {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 2000,
    autoplay: {
      delay: 2000
    },
    effect: "fade",
    allowTouchMove: false,
    // navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev"
    // },
    // pagination: {
    //     el: '.swiper-bullet-pagination',
    //     type: 'bullets',
    //     clickable: true
    // }

  })

  // dropmenu

  const params = {
    btnClassName: "js-dropdown-btn",
    dropClassName: "js-header-drop",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  };

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(
        params.disabledClassName,
        params.activeClassName
      );
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(
        `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
      );

      if (
        activeElements.length &&
        !evt.target.closest(`.${params.activeClassName}`)
      ) {
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
        const drop = document.querySelector(
          `.${params.dropClassName}[data-target="${path}"]`
        );

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

  // select

  const selectGallery = document.querySelector('.gallery-select');
  const choicesSelect = new Choices(selectGallery, {
    searchEnabled: false,

  });

  // галерея слайдер

  const gallerySwiper = new Swiper('.gallery-swipper-container', {
    slidesPerView: 3,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 50,
    pagination: {
      el: ".gallery .gallery-pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".gallery-next",
      prevEl: ".gallery-prev"
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15
      },

      1024: {
        slidesPerView: 2,
        spaceBetween: 34
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
    },
  })

  // аккардеон и табы каталог

  new Accordion('.js-accordion-container', {
    openOnInit: [0]
  });

  const param = {
    tabsClass: "js-tab-btn",
    wrap: "js-tabs-wrap",
    content: "js-tab-content",
    active: "active"
  };

  function setTabs(param) {
    const tabBtns = document.querySelectorAll(`.${param.tabsClass}`);

    function onTabClick(e) {
      e.preventDefault();
      const path = this.dataset.path;
      const wrap = this.closest(`.${param.wrap}`);
      const currentContent = wrap.querySelector(`.${param.content}[data-target="${path}"]`);
      const contents = wrap.querySelectorAll(`.${param.content}`);

      contents.forEach((el) => {
        el.classList.remove(param.active);
      });

      currentContent.classList.add(param.active);

      tabBtns.forEach((el) => {
        el.classList.remove(param.active);
      });

      this.classList.add(param.active);
    }

    tabBtns.forEach(function (el) {
      el.addEventListener("click", onTabClick);
    });
  }

  setTabs(param);


  // события

  const eventSwiper = new Swiper('.event__swipper', {
    slidesPerView: 3,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 50,
    pagination: {
      el: ".event-slider-pag",
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: ".event-slider-btn-next",
      prevEl: ".event-slider-btn-prev"
    },
    breakpoints: {
      100: {
        slidesPerView: 1,
        spaceBetween: 18
      },
      
      320: {
        slidesPerView: 1,
        spaceBetween: 15
      },

      768: {
        slidesPerView: 2,
        spaceBetween: 34
      },

      900: {
        slidesPerView: 3,
        spaceBetween: 34
      },

      1024: {
        slidesPerView: 3,
        spaceBetween: 27
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
  });

  // project 

  tippy('[data-tippy-content]', {
    duration: 600,
    arrow: true,
    delay: [300, 300],
    trigger: 'click',
  });

  const parentsSwiper = new Swiper('.parents-swipper', {
    slidesPerView: 3,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 50,
    // pagination: {
    //   el: ".gallery .gallery-pagination",
    //   type: "fraction"
    // },
    navigation: {
      nextEl: ".parents-swipper-next",
      prevEl: ".parents-swipper-prev"
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 33
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 50
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
  });

  // showroom 

  var selectorTel = document.getElementById("input-tel");

  var showTel = new Inputmask("+7 (999) 999-99-99");
  showTel.mask(selectorTel);


  const validation = new window.JustValidate('#form');

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите ваше имя',
      },
      {
        rule: 'customRegexp',
        value: /^[a-zA-Zа-яА-ЯЁё ]+$/,
        errorMessage: 'Недопустимый формат ',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Слишком короткое имя',
      },
      {
        rule: 'maxLength',
        value: 15,
        errorMessage: 'Слишком большое имя',
      },
    ],
      {
        errorLabelStyle: {
          color: '#D11616',
          textDecoration: 'underlined',
        },
      })
    .addField('#input-tel', [
      {
        rule: 'required',
        errorMessage: 'Введите телефон',
      },
    ])

  // map

  ymaps.ready(init);
  function init() {
    const mapElem = document.querySelector("#map");
    const myMap = new ymaps.Map(
      "map",
      {
        center: [55.75846806898367, 37.60108849999989],
        zoom: 14,
        controls: ["geolocationControl", "zoomControl"]
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "300px", right: "20px" },
        geolocationControlFloat: "none",
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "200px", right: "20px" }
      }
    );

    if (window.matchMedia("(max-width: 1280px)").matches) {
      if (Object.keys(myMap.controls._controlKeys).length) {
        myMap.controls.remove('zoomControl');
        myMap.controls.remove('geolocationControl');
      }
    }

    myMap.behaviors.disable("scrollZoom");

    myMap.events.add("sizechange", function (e) {
      if (window.matchMedia("(max-width: 1280px)").matches) {
        if (Object.keys(myMap.controls._controlKeys).length) {
          myMap.controls.remove('zoomControl');
          myMap.controls.remove('geolocationControl');
        }
      } else {
        if (!Object.keys(myMap.controls._controlKeys).length) {
          myMap.controls.add('zoomControl');
          myMap.controls.add('geolocationControl');
        }
      }
    });

    const myPlacemark = new ymaps.Placemark(
      [55.75846806898367, 37.60108849999989],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "../img/метка.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-20, -20]
      }
    );

    myMap.geoObjects.add(myPlacemark);
    myMap.container.fitToViewport();
  }

  // burger

  function setBurger(params) {
    const btn = document.querySelector(`.${params.btnClass}`);
    const menu = document.querySelector(`.${params.menuClass}`);

    btn.setAttribute('aria-expanded', false);

    menu.addEventListener("animationend", function () {
      if (this.classList.contains(params.hiddenClass)) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
      }
    });

    btn.addEventListener("click", function () {
      this.classList.toggle(params.activeClass);

      if (
        !menu.classList.contains(params.activeClass) &&
        !menu.classList.contains(params.hiddenClass)
      ) {
        menu.classList.add(params.activeClass);
        document.body.style.overflow = 'hidden';
        btn.setAttribute('aria-expanded', true);
      } else {
        menu.classList.add(params.hiddenClass);
        document.body.removeAttribute('style');
        btn.setAttribute('aria-expanded', false);
      }
    });
  }

  setBurger({
    btnClass: "burger", // класс бургера
    menuClass: "menu-wrap", // класс меню
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
  });

  // form-header

  function setSearch(params) {
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    const search = document.querySelector(`.${params.searchClass}`);
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

    search.addEventListener("animationend", function (evt) {
      if (this._isOpened) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        this._isOpened = false;
      } else {
        this._isOpened = true;
      }
    });

    search.addEventListener('click', function (evt) {
      evt._isSearch = true;
    });

    openBtn.addEventListener("click", function (evt) {
      this.disabled = true;

      if (
        !search.classList.contains(params.activeClass) &&
        !search.classList.contains(params.hiddenClass)
      ) {
        search.classList.add(params.activeClass);
      }
    });

    closeBtn.addEventListener('click', function () {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    });

    document.body.addEventListener('click', function (evt) {
      if (!evt._isSearch && search._isOpened) {
        openBtn.disabled = false;
        search.classList.add(params.hiddenClass);
      }
    });
  }

  setSearch({
    openBtnClass: "js-open-search", // класс кнопки открытия
    closeBtnClass: "js-close-header", // класс кнопки закрытия
    searchClass: "js-form-header", // класс формы поиска
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
  });



});