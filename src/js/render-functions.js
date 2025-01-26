export const createGallery = imgInfo => {
  return `<li class="gallery-card">
        <a href="${imgInfo.largeImageURL}" class="gallery-link">
            <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" />
            </a>
             <div class="gallery-info">
              <p><strong>Likes:</strong> ${imgInfo.likes}</p>
              <p><strong>Views:</strong> ${imgInfo.views}</p>
              <p><strong>Comments:</strong> ${imgInfo.comments}</p>
              <p><strong>Downloads:</strong> ${imgInfo.downloads}</p>
            </div>
          </li>`;
};
