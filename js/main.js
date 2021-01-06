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




