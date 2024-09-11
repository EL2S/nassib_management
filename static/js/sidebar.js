document.addEventListener("DOMContentLoaded", function () {
  var path = window.location.pathname;

  function setActiveNavLink() {
    var menuItems = document.querySelectorAll('.nav-link');

    menuItems.forEach(function (menuItem) {
      menuItem.classList.remove('active');
      var icon = menuItem.querySelector('.icon-i');
      if (icon) {
        icon.classList.remove('active-icon');
      }
    });

    var activeNavLink = document.querySelector('.nav-link[href="' + path + '"]');
    if (activeNavLink) {
      activeNavLink.classList.add('active');
      var activeIcon = activeNavLink.querySelector('.icon-i');
      if (activeIcon) {
        activeIcon.classList.add('active-icon');
      }
    } else {
      var subPaths = path.split('/').filter(function (p) { return p !== ''; });
      if (subPaths.length > 1) {
        var parentPath = '/' + subPaths[0] + '/';
        var parentNavLink = document.querySelector('.nav-link[href="' + parentPath + '"]');
        if (parentNavLink) {
          parentNavLink.classList.add('active');
          var parentIcon = parentNavLink.querySelector('.icon-i');
          if (parentIcon) {
            parentIcon.classList.add('active-icon');
          }
        }
      }
    }
  }

  setActiveNavLink();
});
