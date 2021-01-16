const defaultPhotoPath = 'images/gallery/';
let currentImgId;
const body = document.querySelector('body');
const photoBrowser = document.querySelector('.photo-browser');
const photoBrowserBackGround = document.querySelector('.photo-browser__background');
const photoBrowserCloseBtn = document.querySelector('.photo-browser__nav__close-button');
const preBtn = document.querySelector('.photo-browser__nav__prePhoto');
const nextBtn = document.querySelector('.photo-browser__nav__nextPhoto');

function creatImgTag(photoData) {
  const imgTag = document.createElement('img');
  imgTag.setAttribute('img-id', photoData.id.toString());
  imgTag.src = defaultPhotoPath + photoData.filename;
  imgTag.alt = photoData.filename;
  return imgTag;
}

function showPhotoById(imgId) {
  const photoData = galleryPhotos[imgId - 1];
  const imageContainer = document.querySelector('.photo-browser__image-container');
  const imgTag = creatImgTag(photoData);
  imageContainer.innerHTML = '';
  imageContainer.appendChild(imgTag);
  currentImgId = imgId;
}

function bindImgTag(imgTag) {
  imgTag.onclick = (e) => {
    const imgId = +e.target.getAttribute('img-id');
    showPhotoById(imgId);
    photoBrowser.classList.add('visible');
    body.classList.add('show-popup');
  };
}

function createPhotoItem(photoData) {
  const photoItem = document.createElement('div');
  photoItem.classList.add('photo-item');
  for (let i = 0; i < photoData.category.length; i += 1) {
    photoItem.classList.add(photoData.category[i]);
  }
  const imgTag = creatImgTag(photoData);
  bindImgTag(imgTag);
  photoItem.appendChild(imgTag);
  return photoItem;
}

function getVisibleIdList() {
  const visibleIdList = [];
  const photoItems = document.querySelectorAll('.photo-item');
  for (const photoItem of photoItems) {
    if (photoItem.style.display !== 'none') {
      const photo = photoItem.querySelector('img');
      visibleIdList.push(+photo.getAttribute('img-id'));
    }
  }
  return visibleIdList;
}

function createGrid() {
  const photoGrid = document.querySelector('.gallery__content__photo-grid');
  for (let i = 0; i < galleryPhotos.length; i += 1) {
    const photoData = galleryPhotos[i];
    photoGrid.appendChild(createPhotoItem(photoData));
  }
}
createGrid();

function closePhotoBrowser() {
  photoBrowser.classList.remove('visible');
  body.classList.remove('show-popup');
}

function getIndexInVisibleIdList(visibleIdList) {
  for (let i = 0; i < visibleIdList.length; i += 1) {
    if (visibleIdList[i] === currentImgId) { return i; }
  }
  return [];
}

function isFirstOrEnd(imgIndex, visibleIdList) {
  return imgIndex === -1 || imgIndex === visibleIdList.length;
}

preBtn.onclick = () => {
  const visibleIdList = getVisibleIdList();
  const currentImgIndex = getIndexInVisibleIdList(visibleIdList);
  const prePhotoImgIndex = currentImgIndex - 1;
  const prePhotoImgId = visibleIdList[prePhotoImgIndex];
  if (isFirstOrEnd(prePhotoImgIndex, visibleIdList)) { return; }
  showPhotoById(prePhotoImgId);
  currentImgId = prePhotoImgId;
};

nextBtn.onclick = () => {
  const visibleIdList = getVisibleIdList();
  const currentImgIndex = getIndexInVisibleIdList(visibleIdList);
  const nextPhotoImgIndex = currentImgIndex + 1;
  const nextPhotoImgId = +visibleIdList[nextPhotoImgIndex];
  if (isFirstOrEnd(nextPhotoImgIndex, visibleIdList)) { return; }
  showPhotoById(nextPhotoImgId);
  currentImgId = nextPhotoImgId;
};

photoBrowserCloseBtn.onclick = () => closePhotoBrowser();
photoBrowserBackGround.onclick = () => closePhotoBrowser();

// init Isotope https://isotope.metafizzy.co/
let iso;

function initIsotope() {
  iso = new Isotope('.gallery__content__photo-grid', {
    itemSelector: '.gallery__content__photo-grid .photo-item',
    layoutMode: 'masonry',
  });
}

// bind filter button click
const filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener('click', (event) => {
  const filterValue = event.target.getAttribute('data-filter');
  iso.arrange({ filter: filterValue });
});

function radioButtonGroup(buttonGroup) {
  buttonGroup.addEventListener('click', (event) => {
    if (!matchesSelector(event.target, 'button')) {
      return;
    }
    buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
    event.target.classList.add('is-checked');
  });
}

// change is-checked class on buttons
const buttonGroups = document.querySelectorAll('.gallery__content__button-group');
for (let i = 0; i < buttonGroups.length; i += 1) {
  const buttonGroup = buttonGroups[i];
  radioButtonGroup(buttonGroup);
}
