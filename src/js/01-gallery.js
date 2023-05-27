import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';

import '../sass/common.scss';
import '../sass/01-gallery.scss';

console.log(galleryItems);
const galleryEl = document.querySelector('.gallery');

function galleryCreateEl(items) {
    const galleryElements = items.map(item =>
    `<li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
            <img class="gallery__image" src="${item.preview}" alt="${item.description}"/>
        </a>
    </li>`).join('');
    galleryEl.insertAdjacentHTML('beforeend', galleryElements);
    return galleryEl;

}

function onGalleryItemClick(event) {
    event.preventDefault();
    let clickedItemEl = event.target.closest('.gallery__item');
    if (!clickedItemEl) {
        return;
    }
    var lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionSelector: 'img',
        captionType: 'attr',
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            lightbox.close()
        }
     
    });

      document.removeEventListener('keydown', event => {
        if (event.key === 'Escape') {
            lightbox.close()
        }
    });
}

function initGallery(items) {
    const galleryMarkup = galleryCreateEl(items);
    galleryMarkup.addEventListener('click', onGalleryItemClick)
}

initGallery(galleryItems);
