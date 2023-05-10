
document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector('.overlay'); 
  const galleryContainer = document.getElementById('gallery-container');
  const pageGallery = document.getElementById('page-gallery-container');

  /* HAMBURGER MENU */

  hamburger.addEventListener('click', function() {
    sidebar.classList.toggle('close');
    overlay.classList.toggle('show');
  });

   /* GALLERY ASYNC */

  async function loadImages(topic, galleryTopic) {
    try{
      const response = await fetch(`../db/${topic}.json`);
      const data = await response.json();
      console.log(topic);
      galleryTopic.innerHTML = '';
      
      const allTopicsImages = data[topic];

      for (const imagePath of allTopicsImages) {
        const imgElement = document.createElement('img');
        imgElement.src = imagePath.url;
        imgElement.classList.add('photo');

        galleryTopic.appendChild(imgElement);

        imgElement.onclick = () => {
          popupGalleryDisplay(imgElement);
        }
      }

      shufflePhotos();

      function shufflePhotos() {
        for (var i = galleryTopic.children.length; i >= 0; i--) {
          galleryTopic.appendChild(galleryTopic.children[Math.random() * i | 0]);
        }
      }

      /* function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      } */

    } catch (error) {
      console.log(`Error fetching images for ${topic}: ${error}`);
      return [];
    }
  }

  /* DISPLAY ALL TOPICS IMAGES */
  
  const allTopicsContainer = document.querySelector('.all-topics');
  allTopicsContainer.addEventListener('click', (event) => {
    const topic = event.target.dataset.topic;
    loadImages(topic, galleryContainer);
  });


  /* POPUP SCREEN */ 
  const popupGalleryDisplay = (image) => {
    
    console.log("img clicked:", image);
    document.querySelector('.popup-image').style.display = 'block';
    let src = image.getAttribute('src');
    if (src !== null) {
      document.querySelector('.photo').src = src;
      console.log(document.querySelector('.popup-image').appendChild(image))
      
    } else {
      console.log("Image source is null or undefined");
    }
        
  document.querySelector('.popup-image span').onclick = () => {
    document.querySelector('.popup-image').style.display = 'none';
    console.log("loool", document.querySelector('.popup-image').lastElementChild);
    document.querySelector('.popup-image').removeChild(document.querySelector('.popup-image').lastElementChild);

    const likeImage = document.getElementsByClassName('.popup-image i');
    likeImage.addEventListener('click', () => {
      console.log("finally here..");
    })
    
  }
}
  /* SLICK SLIDER DISPLAY IMAGES */

  const sliderElements = document.querySelectorAll('.slick-list');

  sliderElements.forEach((sliderElement) => {
    sliderElement.addEventListener('click', (event) => {
      
      const topic = event.target.dataset.topic;
      
      loadImages(topic, galleryContainer);
    });
  });

  /* TOPICS PAGE GALLERY */

  loadImages("allTopics", galleryContainer);

});

/* SLICK SLIDER */

  $('.slick-list').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 7,
    arrows: true,
    responsive: [
      {
        breakpoint: 1424,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.slick-list').slick({
    dots: false,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
  });