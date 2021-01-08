const popupCloseBtn = document.querySelector('.popup-box__close-button a')
const body = document.querySelector('body')
popupCloseBtn.onclick = () => {
    body.classList.remove('show-popup')
}
const projects = document.querySelectorAll('.home__project .project')
const popups = document.querySelectorAll('.home__project .popup')

for (let i = 0; i < projects.length; i++) {
    projects[i].onclick = () => {
        body.classList.add('show-popup')
        for (let popup of popups)
            popup.style.display = 'none'
        popups[i].style.display = 'block'
    }
}

const menuBtn = document.querySelector('.menu-icon')
const leftMenu = document.querySelector('.main-nav__container__menu')
const closeBtn = document.querySelector('.close-icon')
const pageMask = document.querySelector('.main-nav__container__mask')
const navigations = document.querySelectorAll('.navigation')

menuBtn.onclick = () => {
    leftMenu.classList.add('active')
    menuBtn.style.display = 'none'
    closeBtn.style.display = 'block'
    pageMask.style.display = 'block'
}

const closeMenu = () => {
    leftMenu.classList.remove('active')
    menuBtn.style.display = 'block'
    closeBtn.style.display = 'none'
    pageMask.style.display = 'none'
}

closeBtn.onclick = closeMenu
pageMask.onclick = closeMenu

for (let navigation of navigations)
    navigation.onclick = closeMenu






