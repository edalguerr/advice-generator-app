let speechSynthesis;
let speechSynthesisUtterance;
let voices;
let voiceDefault;

let request;
let adviceRes;

let adviceIdTitle;
let adviceText;

initializeDom();
initializeHttp();
intializeSpeechSynthesis(); 

getAdvice();


function initializeDom() {
    adviceIdTitle = document.getElementsByClassName("card-advice__advice-id")[0];
    adviceText = document.getElementsByClassName("card-advice__advice-text")[0];
}


function initializeHttp() {
    request = new XMLHttpRequest();
    request.onreadystatechange = requestDone;
}


function intializeSpeechSynthesis(){
    speechSynthesis = window.speechSynthesis;
    
    voices = speechSynthesis.getVoices();
    
    voiceDefault = voices.find((voice) => {
        return (voice.lang == "en-US" || voice.lang == "en_US");
    });

    /* support for chrome, opera */
    speechSynthesis.addEventListener("voiceschanged", () => {
        voices = speechSynthesis.getVoices()
    
        voiceDefault = voices.find((voice) => {
            return (voice.lang == "en-US" || voice.lang == "en_US");
        });
    
    })

}


function getAdvice() {
    /* idRandom is a number between 1 and 224 (maximum id of the last advice in the API, today: 30/03/2022)*/
    let idRandom = random(1, 224);
    request.open('GET', 'https://api.adviceslip.com/advice/'+ idRandom, true);
    request.send();        
}


function requestDone(aEvt) {
    if (request.readyState == 4) {
        if(request.status == 200) {
            adviceRes = JSON.parse(request.responseText).slip;
            adviceIdTitle.innerHTML = 'Advice #'+ adviceRes.id;
            adviceText.innerHTML = '“'+ adviceRes.advice +'”';        
            
            readAdvice({id: adviceRes.id, text: adviceRes.advice});
        } else {
            console.log("Error loading page\n");
        }        
    }
};


function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}


function readAdvice(advice){
    speechSynthesisUtterance = new SpeechSynthesisUtterance("Advice "+advice.id+". "+advice.text);
    speechSynthesisUtterance.voice = voiceDefault;
    
    /* speechSynthesisUtterance.pitch and speechSynthesisUtterance.rate representing a float value.
    It can range between 0 (lowest) and 2 (highest), with 1 being the default pitch and rate */
    speechSynthesisUtterance.pitch = 1.3;
    speechSynthesisUtterance.rate = 0.9;

    speechSynthesis.speak(speechSynthesisUtterance);
}