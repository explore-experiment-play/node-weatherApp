console.log('loaded js file')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector("#one")
const messageTwo = document.querySelector("#two")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    messageOne.textContent = "fetching..."
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.weatherData
            }
        })
    })

})