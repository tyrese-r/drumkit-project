// Play sound function
const playSound = (soundFileName) => {
    const sound = new Audio(`./assets/${soundFileName}.wav`)
    sound.play()
}

// Find all buttons with the button drum class
const drumButtons = document.querySelectorAll('.btn-drum')

// Add event listener to relevant sound for each one
drumButtons.forEach((btn) => {
    // Get sound name from id then run function when clicked
    btn.addEventListener('click', () => playSound(btn.id))
})