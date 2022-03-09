
// tippy('.tippy', {
//   content: "I'm a Tippy tooltip!",
// });

if (isMobile.any()) {
  //============================================================
  // Lateral menu

  const menuParents = document.querySelectorAll('.menu-page__parent > a');
  
  for (let i = 0; i < menuParents.length; i++) {
    const menuParent = menuParents[i];
    
    menuParent.addEventListener('click', function(event) {
      menuParent.parentElement.classList.toggle('_active');
      event.preventDefault();
    });
  }
} else {
  //============================================================
  // Lateral menu

  const menuParents = document.querySelectorAll('.menu-page__parent');

  for (let i = 0; i < menuParents.length; i++) {
    const menuParent = menuParents[i];
    
    menuParent.addEventListener('mouseenter', function() {
      menuParent.classList.add('_active');
    });

    menuParent.addEventListener('mouseleave', function() {
      menuParent.classList.remove('_active');
    });
  }
}

//============================================================
// Burger end lateral menu

const menuPageBurger = document.querySelector('.menu-page__burger');
const menuPageBody = document.querySelector('.menu-page__body');

menuPageBurger.addEventListener('click', function() {
  _slideToggle(menuPageBody, function() {
    menuPageBurger.classList.toggle('_active');
  });
});

//============================================================
// Search

const searchSelect = document.querySelector('.search-page__title');
const categoriesSearch = document.querySelector('.categories-search');

searchSelect.addEventListener('click', function() {
  _slideToggle(categoriesSearch, function() {
    searchSelect.classList.toggle('_active');
  });
});


const checkboxCategories = document.querySelectorAll('.categories-search__checkbox');

for (let i = 0; i < checkboxCategories.length; i++) {
  const checkboxCategory = checkboxCategories[i];
  
  checkboxCategory.addEventListener('change', function(event) {
    checkboxCategory.classList.toggle('_active');

    const checkboxActiveCategories = document.querySelectorAll('.categories-search__checkbox._active');
    
    if (checkboxActiveCategories.length > 0) {
      searchSelect.classList.add('_categories');
      const searchQuantity = searchSelect.querySelector('.search-page__quantity');
      
      searchQuantity.textContent = searchQuantity.dataset.text + ' ' + checkboxActiveCategories.length;
    } else {
      searchSelect.classList.remove('_categories');
    }
  });
}


//============================================================
// Фильтр товаров

if (isMobile.any()) {
  const filterTitle = document.querySelector('.filter__title');

  if (filterTitle) {
    filterTitle.addEventListener('click', function(e) {
      _slideToggle(filterTitle.nextElementSibling, function() {
        filterTitle.classList.toggle('_active');
      });
    });
  }
}