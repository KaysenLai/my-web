const defaultPhotoPath = 'images/gallery/'


createGrid()
// function createPhotoBrowser() {
//     const photoBrowser = document.querySelector('.gallery__content__photo-browser')
//
// }


function createGrid() {
    const photoGrid = document.querySelector('.gallery__content__photo-grid')
    for (let i = 0; i < galleryPhotos.length; i++) {
        const photoData = galleryPhotos[i]
        photoGrid.appendChild(createPhotoItem(photoData))
    }
}

function createPhotoItem(photoData) {
    const photoItem = document.createElement('div')
    photoItem.classList.add('photo-item')
    for (let category of photoData['category'])
        photoItem.classList.add(category)
    const imgTag = creatImgTag(photoData)
    bindImgTag(imgTag)
    photoItem.appendChild(imgTag)
    return photoItem
}

function bindImgTag(imgTag) {
    imgTag.onclick = (e) => {
        const imgId = parseInt(e.target.getAttribute('photo-id'))
        const visibleIdList = getVisibleIdList()
        handleClickPhoto(imgId)
        photoBrowser.classList.add('visible')
    }
}

function creatImgTag(photoData) {
    const imgTag = document.createElement('img')
    imgTag.setAttribute('photo-id', photoData['id'].toString())
    imgTag.src = defaultPhotoPath + photoData['filename']
    imgTag.alt = photoData['filename']
    return imgTag
}

function handleClickPhoto(imgId) {
    const clickedPhotoData = galleryPhotos[imgId - 1]
    const imageContainer = document.querySelector('.photo-browser__image-container')
    const imgTag = creatImgTag(clickedPhotoData)
    console.log(imgTag)
    imageContainer.innerHTML = ''
    imageContainer.appendChild(imgTag)
}

function getVisibleIdList() {
    let visibleIdList = []
    const photoItems = document.querySelectorAll('.photo-item')
    for (let photoItem of photoItems) {
        if (photoItem.style.display !== 'none') {
            const photo = photoItem.querySelector('img')
            visibleIdList.push(parseInt(photo.getAttribute('photo-id')))
        }
    }
    return visibleIdList
}

const photoBrowser = document.querySelector('.photo-browser')
const photoBrowserCloseBtn = document.querySelector('.photo-browser__nav__close-button')

photoBrowserCloseBtn.onclick = () => {
    photoBrowser.classList.remove('visible')
}









// init Isotope https://isotope.metafizzy.co/
let iso = new Isotope( '.gallery__content__photo-grid', {
    itemSelector: '.photo-item',
    layoutMode: 'masonry'
});

setTimeout(()=> {
    iso.arrange({ filter: '*' });
},1000)

// bind filter button click
const filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener( 'click', function( event ) {
    const filterValue = event.target.getAttribute('data-filter');
    iso.arrange({ filter: filterValue });
});

// change is-checked class on buttons
const buttonGroups = document.querySelectorAll('.button-group');
for (let i = 0; i < buttonGroups.length; i++ ) {
    const buttonGroup = buttonGroups[i];
    radioButtonGroup( buttonGroup );
}

function radioButtonGroup( buttonGroup ) {
    buttonGroup.addEventListener( 'click', function( event ) {
        buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
        event.target.classList.add('is-checked');
    });
}
