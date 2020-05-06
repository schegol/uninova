$(document).ready(function() {
  //один большой пункт раскрытого основного меню (1 уровня), включающий подпункты:
  const submenu = $('.header__submenu');
  //подпункты (2 уровня) основного меню, у которых есть дети 3 уровня:
  const submenuParent = $('.header__submenu-item--parent');
  //блок, включающий пункты осн. меню 2 и 3 уровня:
  const submenuList = $('.header__submenu-list');
  //весь скрывающийся блок меню:
  const menu = $('.header__submenu-block');
  //мобильный переключатель основного меню (кнопка):
  const mobileMenuToggle = $('.header__menu-toggle');
  //блок, включающий пункты осн. меню 3 уровня:
  const subsubmenuList = $('.header__subsubmenu-list');
  //кнопка открывания подменю основного меню 3 уровня ("плюсик"):
  const subsubmenuToggle = $('.header__subsubmenu-toggle');
  //main (основная часть сайта, без футера и хедера):
  const main = $('main.main');
  //та часть хедера, которая видна всегда, независимо от того, раскрыто ли основное меню:
  const topHeader = $('.header__visible-part');
  //десктопные переключатели главного меню, соответствующие названиям пунктов 1 уровня меню:
  const desktopMenuToggle = $('.header__menu-link');
  //кнопка замены баннера на форму записи на странице контактов:
  const servicesFormSwitch = $('.banner-zone--services .banner-zone__btn');
  //баннер на странице контактов:
  const servicesBanner = $('.banner-zone--services .banner-zone__img-container');
  //форма на странице контактов:
  const servicesForm = $('.banner-zone--services .banner-zone__form');
  //Кнопка "Подробнее" на странице "О нас", открывающая скрытую информацию о компании:
  const aboutHiddenInfoToggle = $('.banner-zone--about .banner-zone__btn');
  //Скрытая информация о компании на странице "О нас":
  const aboutHiddenInfo = $('#hiddenContentAbout');
  //ссылки на скрытые разделы на странице "Лицензии и документы":
  const documentsHiddenInfoToggles = $('.banner-zone--about-documents .banner-zone__menu-link');
  //Скрытые разделы на странице "Лицензии и документы":
  const documentsHiddenInfo = $('.hidden-content--documents');
  //ссылки на скрытые разделы на странице "Открытые исследования":
  const researchesHiddenInfoToggles = $('.banner-zone--open-researches .banner-zone__menu-link');
  //Скрытые разделы на странице "Открытые исследования":
  const researchesHiddenInfo = $('.hidden-content--researches');
  //Радио-переключатели, предназначенные для открытия свернутого контента:
  const chapterModeSwitches = $('.mode-switches--chapters input[type=radio]');

  //размеры видимого хедера и блока раскрытого основного меню
  var headerHeight = topHeader.outerHeight();
  var openMenuHeight = menu.outerHeight();

  //функция для обновления значений высоты переменных выше
  var refreshHeights = function () {
    headerHeight = topHeader.outerHeight();
    openMenuHeight = menu.outerHeight();
  };

  //поиск и присваивание соотв. класса спискам в меню, у которых есть пункты-родители
  submenu.each(function () {
    if ($(this).find(submenuParent).length !== 0) {
      $(this).addClass('has-parents');
    };
  });

  //открытие-закрытие мобильного меню
  mobileMenuToggle.click(function() {
    refreshHeights();

    mobileMenuToggle.toggleClass('header__menu-toggle--open');
    menu.toggleClass('header__submenu-block--open');

    if (menu.hasClass('header__submenu-block--open')) {
      main.css('padding-top', openMenuHeight);
      menu.css('top', headerHeight);
    } else {
      main.css('padding-top', '0');
      menu.css('top', -openMenuHeight);
    };
  });

  //сброс положений, относящихся к открытому меню после загрузки
  main.css('padding-top', '0');
  menu.css('top', -openMenuHeight);

  //раскрытие основного меню на десктопе по нажатию на один из пунктов 1 уровня
  desktopMenuToggle.each(function () {
    $(this).click(function (e) {
      e.preventDefault();

      var fullClassName = $(this).attr('class');
      // находим ту часть названия класса в переключателе, которая совпадает с соответствующей частью класса нужного блока в меню
      var specificClassName = fullClassName.match(/--([^ ]*)/)[1];
      // выбираем нужный блок меню
      var specificSubmenuItem = $('div[class*='+specificClassName+']');

      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        submenu.removeClass('header__submenu--open');
        menu.removeClass('header__submenu-block--open');
        refreshHeights();
        menu.css('top', -openMenuHeight);
        main.css('padding-top', '0');
      } else {
        submenu.removeClass('header__submenu--open');
        specificSubmenuItem.addClass('header__submenu--open');
        desktopMenuToggle.removeClass('active');
        $(this).addClass('active');
        menu.addClass('header__submenu-block--open');
        refreshHeights();
        menu.css('top', headerHeight);
        main.css('padding-top', openMenuHeight);
      };
    });
  });

  //скрываем
  if ($(window).width() < 767) {
    subsubmenuList.hide().addClass('header__subsubmenu-list--hidden');
  };

  subsubmenuToggle.each(function () {
    $(this).click(function (e) {
      e.preventDefault();
      $(this).toggleClass('header__subsubmenu-toggle--open');
      $(this).parents('.header__submenu-item--parent').children('.header__subsubmenu-list').toggleClass('header__subsubmenu-list--hidden').slideToggle(500);
    });
  });

  //модалки:
  const modalOverlay = $('.modal');
  const modalForm = $('.modal__form');
  const modalToggle = $('.header__appointment-btn');
  const modalCloseBtn = $('.modal__close-btn');

  modalToggle.click(function (e) {
    e.preventDefault();
    modalOverlay.addClass('modal--open');
    $('body').addClass('modal-open');
  });

  var closeModal = function () {
    modalOverlay.removeClass('modal--open');
    $('body').removeClass('modal-open');
  };

  modalCloseBtn.click(function () {
    closeModal();
  });

  modalOverlay.click(function (e) {
    if (!modalForm.is(e.target) && modalForm.has(e.target).length === 0) {
      closeModal();
    };
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
        closeModal();
    };
  });

  //кнопка разворачивания прайс-листа с услугами:
  const priceListToggle = $('.services-prices__table-toggle');

  //раскрытие прайслистов
  priceListToggle.each(function () {
    $(this).click(function () {
      $(this).parents('.services-prices__table').toggleClass('services-prices__table--open');
      $(this).parents('.services-prices__table').next('.services-prices__togglable-wrapper').slideToggle(500);
    });
  });

  //ячейки таблиц с прайс-листами:
  const tableHeading = $('.services-prices__table-subheading-cell');

  //функция для получения ширины ячеек-заголовков таблицы и присваивания этой ширины соответствующим ячейкам ниже
  var tableCellsWidth = function (headingCells) {
    let headingCellsFiltered = headingCells.not(':last-of-type');

    headingCellsFiltered.each(function () {
      let headingCellWidth = $(this).outerWidth();
      let className = $(this).attr('class');
      let classNamePart = className.match(/--([^ ]*)/)[1];
      let tableItems = $(this).parents('.services-prices__item').find('td[class*='+classNamePart+']');

      tableItems.css('width', headingCellWidth);
    });
  };

  tableCellsWidth(tableHeading);

  //переключение с баннера на форму записи на странице услуг
  servicesForm.removeClass('hidden').hide();
  servicesFormSwitch.click(function (e) {
    e.preventDefault();
    if (!servicesFormSwitch.hasClass('played')) {
      servicesBanner.slideToggle(500);
      setTimeout(function () {
        servicesForm.slideToggle(500);
      }, 500);
      servicesFormSwitch.addClass('played');
    };
  });

  //кнопка разворачивания текста на странице "О нас":
  const aboutTextToggle = $('.about-hidden__heading-toggle');

  //раскрытие текстов на странице "О нас"
  aboutTextToggle.each(function () {
    $(this).click(function () {
      $(this).parents('.about-hidden__text-block').toggleClass('about-hidden__text-block--open');
      $(this).parents('.about-hidden__text-block-heading').next('.about-hidden__text-block-content').slideToggle(500);
    });
  });

  //раскрытие скрытой информации на стр. "О нас"
  aboutHiddenInfoToggle.click(function () {
    aboutHiddenInfoToggle.fadeOut(500);
    aboutHiddenInfo.slideDown(500);
    //подключение сладера на странице "О нас"
    $('.gallery--hidden .gallery__slider').slick({
      prevArrow: $('.gallery--hidden .gallery__arrow--prev'),
      nextArrow: $('.gallery--hidden .gallery__arrow--next'),
      autoPlay: true,
      adaptiveHeight: true,
      respondTo: 'slider'
    });
    $('html, body').animate({
        scrollTop: aboutHiddenInfo.offset().top
    }, 500);
  });

  //подключение сладера на странице "Отзывы"
  $('.reviews-container__items').slick({
    prevArrow: $('.reviews-container__arrow--prev'),
    nextArrow: $('.reviews-container__arrow--next'),
    autoPlay: true,
    adaptiveHeight: true,
    respondTo: 'slider'
  }).removeClass('loading');

  //подключение сладера на странице "Структура/Наши сотрудники"
  $('.gallery--doctors .gallery__slider').slick({
    prevArrow: $('.gallery--doctors .gallery__arrow--prev'),
    nextArrow: $('.gallery--doctors .gallery__arrow--next'),
    autoPlay: true,
    adaptiveHeight: true,
    respondTo: 'slider'
  });

  //подключение сладера на странице "Все врачи"
  $('.doctors-block__list').slick({
    prevArrow: $('.doctors-block__navigation .nav-block__navigation-arrow--prev'),
    nextArrow: $('.doctors-block__navigation .nav-block__navigation-arrow--next'),
    autoPlay: true,
    adaptiveHeight: true,
    respondTo: 'slider',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  //функция ракрытия скрытых областей через меню в зоне с баннером:
  var openWithBannerZoneMenu = function (arg) {
    arg.each(function () {
      $(this).click(function (e) {
        e.preventDefault();
        let href = $(this).attr('href').replace('#', '');
        let hiddenContent = arg.parents('.main').find('.hidden-content');
        let alreadyActive = false;

        hiddenContent.each(function () {
          if ($(this).attr('id') == href) {
            if (!$(this).hasClass('active')) {
              $(this).addClass('active');
              $(this).slideDown(300);
            } else {
              alreadyActive = true;
            };
          } else {
            $(this).removeClass('active');
            $(this).slideUp(300);
          };
        });

        if (alreadyActive === false) {
          setTimeout(function () {
            $('html, body').animate({
                scrollTop: arg.parents('.main').find('.hidden-content.active').offset().top
            }, 300);
            alreadyActive = true;
          }, 300);
        } else {
          $('html, body').animate({
              scrollTop: arg.parents('.main').find('.hidden-content.active').offset().top
          }, 300);
        };
      });
    });
  };

  openWithBannerZoneMenu(documentsHiddenInfoToggles);
  openWithBannerZoneMenu(researchesHiddenInfoToggles);

  //кнопка разворачивания текста на странице "Исследование детально":
  const researchTextToggle = $('.expandable-block__heading-toggle');

  //раскрытие текстов на страницах "Исследование детально" и "О клинических исследованиях"
  researchTextToggle.each(function () {
    $(this).click(function () {
      $(this).parents('.expandable-block').toggleClass('expandable-block--open');
      $(this).parents('.expandable-block__text-block-heading').next('.expandable-block__text-block-content').slideToggle(500);
      if ($(this).parents('.expandable-block').data('chapter') !== undefined) {
        let dataChapter = $(this).parents('.expandable-block').data('chapter');
        let allBlocks = $(this).parents('.list-block').find('.expandable-block');
        let thisBlock = $(this).parents('.expandable-block');
        let allSwitchesBlock = $(this).parents('.section').find('.mode-switches');
        let allSwitches = allSwitchesBlock.children('input');
        let thisSwitch = allSwitchesBlock.children('[data-chapter='+dataChapter+']');

        allSwitches.prop('checked', false);
        thisSwitch.prop('checked', true);
        if (thisBlock.hasClass('expandable-block--open')) {
          allBlocks.not(thisBlock).removeClass('expandable-block--open').find('.expandable-block__text-block-content').slideUp(500);
          setTimeout(function () {
            $('html, body').animate({
                scrollTop: thisBlock.offset().top
            }, 300);
          }, 300);
        };
      };
    });
  });

  //функции, связующие переключатели в оглавлениях и блоки со сворачиваемым контентом:
  if (chapterModeSwitches.length) {
    let chapters = chapterModeSwitches.parents('.filter-block').next('.list-block').find('.expandable-block');
    let chapterId = $('.mode-switches--chapters input[type=radio]:checked').data('chapter');

    chapters.each(function () {
      if ($(this).attr('data-chapter') == chapterId) {
        $(this).addClass('expandable-block--open').find('.expandable-block__text-block-content').css('display','block');
      };
    });

    chapterModeSwitches.change(function () {
      let chapterId = $('.mode-switches--chapters input[type=radio]:checked').data('chapter');

      chapters.each(function () {
        let chapter = $(this);
        if ($(this).attr('data-chapter') == chapterId) {
          if (!$(this).hasClass('expandable-block--open')) {
            chapters.removeClass('expandable-block--open').find('.expandable-block__text-block-content').slideUp(300);
            $(this).addClass('expandable-block--open').find('.expandable-block__text-block-content').slideDown(300);
          };
          setTimeout(function () {
            $('html, body').animate({
                scrollTop: chapter.offset().top
            }, 300);
          }, 300);
        };
      });
    });
  };

  $(window).resize(function () {
    tableCellsWidth(tableHeading);
    refreshHeights();

    //положения элементов при открытом меню
    if (menu.hasClass('header__submenu-block--open')) {
      main.css('padding-top', openMenuHeight);
      menu.css('top', headerHeight);
    } else {
      main.css('padding-top', '0');
      menu.css('top', -openMenuHeight);
    };

    //закрытие открытого меню при переходе через точку "мобильности", когда все меню открывается одной кнопкой
    if ($(window).width() <= 989) {
      desktopMenuToggle.removeClass('active');
      menu.addClass('mobile');
    } else {
      if (menu.hasClass('mobile')) {
        menu.removeClass('mobile');
        menu.removeClass('header__submenu-block--open');
      };
    };


    if ($(window).width() >= 768) {
      if (subsubmenuList.hasClass('header__subsubmenu-list--hidden')) {
        subsubmenuList.show().removeClass('header__subsubmenu-list--hidden');
        subsubmenuToggle.removeClass('header__subsubmenu-toggle--open');
      };
    } else {
      if (!subsubmenuList.hasClass('header__subsubmenu-list--hidden')) {
        subsubmenuList.hide().addClass('header__subsubmenu-list--hidden');
      };
    };

  });
});
