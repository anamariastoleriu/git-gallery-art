document.addEventListener("DOMContentLoaded", function() {

  /* ALL TOPIC PAGES */

    const D3Gallery = document.getElementById('D3-container');
    const anatomyGallery = document.getElementById('anatomy-container');
    const animeGallery = document.getElementById('anime-container');
    const childrenGallery = document.getElementById('children-container');
    const digitalArtGallery = document.getElementById('digitalArt-container');
    const fantasyGallery = document.getElementById('fantasy-container');
    const fashionGallery = document.getElementById('fashion-container');
    const gameGallery = document.getElementById('game-container');
    const horrorGallery = document.getElementById('horror-container');
    const modelingGallery = document.getElementById('modeling-container');
    const portraitsGallery = document.getElementById('portraits-container');
    const realismGallery = document.getElementById('realism-container');
    const sculptureGallery = document.getElementById('sculpture-container');
    const sketchesGallery = document.getElementById('sketches-container');
    const traditionalArtGallery = document.getElementById('traditionalArt-container');


    /* RANDOM TOPIC IMAGES */

    async function loadImages(topic, gallery) {
      try{
        const response = await fetch(`../db/${topic}.json`);
        const data = await response.json();
        gallery.innerHTML = '';
        
        const allTopicsImages = data[topic];
  
        for (const imagePath of allTopicsImages) {
          const imgElement = document.createElement('img');
          imgElement.src = "." + imagePath.url;
          imgElement.classList.add('photo');
  
          gallery.appendChild(imgElement);

          imgElement.onclick = () => {
            popupGalleryDisplay(imgElement);
          }
        }
  
        shufflePhotos();
  
        function shufflePhotos() {
          for (var i = gallery.children.length; i >= 0; i--) {
            gallery.appendChild(gallery.children[Math.random() * i | 0]);
          }
        }
  
        function shuffleArray(array) {
          for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
          return array;
        }
  
      } catch (error) {
        console.log(`Error fetching images for ${topic}: ${error}`);
        return [];
      }
    }

      /* LOADING IMAGES IN EVERY TOPIC PAGE */

    loadImages("3D", D3Gallery);
    loadImages("anatomy", anatomyGallery);
    loadImages("anime", animeGallery);
    loadImages("children", childrenGallery);
    loadImages("digitalArt", digitalArtGallery);
    loadImages("fantasy", fantasyGallery);
    loadImages("fashion", fashionGallery);
    loadImages("game", gameGallery);
    loadImages("horror", horrorGallery);
    loadImages("modeling", modelingGallery);
    loadImages("portraits", portraitsGallery);
    loadImages("realism", realismGallery);
    loadImages("sculpture", sculptureGallery);
    loadImages("sketches", sketchesGallery);
    loadImages("traditionalArt", traditionalArtGallery);

    /* POPUP SCREEN */

    const popupGalleryDisplay = (image) => {
      console.log(image);
      console.log("11");
      
      console.log("img clicked:", image);
      document.querySelector('.popup-image').style.display = 'block';
      let src = image.getAttribute('src');
      if (src !== null) {
        document.querySelector('.photo').src = src;
        document.querySelector('.popup-image').appendChild(image);
      } else {
        console.log("Image source is null or undefined");
      }
          
    document.querySelector('.popup-image span').onclick = () => {
      document.querySelector('.popup-image').style.display = 'none';
      document.querySelector('.popup-image').removeChild(document.querySelector('.popup-image').lastElementChild);
    }
  }


});
