let store = {
    user: { name: "Yousef Taj" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { rovers, apod } = state

    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                
            </section>
            <section>
            <button id="curiosity" onclick="retrieverover(event, getRoverImages)">Curiosity</button>
            <button id="spirit" onclick="retrieverover(event, getRoverImages)">Spirit</button>
            <button id="opportunity" onclick="retrieverover(event, getRoverImages)">Opportunity</button>
            </section>
            <section>
            ${(!store.apod.photos) ? "" : displayJourneyData(displayRoverData, displayRoverImages)}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

function retrieverover(e, callback) {
    callback(e.target.id);
}

function displayJourneyData(callback1, callback2) {
    return callback1() + `<section class="images">${callback2()}</section>`;
}

function displayRoverData() {
    const rover = !store.apod.photos ? "" : store.apod.photos[0].rover;
    return `
    <section>
    <p><bold>Landing Date: </bold>${rover.landing_date}</p>
    <p><bold>Launch Date: </bold>${rover.launch_date}</p>
    <p><bold>Rover: </bold>${rover.name}</p>
    <p><bold>Status: </bold>${rover.status}</p>
    <p><bold>Images Date: </bold>${!store.apod.photos ? "" : store.apod?.photos[0].earth_date}</p>
    </section>`
}

function displayRoverImages() {
    const images = store.apod.photos?.map((photo) => photo.img_src);
    return images?.map((image) => `<img src=${image} class="image" width="300px" height="300px" />`).join("")
}

const getRoverImages = (rover) => {
    fetch(`http://localhost:3000/rovers/${rover}`)
    .then(response => response.json())
    .then(apod => updateStore(store, { apod }));
}