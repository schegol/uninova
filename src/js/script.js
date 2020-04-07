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
  //main (основная часть сайта, без футера и хедера):
  const main = $('main.main');
  //та часть хедера, которая видна всегда, независимо от того, раскрыто ли основное меню:
  const topHeader = $('.header__visible-part');
  //десктопные переключатели главного меню, соответствующие названиям пунктов 1 уровня меню:
  const desktopMenuToggle = $('.header__menu-link');

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
  });
});
