//第一次进入或者刷新当前页面
window.onload = () => {
    if(location.hash)
        switchPage(location.hash)
    else
        setFirstPage()
}

//当锚改变时跳转到相应页面,
window.onhashchange = () => {
    switchPage(location.hash)
}

function switchPage(hash){
    const hashText = hash.substring(1) // eg: turn "#home" to "home"
    removeCurrentPage()
    const hashPage = document.querySelector("section[data-id=" + hashText + "]")
    hashPage.classList.add("page--current")
}

function setFirstPage () {
    const firstPage = document.querySelector('.page')
    firstPage.classList.add('page--current')
}

function removeCurrentPage() {
    const currentPage = document.querySelector(".page--current")
    if(currentPage)
        currentPage.classList.remove("page--current")
}


