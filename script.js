// Play sound function
const playSound = (soundFileName) => {
    console.log(soundFileName)
    const sound = new Audio(`./assets/${soundFileName}.wav`)
    sound.play()


    // Get the name
    const name = soundFileName.replace('-',' ');

    const soundTextElement = document.querySelector('#sound-text')
    soundTextElement.innerText = `${name[0].toUpperCase()}${name.slice(1)}`
}

// Find all buttons with the button drum class
const drumButtons = document.querySelectorAll('.btn-drum')

// Add event listener to relevant sound for each one
drumButtons.forEach((btn) => {

    // Get id and remove number at the end
    const btnId = btn.id.replace(/-[1-9]+$/, '')

    btn.addEventListener('click', () => playSound(btnId))
    btn.addEventListener('mouseover', () => console.log(btn))
})