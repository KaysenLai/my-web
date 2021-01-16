const popupCloseBtn = document.querySelector('.popup-box__close-button a');
popupCloseBtn.onclick = () => {
  document.querySelector('body').classList.remove('show-popup');
};
const projects = document.querySelectorAll('.home__project .project');
const popups = document.querySelectorAll('.home__project .popup');
for (let i = 0; i < projects.length; i += 1) {
  projects[i].onclick = () => {
    document.querySelector('body').classList.add('show-popup');
    for (let j = 0; j < popups.length; j += 1) popups[j].style.display = 'none';
    popups[i].style.display = 'block';
  };
}
const menuBtn = document.querySelector('.menu-icon');
const leftMenu = document.querySelector('.main-nav__container__menu');
const closeBtn = document.querySelector('.close-icon');
const pageMask = document.querySelector('.main-nav__container__mask');
const navigations = document.querySelectorAll('.navigation');
menuBtn.onclick = () => {
  leftMenu.classList.add('active');
  menuBtn.style.display = 'none';
  closeBtn.style.display = 'block';
  pageMask.style.display = 'block';
};
const closeMenu = () => {
  leftMenu.classList.remove('active');
  menuBtn.style.display = 'block';
  closeBtn.style.display = 'none';
  pageMask.style.display = 'none';
};
closeBtn.onclick = closeMenu;
pageMask.onclick = closeMenu;
for (let i = 0; i < navigations.length; i += 1) navigations[i].onclick = closeMenu;
