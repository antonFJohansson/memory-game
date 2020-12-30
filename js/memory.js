





//document.querySelector("#ShowButton").innerHTML = 'Bajs'
function endGameByTime() {
    wordsShowing = 0;
    switchMode();    
}

function updateTimer() {
    if (wordsShowing == 0) {
        var fullGameTime = settingsNumWords*settingsTimePerWord*1000;
        var currTime = new Date();
        var timeElem = document.getElementById("gridGameTitleTime")  
        //console.log(timeElem,timeElem.innerHTML);
        timeElem.innerHTML = Math.round((fullGameTime - (currTime - startTime))/1000) + ' s';
    //    console.log(timeElem.innerHtml);
        window.setTimeout(updateTimer, 100);
    }
}


function createWordsNew() {

    removeGameNew()
    let timeForGame = settingsNumWords*settingsTimePerWord*1000;

    const gridDiv = document.createElement("div");
    gridDiv.setAttribute("id", "gridGame");

    timeDiv = document.createElement("div");
    timeDiv.setAttribute("id", "gridGameTitleTime");
    timeDiv.innerHTML =  timeForGame/1000 + ' s';
    gridDiv.appendChild(timeDiv);

    titleDiv = document.createElement("div");
    titleDiv.setAttribute("id", "gridGameTitleText");
    titleDiv.innerHTML = 'Remember these words';
    gridDiv.appendChild(titleDiv);


    for (var i=0; i<numWords; i++){
        wordDiv = document.createElement("div");
        wordDiv.setAttribute("class", "wordGrid");
        wordDiv.innerHTML = wordList[i];
        gridDiv.appendChild(wordDiv);
    }

    gridDiv.style.fontSize = settingsFontSize + 'px';


    const currentDiv = document.getElementById("endOfGame");
    document.body.insertBefore(gridDiv, currentDiv);

    endGameByTimeId = window.setTimeout(endGameByTime, timeForGame);
    window.setTimeout(updateTimer, 200);

    var btnElem = document.getElementById("submitBtn")
    btnElem.innerText = 'Done';

}




function removeGameNew() {

    var element = document.getElementById("gridGame");
    console.log(element)
    
    if (element) {
    element.remove();

    var element = document.getElementsByClassName("memoryText");
    if (element.length >0){
        element[0].remove();
    }
    
    
    }
    window.clearTimeout(endGameByTimeId);
}




function obtainGuessNew() {

    removeGameNew()

    const gridDiv = document.createElement("div");
    gridDiv.setAttribute("id", "gridGame");

    titleDiv = document.createElement("div");
    titleDiv.setAttribute("id", "gridGameAnswerText");
    titleDiv.innerHTML = 'Which words can you remember?';
    gridDiv.appendChild(titleDiv);

    for (var i=0; i<numWords; i++){
        labelDiv = document.createElement("div");
        labelDiv.innerHTML = i + ':';
        labelDiv.className = "gridLabel";
        gridDiv.appendChild(labelDiv);

        

        inputDiv = document.createElement("div");
        inputDiv.setAttribute("class", "inputGrid");
        var answer = document.createElement("input");
        answer.type = "text";
        answer.id = 'answer' + i;
        answer.className = 'gridInputForm';
        answer.style.fontSize = settingsFontSize + 'px';
        inputDiv.appendChild(answer);
        gridDiv.appendChild(inputDiv);

    }

    gridDiv.style.fontSize = settingsFontSize + 'px';


    const currentDiv = document.getElementById("endOfGame");
    document.body.insertBefore(gridDiv, currentDiv);

    var btnElem = document.getElementById("submitBtn")
    btnElem.innerText = 'Submit';
}



function checkAnswer(){

    var trueAnswers = wordList;

    var numCorr = 0;
    var writtenAnswer;
    for (var i=0; i < numWords; i++){
        userAnswer = document.getElementById('answer' + i);
        
        //console.log(userAnswer);
        writtenAnswer = userAnswer.value.toLowerCase();
        //console.log(writtenAnswer== trueAnswers[i].toLowerCase().trim(), trueAnswers[i].length)
        
        if (writtenAnswer == trueAnswers[i].toLowerCase()) {
            numCorr = numCorr + 1;
            userAnswer.style.backgroundColor = '#4CFA7D';
        } else {
            userAnswer.style.backgroundColor = '#FA3261';
        }
    }

    var resString = '';
    resString = "Score: " + numCorr + ' / ' + numWords + '.';
    resString = resString + ' Time taken: ' + (Math.round((endTime - startTime)/100))/10 + 's.';
    
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "memoryText");
    newDiv.innerHTML = resString;
    newDiv.style.fontSize = settingsFontSize + 'px';
    newDiv.style.color = '#E8A800';

    //const newContent = document.createTextNode(resString);
    //newDiv.appendChild(newContent);
    const currentDiv = document.getElementById("endOfGame");
    document.body.insertBefore(newDiv, currentDiv);

    var btnElem = document.getElementById("submitBtn")
    btnElem.innerText = 'Play again';
}


function switchMode(){
    if (wordsShowing == 0) {
        //obtainGuess();
        wordsShowing = 1;
        endTime = new Date();
        obtainGuessNew();
        
    } else if (wordsShowing == 1){
        checkAnswer();
        wordsShowing = 2;
    } else {
        startTime = new Date();
        createWordsNew();
        //createWords();
        wordsShowing = 0;
        //console.log(storeText)
    }
    
    
}



var storeText;
function handleFileSelect(evt) {
    var dropZone = document.getElementById('drop_zone');
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    let reader = new FileReader();

    
    reader.readAsText(files[0]);
    reader.onload = function() {
        // And then we can load the game here?
        // Or the setting maybe?
        storeText =reader.result.split('\n');

        // Clean up some whitespace
        for (var u=0; u<storeText.length; u++)
        {
            storeText[u] = storeText[u].trim();
        }

        

        wordList = storeText;
        numWords = storeText.length
        console.log(numWords)
        changeGameScreen('settings')

      };
      
  
}
function handleDragOver(evt) {
    var dropZone = document.getElementById('drop_zone');
    dropZone.style.backgroundColor = '#393c44';
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

function handleDragLeave(evt) {
    var dropZone = document.getElementById('drop_zone');
    dropZone.style.backgroundColor = '#2D3240';
}


function setFontSize() {
    var settingsFontSizeElem = document.getElementById('fontSizeField');
    var settingsExampleText = document.getElementById('settingsExampleText');
    settingsFontsize = Math.min(settingsFontSizeElem.value, 50);
    settingsFontsize = Math.max(settingsFontsize, 5);
    settingsFontSizeElem.value = settingsFontsize;
    settingsExampleText.style.fontSize = settingsFontsize + 'px';
    
}

function setSettingsWords() {
    var settingsNumWordsElem = document.getElementById('numWordsField');
    settingsNumWordsElem.max = numWords
    

    var settingsNumWordsText = document.getElementById('numWordsText');
    settingsNumWordsText.innerHTML = numWords;
    
    settingsNumWords = Math.min(settingsNumWordsElem.value, numWords);
    settingsNumWords = Math.max(settingsNumWords, 1);
    settingsNumWordsElem.value = settingsNumWords;
    
}

function setSettingsDuration() {
    var settingsDurationElem = document.getElementById('durationField');
    
    settingsTimePerWord = Math.max(settingsDurationElem.value, 1);
    settingsDurationElem.value = settingsTimePerWord;
    
}


function settingsBtn() {

    var settingsDurationElem = document.getElementById('durationField');
    var settingsNumWordsElem = document.getElementById('numWordsField');
    var settingsFontSizeElem = document.getElementById('fontSizeField');

    

    settingsTimePerWord = settingsDurationElem.value;
    settingsNumWords = settingsNumWordsElem.value;
    settingsFontSize = settingsFontSizeElem.value;
    wordsShowing = 0;
    changeGameScreen('wordGame')
}

// Main issue is straight from game back to settings
// Then there is an issue with the updating timer

function goBackToSettings() {
    window.clearTimeout(endGameByTimeId);
    wordsShowing = 1;
    removeGameNew();
    var elem = document.getElementById("gridBtnWrap");
    elem.style.display = 'none';
    changeGameScreen('settings');
}



function changeGameScreen(nextScrn){
    if (nextScrn == 'wordGame'){
        var settingsElem = document.getElementById('settingsScreen');
        settingsElem.style.display = 'none';
        startTime = new Date();


        //dropZone.style.display = 'none';
        var settingsElem = document.getElementById('settingsScreen');
        settingsElem.style.display = 'none';
        var wrapElem = document.getElementById('gridBtnWrap');
        wrapElem.style.display = 'grid';
        //createWords();
        createWordsNew();
    }
    else if (nextScrn == 'settings'){

        var dropZone = document.getElementById('drop_zone');
        dropZone.style.display = 'none';
        var settingsElem = document.getElementById('settingsScreen');
        settingsElem.style.display = 'grid';

        setSettingsWords();


    } else if (nextScrn == 'dropWordFile') {
        var dropZone = document.getElementById('drop_zone');
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('dragleave', handleDragLeave, false);
        dropZone.addEventListener('drop', handleFileSelect, false);
    }
}



  // Change color back when file is dropped.


  // Setup the dnd listeners.



var wordsShowing = 0;
var numWords;
var startTime, endTime;
var wordList;
var endGameByTimeId;

var settingsNumWords;
var settingsTimePerWord;
var settingsFontSize;

numWords = 3;
wordList = ['Hejsan', 'Dat', 'Ar']

// REMOVE EVERYTHING BELOW HERE TO GET THE GAME
// THIS IS TO DEBUG THE GAME
/* dropZone.style.backgroundColor = '#1BBBF5';
dropZone.style.display = 'none';

var wrapElem = document.getElementById('wrapper');
wrapElem.style.display = 'flex';

startTime = new Date();

wordList = ['Hej', 'Svej'];
numWords = wordList.length


createWords() */
// END OF COMMENTED FOR DEBUGGING GAME //

//changeGameScreen('dropWordFile')
changeGameScreen('settings')


/* 
var wordsShowing = 0;
var numWords = 2;
var startTime, endTime;

startTime = new Date();

createWords() */
