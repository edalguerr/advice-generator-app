let req;
let adviceIdTitle;
let adviceText;

initializeDom();
initializeHttp(); 
getAdvice();


function initializeDom() {
    adviceIdTitle = document.getElementsByClassName("card-advice__advice-id")[0];
    adviceText = document.getElementsByClassName("card-advice__advice-text")[0];
}


function initializeHttp() {
    req = new XMLHttpRequest();
    req.onreadystatechange = requestDone;
}


function getAdvice() {
    /* idRandom is a number between 1 and 224 */
    let idRandom = random(1, 224);
    req.open('GET', 'https://api.adviceslip.com/advice/'+ idRandom, true);
    req.send();        
}


function requestDone(aEvt) {
    if (req.readyState == 4) {
        if(req.status == 200) {
            let advice = JSON.parse(req.responseText).slip;
            adviceIdTitle.innerHTML = 'Advice #'+ advice.id;
            adviceText.innerHTML = '“'+ advice.advice +'”';        
        
        } else {
            console.log("Error loading page\n");
        }        
    }
};


function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}