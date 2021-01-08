
(function () {
    createGrid()
})();

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
    photoItem.appendChild(createImgTag(photoData))

    return photoItem
}

function createImgTag(photoData) {
    const defaultPhotoPath = 'images/gallery/'
    const imgTag = document.createElement('img')
    imgTag.setAttribute('photo-id', photoData['id'].toString())
    imgTag.src = defaultPhotoPath + photoData['filename']
    imgTag.alt = photoData['filename']

    imgTag.onclick = (e) => {
        const imgTagId = parseInt(e.target.getAttribute('photo-id'))
        const visibleIdList = getVisibleIdList()

    }
    return imgTag
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
