function getData(url, category) {
    fetch(url)
        .then(response => response.json())
        .then(response => {
            if (response) {
                if (response.next !== null) {
                    let pageNumber = response.next.at(-1)
                    if (pageNumber === '2') {
                        pageNumber = '1'
                    } else {
                        pageNumber = (parseInt(response.next.at(-1)) - 1).toString()
                    }
                    localStorage.setItem((category + 'Page' + pageNumber), JSON.stringify(response))
                    getData(response.next, category)
                } else {
                    localStorage.setItem((category + 'Page' + url.at(-1)), JSON.stringify(response))
                }
            }
        })
}

function getPeopleData(page) {
    document.querySelector('.planetsCard').classList.add('hidden')
    document.querySelector('.vehicleCard').classList.add('hidden')
    const className = 'people-next';
    displayMessages(page, className)
}

function getVehicleData(page) {
    document.querySelector('.planetsCard').classList.add('hidden')
    document.querySelector('.peopleCard').classList.add('hidden')
    const className = 'vehicle-next';
    displayMessages(page, className)
}

function getPlanetData(page) {
    console.log(page)
    document.querySelector('.peopleCard').classList.add('hidden')
    document.querySelector('.vehicleCard').classList.add('hidden')
    const className = 'planets-next';
    displayMessages(page, className)
}

function replaceBtn(className) {
    const btnNextClass = className.cat + '-' + 'next';
    const btnClass = className.cat + '-' + 'back';
    const backBtn = document.querySelector(`.${btnClass}`);
    const classList = ['people', 'vehicle', 'planets'];
    const btnNext = document.querySelector(`.${btnNextClass}`);
    document.querySelector(`.${className.cat}`).classList.add('hidden')
    btnNext.classList.remove('hidden')
    backBtn.classList.remove('hidden')
    backBtn.addEventListener('click', function () {
        document.querySelector(`.${className.cat}`).classList.remove('hidden')
        document.querySelector('.details').innerHTML = ''
        classList.forEach(element => {
            if (element !== className.cat) {
                const n = element + 'Card'
                document.querySelector(`.${btnNextClass}`).classList.add('hidden')
                document.querySelector(`.${n}`).classList.remove('hidden')
            }
        })
        backBtn.classList.add('hidden')
        classList.forEach(element => {
            const e = element + '-' + 'next';
            document.querySelector(`.${e}`).removeAttribute('disabled')
        })
        document.querySelector('.details-messages').classList.add('hidden')
        document.querySelector('.details').classList.add('hidden')
        document.querySelector('.details-messages').innerHTML = ''
        document.querySelector('.details').innerHTML = ''
    })
}


function hidePrevMsg(target) {
    const parent = document.querySelector('.details-messages');
    const children = parent.children;
    for (let i = 0; i <= children.length - 1; i++) {
        if (!children[i].classList.contains('hidden')) {
            children[i].classList.add('hidden')
        }
    }
    parent.classList.remove('hidden')
    const ids = target.getAttribute('data-id');
    const e = document.getElementById(ids);
    if (e) {
        e.classList.remove('hidden')
    }
}

function getNextPage(event) {
    const classList = ['people-next', 'planets-next', 'vehicle-next'];
    classList.forEach(element => {
            const target = event.target.closest(`.${element}`);
            if (target) {
                let pageNumber = (parseInt(target.getAttribute('data-page').at(-1)) + 1).toString();
                let pageName;
                if (element === 'people-next') {
                    pageName = 'peoplePage';
                } else if (element === 'planets-next') {
                    pageName = 'planetsPage';
                } else if (element === 'vehicle-next') {
                    pageName = 'vehiclePage';
                }
                let count = 0;
                for (let i = 1; i < 100; i++) {
                    if (JSON.parse(localStorage.getItem(pageName + i.toString()))) {
                        count++
                    }
                }
                if (parseInt(pageNumber.at(-1)) <= count) {
                    if (pageName === 'peoplePage') {
                        getPeopleData(pageName + pageNumber)
                    } else if (pageName === 'vehiclePage') {
                        getVehicleData(pageName + pageNumber)
                    } else if (pageName === 'planetsPage') {
                        getPlanetData(pageName + pageNumber)
                    }
                }
                if (parseInt(pageNumber.at(-1)) == count) {
                    document.querySelector(`.${element}`).setAttribute('disabled', 'disabled')
                }
            }
        }
    )
}

function displayMessages(page, className) {
    document.querySelector('.details').classList.remove('hidden')
    const gridInfo = document.querySelector('.details');
    const gridInfo2 = document.querySelector('.details-messages');
    const localData = JSON.parse(localStorage.getItem(page));
    let message1;
    let message2;
    if (localData) {
        gridInfo.innerHTML = '';
        gridInfo2.innerHTML = '';
        localData.results.forEach(element => {
            if (className === 'people-next') {
                message1 = `<p>                                 
                            <button type="button" data-id=${element.name} class="btn btn-light btn-people"><b>${element.name}</b></button>
                        </p>`;
                message2 = `<div id=${element.name} class="people-info hidden">
                                    <p><b>Name: ${element.name}</b></p>
                                    <p>Height: ${element.height}</p>
                                    <p>Mass: ${element.mass}</p>
                                    <p>Hair color: ${element.hair_color}</p>
                                    <p>Skin color: ${element.skin_color}</p>
                                    <p>Eye color: ${element.eye_color}</p>
                                    <p>Birth year: ${element.birth_year}</p>
                                    <p>Gender: ${element.gender}</p>
                               </div>`;
            } else if (className === 'vehicle-next') {
                message1 = `<p>
                            <button type="button" data-id=${element.name} class="btn btn-light btn-vehicle"><b>${element.name}</b></button>
                        </p>`;
                message2 = `<div id=${element.name} class="vehicle-info hidden">
                                    <p><b>Model: ${element.model}</b></p>
                                    <p>Manufacturer: ${element.manufacturer}</p>
                                    <p>Cost in credits: ${element.cost_in_credits}</p>
                                    <p>Length: ${element.length}</p>
                                    <p>Max Atmosphering Speed: ${element.max_atmosphering_speed}</p>
                                    <p>Crew: ${element.crew}</p>
                                    <p>Passengers: ${element.passengers}</p>
                                    <p>Cargo Capacity: ${element.cargo_capacity}</p>
                               </div>`;
            } else if (className === 'planets-next') {
                message1 = `<p>
                          <button type="button" data-id=${element.name} class="btn btn-light btn-planet ${element.name}"><b>${element.name}</b></button>
                        </p>`;
                message2 = `<div id=${element.name} class="planets-info hidden">
                                    <p><b>Rotation Period: ${element.rotation_period}</b></p>
                                    <p>Orbital Period: ${element.orbital_period}</p>
                                    <p>Diametr: ${element.diameter}</p>
                                    <p>Climate: ${element.climate}</p>
                                    <p>Gravity: ${element.gravity}</p>
                                    <p>Terrain: ${element.terrain}</p>
                                    <p>Surface Water: ${element.surface_water}</p>
                                    <p>Popoulation: ${element.population}</p>
                               </div>`;
            }
            document.querySelector(`.${className}`).setAttribute('data-page', page)
            gridInfo.innerHTML += message1;
            gridInfo2.innerHTML += message2;
        })
    }
}


