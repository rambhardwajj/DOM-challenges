// Image data
const images = [
  {
    url: 'https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Beautiful Mountain Landscape',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Ocean Sunset View',
  },
  {
    url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Autumn Forest Path',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Urban City Skyline',
  },
];

const carouselTrack = document.getElementById("carouselTrack");
const caption = document.getElementById("caption");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const carouselNav = document.getElementById("carouselNav");
const autoPlayButton = document.getElementById("autoPlayButton");

let currInd = 0;
let autoPlayInterval = null;
let playing = false;

prevButton.addEventListener('click', () => {
  currInd = currInd === 0 ? images.length - 1 : currInd - 1;
  updateCarousel();
});

nextButton.addEventListener('click', () => {
  currInd = currInd === images.length - 1 ? 0 : currInd + 1;
  updateCarousel();
});

autoPlayButton.addEventListener('click', autoPlayToggle);

function autoPlayToggle(){
  if(!playing){
    autoPlayInterval = setInterval(() => {
      currInd = (currInd + 1) % images.length;
      updateCarousel();
    }, 1000); 
    
    playing = true;
    autoPlayButton.innerText = "Stop Autoplay";
  } else {
    clearInterval(autoPlayInterval);
    playing = false;
    autoPlayButton.innerText = "Start Autoplay";
  }
}

function createSlides(){
  console.log('Created slides');
  images.forEach((image, ind) => {
      let carouselSlide = document.createElement("div");
      carouselSlide.classList.add("carousel-slide");
      carouselSlide.style.backgroundImage = `url('${image.url}')`;
      carouselTrack.appendChild(carouselSlide);
      addIndexIndicator(ind);
  });
}

function addIndexIndicator(ind) {
  console.log('Added indicator on slides');
  let carouselIndicator = document.createElement('div');
  carouselIndicator.classList.add('carousel-indicator');
  carouselIndicator.setAttribute('id', ind);

  carouselIndicator.addEventListener('click', () => {
    currInd = parseInt(ind);
    updateCarousel();
  });

  carouselNav.appendChild(carouselIndicator);
}

function updateCarousel(){
  console.log('Updating carousel');
  carouselTrack.style.transform = `translateX(-${currInd * 100}%)`;
  caption.textContent = images[currInd].caption;

  document.querySelectorAll('.carousel-indicator').forEach(item => {
    item.classList.remove('active');
  });

  let activeIndicator = document.getElementById(currInd.toString());
  if (activeIndicator) {
    activeIndicator.classList.add('active');
  }
}

createSlides();
updateCarousel();
