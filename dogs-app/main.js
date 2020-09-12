async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json();
        createBreedList(data.message)
    }
    catch(e) {
        console.log("There was a problem fetching the breed list");
    }
}

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option>Choose a Dog breed</option>
        ${Object.keys(breedList).map(function(breed) {
            return `<option>${breed}</option>`
        }).join('')}      
    </select>
    `
}

async function loadByBreed(breed) {
    if (breed != "Choose a Dog breed") {
        const response = await fetch("https://dog.ceo/api/breed/" + breed + "/images")
        const data = await response.json()
        createSlideShow(data.message)
    }
}

function createSlideShow(imageList) {
    let currentPosition = 0;
    if (imageList.length == 1) {
        document.getElementById("slideshow").innerHTML = `
            <div class="slide" style="background-image: url(${imageList[0]})"></div>
            <div class="slide"></div>
        `
    }
    document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url(${imageList[0]})"></div>
        <div class="slide" style="background-image: url(${imageList[1]})"></div>
    `
    if (imageList.length == 2) {
        currentPosition = 0;
    }
    else { 
        currentPosition += 2;
    }
    setInterval(nextSlide, 3000);
    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${imageList[currentPosition]}')"></div>`)
        setTimeout(function() {
           document.querySelector(".slide").remove();
        }, 1000)
        currentPosition++;
        if (currentPosition == imageList.length) {
            currentPosition = 0;
        }
    }
}

start()