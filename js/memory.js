





//document.querySelector("#ShowButton").innerHTML = 'Bajs'


function createWordsNew() {

    removeGameNew()

    const gridDiv = document.createElement("div");
    gridDiv.setAttribute("id", "gridGame");

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

}


function createWords() {


    var gameElem = document.getElementById("gameTitle")
    gameElem.innerHTML = 'Remember these words'
    gameElem.style.fontSize = settingsFontSize + 'px';

    
    //removeGameNew()
    //removeGame()

    for (var i=0; i<numWords; i++){

        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "memoryText");
        
        newDiv.style.color = '#E8A800';
        
        // So fix color of title, check numwords error etc

        newDiv.innerHTML = wordList[i];
        newDiv.style.fontSize = settingsFontSize + 'px';
        console.log(newDiv.style.fontSize, settingsFontSize);
        //const newContent = document.createTextNode(wordList[i]);
        //newContent.style.fontSize = settingsFontSize;
        //newDiv.appendChild(newContent);
        const currentDiv = document.getElementById("endOfGame");
        document.body.insertBefore(newDiv, currentDiv);

    }
    var btnElem = document.getElementsByClassName("submitBtn")
    btnElem[0].innerText = 'Done';
}


function removeGameNew() {
    var element = document.getElementById("gridGame");
    element.remove();

    
}

function removeGame() {

    var element = document.getElementsByClassName("memoryText");
    var elemLength = element.length 
    for (var i=0; i<elemLength; i++){
        element[0].remove();
    }

    var element = document.getElementsByClassName("answerText");
    var elemLength = element.length 
    for (var i=0; i<elemLength; i++){
        element[0].remove();
    }

}


function obtainGuessNew() {

    removeGameNew()

    const gridDiv = document.createElement("div");
    gridDiv.setAttribute("id", "gridGame");

    titleDiv = document.createElement("div");
    titleDiv.setAttribute("id", "gridGameTitleText");
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

    var btnElem = document.getElementsByClassName("submitBtn")
    btnElem[0].innerText = 'Submit';
}

function obtainGuess() {

    document.getElementById("gameTitle").innerHTML = 'Which words can you remember?'

    var element = document.getElementsByClassName("memoryText");
    var elemLength = element.length 
    removeGameNew()
    //removeGame()

    for (var i=0; i< elemLength; i++){
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "answerText");
        
        const gameInfo = document.createElement("label");
        gameInfo.innerHTML = i;
        gameInfo.style.fontSize = settingsFontSize + 'px';
        gameInfo.style.color = '#E8A800';

        var answer = document.createElement("input");
        answer.type = "text";
        answer.id = 'answer' + i;

        answer.style.fontSize = settingsFontSize + 'px';
        //answer.style.width = '35%'

        newDiv.append(gameInfo);
        newDiv.appendChild(answer);
        const currentDiv = document.getElementById("endOfGame");
        
        document.body.insertBefore(newDiv, currentDiv);
    }

   
    
    var btnElem = document.getElementsByClassName("submitBtn")
    btnElem[0].innerText = 'Submit';

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
    resString = resString + ' Time taken: ' + ((endTime - startTime)/1000) + 's.';
    
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "memoryText");
    newDiv.innerHTML = resString;
    newDiv.style.fontSize = settingsFontSize + 'px';
    newDiv.style.color = '#E8A800';

    //const newContent = document.createTextNode(resString);
    //newDiv.appendChild(newContent);
    const currentDiv = document.getElementById("endOfGame");
    document.body.insertBefore(newDiv, currentDiv);

    var btnElem = document.getElementsByClassName("submitBtn")
    btnElem[0].innerText = 'Play again';
}


function switchMode(){
    if (wordsShowing == 0) {
        //obtainGuess();
        obtainGuessNew();
        wordsShowing = 1;
    } else if (wordsShowing == 1){
        endTime = new Date();
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

    changeGameScreen('wordGame')
}


function changeGameScreen(nextScrn){
    if (nextScrn == 'wordGame'){
        
        startTime = new Date();


        //dropZone.style.display = 'none';
        var settingsElem = document.getElementById('settingsScreen');
        settingsElem.style.display = 'none';
        var wrapElem = document.getElementById('wrapper');
        wrapElem.style.display = 'flex';
        //createWords();
        createWordsNew();
    }
    else if (nextScrn == 'settings'){

        

        var dropZone = document.getElementById('drop_zone');
        dropZone.style.display = 'none';
        var settingsElem = document.getElementById('settingsMenu');
        settingsElem.style.display = 'grid';
        var settingsElem = document.getElementById('settingsTitle');
        settingsElem.style.display = 'flex';

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
