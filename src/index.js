let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyUrl = "http://localhost:3000/toys"
fetch(toyUrl)
  .then(resp => resp.json())
  .then(data => cardsRender(data))
  

function cardsRender(toys){
  toys.forEach(toy => {
    cardRender(toy)
  })
}
const toyCollection = document.getElementById('toy-collection')
function cardRender(toy){
      toyCollection.innerHTML += `
   <div class="card" data-id=${toy.id}>
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes</p>
        <button class="like-btn">Like <3</button>
   </div>
  `
}
  // ANATHER WAY TO DO IT 

  //const div = document.createElement("div")
  //const toyCollection = document.getElementById('toy-collection')
  //div.className = 'card'

  //const button = document.createElement("button")
  //button.innerText = "Like"
  //button.id = "cardsButton"
  
  //div.innerHTML = `
  //<h2> ${toy.name} </h2>
  //<img src="${toy.image}" class="toy-avatar"/>
  //<p> Likes = ${toy.likes} </p>
  //`
 // toyCollection.appendChild(div);  div.appendChild(button)
//}

const addToyForm = document.querySelector('.add-toy-form')
addToyForm.addEventListener('submit', function (event) {

fetch(toyUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    "name":`${event.target.name.value}`,
    "image": `${event.target.image.value}`,
    "likes": 0
  })
})
.then(resp => resp.json())
.then(NewToy => cardsRender(NewToy))
})

//const toyCollection = document.getElementById('toy-collection')
toyCollection.addEventListener('click', function (event) {
  let likeButtonIsPressed = event.target.className === "like-btn"
  //let delButtonIsPressed = event.target.className === "delete-btn"
  if (likeButtonIsPressed) {
    let id = event.target.parentElement.dataset.id
    let like = event.target.previousElementSibling
    let likeCount = parseInt(event.target.previousElementSibling.innerText)
    like.innerText = `${++likeCount} likes`
fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: likeCount
      })
    })
    .then(resp => resp.json())
  }
  
})