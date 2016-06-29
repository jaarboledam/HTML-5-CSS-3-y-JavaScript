(function (){
  var navbarItems = document.querySelectorAll('.navbar-list-item');
  
  for (var i = 0, lng = navbarItems.length; i < lng; i++) {
    if (navbarItems[i].addEventListener) {
      navbarItems[i].addEventListener('click', navbarItem_Click);
    } else {
      navbarItems[i].attachEvent('onClick', navbarItem_Click);
    }
  }
  
  function navbarItem_Click (e) {
    var sectionToGo = this.querySelector('a').href.split('#');
    
    if (sectionToGo.length > 1) {
      e.preventDefault();
      var goTo = sectionToGo[sectionToGo.length - 1];
      getElementByIdAndScroll(goTo);
    }
  }
  
  function getElementByIdAndScroll (name) {
    var elem;
    if (name === '') {
      elem = document.querySelector('.header');
    } else {
      elem = document.getElementById(name);
    }
    
    scrollToElement(elem);
  }
  
  function scrollToElement (element) {
    var jump = parseInt(element.getBoundingClientRect().top * .3);
    document.body.scrollTop += jump;
    document.documentElement.scrollTop += jump;
    
    if (!element.lastJump || element.lastJump > Math.abs(jump)) {
      element.lastJump = Math.abs(jump)
      
      setTimeout(function () {
        scrollToElement(element);
      }, 60);
      
    } else {
      element.lastJump = null;
    }
  }
  
  
  // CHANGE ACTIVE ITEM
  window.addEventListener('scroll', changeMenuStyle);
  
  var cumulativeOffset = function (element) {
    var top = 0;
    
    do {
      top += element.offsetTop || 0;
      element = element.offsetParent;
    } while(element);
    
    return top;
  }
  
  var offsetQuienSoy = cumulativeOffset(document.getElementById('quien-soy'));
  var offsetEquipo = cumulativeOffset(document.getElementById('equipo'));
  var offsetTransporte = cumulativeOffset(document.getElementById('transporte'));
  var navbar = document.querySelector('.navbar');
  var prev = null;
  
  function changeMenuStyle (e) {
    if (window.pageYOffset >= 0 && window.pageYOffset < offsetQuienSoy) {
      if (!prev || prev !== 1) {
        prev = 1;
      } else if (prev === 1) {
        return false;
      }
      
      navbar.classList.remove('navbar-reverse');
      removeActiveClass();
      navbar.querySelector('a[href="#"]').parentNode.classList.add('active');
      
    } else if (window.pageYOffset >= offsetQuienSoy && window.pageYOffset < offsetEquipo) {
      if (!prev || prev !== 2) {
        prev = 2;
      } else if (prev === 2) {
        return false;
      }
      
      navbar.classList.add('navbar-reverse');
      removeActiveClass();
      navbar.querySelector('a[href$="quien-soy"]').parentNode.classList.add('active');
      
    } else if (window.pageYOffset >= offsetEquipo && window.pageYOffset < offsetTransporte) {
      if (!prev || prev !== 3) {
        prev = 3;
      } else if (prev === 3)  {
        return false;
      }
      
      navbar.classList.remove('navbar-reverse');
      removeActiveClass();
      navbar.querySelector('a[href$="transporte"]').parentNode.classList.add('active');
      
    }
  }

  function removeActiveClass() {
    for (var i = 0; i < navbarItems.length; i++) {
      navbarItems[i].classList.remove('active');
    }
  }
  
})();