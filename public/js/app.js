const searchForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.getElementById('message-one')
const messageTwo = document.getElementById('message-two')

searchForm.addEventListener('submit', (e) => {

    e.preventDefault()

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    const url = `/weather?address=${searchInput.value}`

    fetch(url).then((res) => {

        res.json().then(({ error, location, forecast }) => {

            if (error) {

                messageOne.textContent = error

            } else {

                messageOne.textContent = location
                messageTwo.innerHTML = `${forecast.description}.<br>It is ${forecast.temperature}ºC. Feels like ${forecast.feelsLike}ºC`
            }
        })
    })
})