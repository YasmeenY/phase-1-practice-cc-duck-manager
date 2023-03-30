document.addEventListener("DOMContentLoaded",()=> {
    showDucks()
    newDuckEvent()
})

function showDucks(){
    fetch("http://localhost:3000/ducks")
    .then(response => response.json())
    .then(ducks => {
        ducks.forEach(duck => {
            renderDucks(duck)
        })
    })
}

function renderDucks(duck){
    const duckNav = document.getElementById("duck-nav")
    const duckImage = document.createElement("img")
    const duckDivs = document.createElement("div")

    duckImage.src = duck.img_url

    duckNav.append(duckDivs)
    duckDivs.append(duckImage)

    duckImage.addEventListener("click", ()=> {
        showDuckDetails(duck)
    })
}

function showDuckDetails(duck){
    const duckName = document.getElementById("duck-display-name")
    const duckImageDetail = document.getElementById("duck-display-image")
    const duckLikesDetail = document.getElementById("duck-display-likes")

    duckName.textContent = duck.name
    duckImageDetail.src = duck.img_url
    duckLikesDetail.textContent = `${duck.likes} Likes`

    duckLikesDetail.addEventListener("click", ()=>duckLikes(duck,duckLikesDetail))
}

function newDuck(){
    const newDuckName = document.getElementById("new-name").value
    const newDuckImage = document.getElementById("new-image").value

    duckData = {
        "name": newDuckName,
        "img_url": newDuckImage,
        "likes": 0
    }

    fetch("http://localhost:3000/ducks", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(duckData)
    })
    .then(response => response.json())
    .then(() => {
        renderDucks(duckData)
        showDuckDetails(duckData)
    })
    .catch((err) => console.error('Error:', err))
}

function newDuckEvent(){
    const duckForm = document.getElementById("new-duck-form")
    duckForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        newDuck()
        duckForm.reset()
    })
}

function duckLikes(duck, duckLikesDetail){
    // let updatedDuck = {...duck}

    fetch(`http://localhost:3000/ducks/${duck.id}`,{
        method:"PATCH",
        headers: {
            "content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "likes": duck.likes += 1
        })
    })
    .then(response => response.json())
    .then(likesData => {
        duckLikesDetail.textContent = `${likesData.likes} Likes`
    })
}
