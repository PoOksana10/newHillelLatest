document.addEventListener('DOMContentLoaded', () => {
    const categories = [
        {'cat': 'people', 'url': 'https://swapi.dev/api/people/'},
        {'cat': 'vehicle', 'url': 'https://swapi.dev/api/vehicles/'},
        {'cat': 'planets', 'url': 'https://swapi.dev/api/planets/'},
    ] ;
    const people = localStorage.getItem('peoplePage1') ;
    const vehicle = localStorage.getItem('vehiclePage1') ;
    const planets = localStorage.getItem('planetsPage1') ;
    if (people === null || vehicle === null || planets === null) {
        categories.forEach(element => {
            getData(element.url, element.cat)
        })
    }
})

document.addEventListener('click', (event) => {
    getNextPage(event)
})

document.querySelector('.people').addEventListener('click', () => {
    replaceBtn({'cat': 'people'})
    getPeopleData('peoplePage1')

})

document.querySelector('.vehicle').addEventListener('click', function () {
    replaceBtn({'cat': 'vehicle'})
    getVehicleData('vehiclePage1')

})

document.querySelector('.planets').addEventListener('click', function () {
    replaceBtn({'cat': 'planets'})
    getPlanetData('planetsPage1')

})

document.addEventListener('click', (event) => {
    const target = event.target.closest('.btn-people') ;
    if (target) {
        hidePrevMsg(target)
    }
})

document.addEventListener('click', (event) => {
    const target = event.target.closest('.btn-vehicle') ;
    if (target) {
        hidePrevMsg(target)
    }
})

document.addEventListener('click', (event) => {
    const target = event.target.closest('.btn-planet') ;
    if (target) {
        hidePrevMsg(target)
    }
})