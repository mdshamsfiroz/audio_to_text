const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const transcriptionContainer = document.getElementById('transcription');
let recognition;

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        transcriptionContainer.innerHTML = `<p>${finalTranscript}</p>`;
    };

    recognition.start();
});

stopButton.addEventListener('click', () => {
    recognition.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
});
