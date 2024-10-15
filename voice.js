
        function activateVoiceAssistant() {
            document.querySelector('.voice').style.display = 'flex';
            startVoiceRecognition();
        }

        function closeVoiceAssistant() {
            document.querySelector('.voice').style.display = 'none';
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.continuous = false;

        const transcriptText = document.getElementById('transcriptText');

        recognition.onstart = function () {
            transcriptText.textContent = "Listening...";
        };

        recognition.onresult = function (event) {
            let interimTranscript = "";
            for (let i = 0; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                interimTranscript += transcript;
            }
            transcriptText.textContent = interimTranscript;
        };

        recognition.onend = function () {
            let finalText = transcriptText.textContent;
            transcriptText.textContent = "Click the microphone to start again.";
            giveResponse(finalText);
        };

        function startVoiceRecognition() {
            recognition.start();
        }

        function giveResponse(inputText) {
            let responseText = getResponseText(inputText);
            const speechSynthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(responseText);
            speechSynthesis.speak(utterance);
            pageOpener(inputText);
        }

        function pageOpener(inputText) {
            if (inputText.toLowerCase().includes("weather")) {
                window.open('weather.html', '_self');
            } else if (inputText.toLowerCase().includes("sos")) {
                window.open('SOS.html', '_self');
            } else if (inputText.toLowerCase().includes("medivault")) {
                window.open('medivault.html', '_self');
            } else if (inputText.toLowerCase().includes("news")) {
                window.open('guide.html', '_self');
            } else if (inputText.toLowerCase().includes("home")) {
                window.open('index.html', '_self');
            } else if (inputText.toLowerCase().includes("natural disaster")) {
                window.open('guide.html', '_self');
            } else if (inputText.toLowerCase().includes("medical documents")) {
                window.open('medivault.html', '_self');
            } else if (inputText.toLowerCase().includes("i am in danger")) {
                window.open('sos.html', '_self');
            } else if (inputText.toLowerCase().includes("save me")) {
                window.open('sos.html', '_self');
            } else {
                console.log("No matching page for input.");
            }
        }

        function getResponseText(inputText) {
            if (inputText.toLowerCase().includes("weather")) {
                return "Opening weather page.";
            } else if (inputText.toLowerCase().includes("sos")) {
                return "Taking you to the SOS page.";
            } else if (inputText.toLowerCase().includes("medivault")) {
                return "Opening MediVault.";
            } else if (inputText.toLowerCase().includes("news")) {
                return "Opening news updates.";
            } else if (inputText.toLowerCase().includes("home")) {
                return "Going back to home.";
            } else if (inputText.toLowerCase().includes("natural disaster")) {
                return "Opening disaster information.";
            } else if (inputText.toLowerCase().includes("medical documents")) {
                return "Opening your medical documents.";
            } else if (inputText.toLowerCase().includes("i am in danger")) {
                return "Sending an SOS signal.";
            } else if (inputText.toLowerCase().includes("save me")) {
                return "Sending an SOS signal.";
            } else {
                return "I did not understand that.";
            }
        }