(function () {
  var img = document.getElementById('header-img-animated') ;
  
  img.addEventListener('mousemove', function (e) {
    img.style.backgroundPosition = e.pageX * -1 / 12 + 'px ' + e.pageY * -1 / 12 + 'px';
  });
  
  img.addEventListener('mouseleave', function () {
    img.style.backgroundPosition = 'center center';
  });
  
})();