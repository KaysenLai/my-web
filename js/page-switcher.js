const pageNames = ['home', 'resume', 'blog', 'gallery', 'contact'];

function setFirstPage() {
  const firstPage = document.querySelector('.page');
  firstPage.classList.add('page--current');
}

function removeCurrentPage() {
  const currentPage = document.querySelector('.page--current');
  if (currentPage) { currentPage.classList.remove('page--current'); }
}

function hashNotFound(hash) {
  const hashText = hash.substring(1); // eg: turn "#home" to "home"
  for (let i = 0; i < pageNames.length; i += 1) {
    if (pageNames[i] === hashText) { return false; }
  }
  return true;
}

let initIso = false;
function switchPage(hash) {
  if (!initIso && hash === '#gallery') {
    setTimeout(() => initIsotope(), 500);
    initIso = true;
  }
  const hashText = hash.substring(1); // eg: turn "#home" to "home"
  const hashPage = document.querySelector(`section[data-id=${hashText}]`);
  if (hashNotFound(hash)) {
    if (!hashPage) { setFirstPage(); }
    return;
  }
  removeCurrentPage();
  hashPage.classList.add('page--current');
}

window.onload = () => {
  if (location.hash) { switchPage(location.hash); } else { setFirstPage(); }
};

window.onhashchange = () => {
  switchPage(location.hash);
};
