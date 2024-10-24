import './style.css'
const cards = document.querySelectorAll('.card');
const cardContainer = document.querySelector('.card-container');
const observer = new IntersectionObserver(entries => {
  console.log("hi")
    entries.forEach(entry => {
      entry.target.classList.toggle('show', entry.isIntersecting);
      if(entry.isIntersecting)
        observer.unobserve(entry.target);
    })
},{ 
  threshold: 1,
})
cards.forEach(card => observer.observe(card))

const lastElementObserver = new IntersectionObserver(entries => {
  // console.log(entries[0].target);
  if(!entries[0].isIntersecting) return;
  loadMoreElements();
  lastElementObserver.unobserve(entries[0].target);
  lastElementObserver.observe(document.querySelector('.card:last-child'));
}, {
  rootMargin: '100px'
})

lastElementObserver.observe(document.querySelector('.card:last-child'))
function loadMoreElements(){
  for(let i=0; i<10; i++){
    const newElement = document.createElement('div');
    newElement.classList.add('card');
    newElement.textContent = 'New Card';
    observer.observe(newElement);
    cardContainer.appendChild(newElement);
  }
}



