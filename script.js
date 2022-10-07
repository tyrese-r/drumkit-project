let volume = 1
let pitch = 1

let isRecording = false;
let isPlaying = false;
let recordingStartedTime = 0;

let recordedSounds = []
// Play sound function
const playSound = (soundFileName) => {
    console.log(soundFileName)
    const sound = new Audio(`./assets/${soundFileName}.wav`)
    sound.play()


    // Get the name
    const name = soundFileName.replace('-', ' ')

    const soundTextElement = document.querySelector('#sound-text')
    soundTextElement.innerText = `${name[0].toUpperCase()}${name.slice(1)}`

    if (isRecording) {
        const recordingItem = {
            name: soundFileName,
            timeOffsetMs: Date.now() - recordingStartedTime
        }

        console.log(recordedSounds)
        recordedSounds.push(recordingItem)
    }
}

// Find all buttons with the button drum class
const drumButtons = document.querySelectorAll('.btn-drum')

// Add event listener to relevant sound for each one
drumButtons.forEach((btn) => {

    // Get id and remove number at the end
    const btnId = btn.id.replace(/-[1-9]+$/, '')

    btn.addEventListener('click', () => playSound(btnId))
})


const toggleRecording = () => {
    // If not recording
    if (!isRecording) {
        // Reset start time
        recordingStartedTime = Date.now()
        isRecording = true
        // Set border colour
        document.querySelector('.drum-image-grid').style['border-color'] = 'red'
        document.querySelector('.btn-record').innerText = 'Stop Recording'
        return
    }

    // If it is recording
    document.querySelector('.drum-image-grid').style['border-color'] = 'black'
    document.querySelector('.btn-record').innerText = 'Start Recording'

    // Toggle on/off
    isRecording = !isRecording

}

const togglePlay = () => {

    console.log(recordedSounds)
    // If it is playing then stop
    if (isPlaying) {
        isPlaying = false;
        document.querySelector('.btn-play').innerText = 'Play'
        return
    }
    if (recordedSounds.length <= 0){
        return
        // Do nothing if there is nothing recorded
    }

    document.querySelector('.btn-play').innerText = '\⏹'


    // If it is not playing

    // Stop recording if about to play
    if(isRecording) {toggleRecording()}

    isPlaying = true
    console.log('playing')
    
    recordedSounds.forEach((item) => {
        setTimeout(() => {
            if (isPlaying) {
                playSound(item.name)
            }
            // Play sound in (item.timeOffsetMs)
        }, item.timeOffsetMs)
    })

    // At the end stop
    setTimeout(() => {
        isPlaying = false
        console.log('ended')
        document.querySelector('.btn-play').innerText = 'Play'
    }, recordedSounds[recordedSounds.length-1].timeOffsetMs + 1)

    recordedSounds = []

    // Set
}


const recordButton = document.querySelector('.btn-record')
const playButton = document.querySelector('.btn-play')

recordButton.addEventListener('click', () => toggleRecording())
playButton.addEventListener('click', () => togglePlay())