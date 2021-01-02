





//document.querySelector("#ShowButton").innerHTML = 'Bajs'

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


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

    // We should choose a random subset of the words here

    //console.log(wordList, shuffle(wordList));
    //console.log(wordList);
    
    for (var i=0; i<numWords; i++){
        shuffledIds[i] = i;
    }

    shuffle(shuffledIds);


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


    for (var i=0; i<settingsNumWords; i++){
        wordDiv = document.createElement("div");
        wordDiv.setAttribute("class", "wordGrid");
        currId = shuffledIds[i];
        wordDiv.innerHTML = wordList[currId];
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
    //console.log(element)
    
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

    for (var i=0; i<settingsNumWords; i++){
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

    var trueAnswers = [];
    for (var i=0; i< numWords; i++){
        currInd = shuffledIds[i];
        trueAnswers[i] = wordList[currInd];
    }

    //console.log(trueAnswers);
    var numCorr = 0;
    var writtenAnswer;
    for (var i=0; i < settingsNumWords; i++){
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
    resString = "Score: " + numCorr + ' / ' + settingsNumWords + '.';
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
        //console.log(numWords)
        changeGameScreen('settings')

      };
      
  
}

function handleDragOver(evt) {
    var dropZone = document.getElementById('drop_zone');
    dropZone.style.backgroundColor = '#393c44';
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

    var dropTextHere = document.getElementById('dropHereId');
    dropTextHere.classList.add('dropHereAnimForward');

    
    var dropTextDrop = document.getElementById('dropDropId');
    dropTextDrop.classList.add('dropDropAnim');

  }

function handleDragLeave(evt) {
    var dropZone = document.getElementById('drop_zone');
    dropZone.style.backgroundColor = '#2D3240';

    var dropTextHere = document.getElementById('dropHereId');
    dropTextHere.classList.remove('dropHereAnimForward');

    var dropTextDrop = document.getElementById('dropDropId');
    dropTextDrop.classList.remove('dropDropAnim');
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

// Here now

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


/*
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

*/

  // Change color back when file is dropped.


  // Setup the dnd listeners.


/*
var wordsShowing = 0;
var numWords;
var startTime, endTime;
var wordList;
var endGameByTimeId;

var settingsNumWords;
var settingsTimePerWord;
var settingsFontSize;

var shuffledIds = [];

numWords = 3;
wordList = ['Hejsan', 'Dat', 'Ar']
*/


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

this.wordGameHandleFileSelect = function(evt) {
    var dropZone = document.getElementById('drop_zone');
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    // The issue is that the this of this one takes over I think?
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

        

        //wordList = storeText;
        //numWords = storeText.length;


        myGame.wordList = storeText;
        myGame.numWords = storeText.length;
        myGame.changeGameScreen('settings')
        //console.log(this.changeGameScreen);
        //console.log(this);
        //this.changeGameScreen('settings')

    };


}

this.wordGameHandleDragOver = function(evt) {
var dropZone = document.getElementById('drop_zone');
dropZone.style.backgroundColor = '#393c44';
evt.stopPropagation();
evt.preventDefault();
evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

var dropTextHere = document.getElementById('dropHereId');
dropTextHere.classList.add('dropHereAnimForward');


var dropTextDrop = document.getElementById('dropDropId');
dropTextDrop.classList.add('dropDropAnim');

}

this.wordGameHandleDragLeave = function(evt) {
var dropZone = document.getElementById('drop_zone');
dropZone.style.backgroundColor = '#2D3240';

var dropTextHere = document.getElementById('dropHereId');
dropTextHere.classList.remove('dropHereAnimForward');

var dropTextDrop = document.getElementById('dropDropId');
dropTextDrop.classList.remove('dropDropAnim');
}




function memorizeWordsGame() {
    
    this.wordsShowing = 0;

    this.numWords;
    this.startTime;
    this.endTime;
    this.wordList;
    this.endGameByTimeId;
    
    this.settingsNumWords;
    this.settingsTimePerWord;
    this.settingsFontSize;

    this.storeText;
    
    this.shuffledIds = [];
    
    this.numWords = 3;
    this.wordList = ['Hejsan', 'Dat', 'Ar']

    //document.getElementsByClassName('settingsBtn')[0].onclick = function(){this.settingsBtn()};
    //document.getElementById('settingsBtn').onclick = this.settingsBtn;

    
    this.endGameByTime = function() {
        myGame.wordsShowing = 0;
        myGame.switchWordGameMode();    
    }
    
    // I cannot have this in this function 
        // Because when we pass it through window.setTimeout then it will inherit from a
        // different this.
    this.updateTimer = function() {
        if (myGame.wordsShowing == 0) {
            var fullGameTime = myGame.settingsNumWords*myGame.settingsTimePerWord*1000;
            var currTime = new Date();
            var timeElem = document.getElementById("gridGameTitleTime")  
            timeElem.innerHTML = Math.round((fullGameTime - (currTime - myGame.startTime))/1000) + ' s';
            window.setTimeout(myGame.updateTimer, 100);
        }
    }

    this.createWords = function() {

            this.removeGame()
            let timeForGame = this.settingsNumWords*this.settingsTimePerWord*1000;
            
            // Create shuffled ids for a random word list each time
            for (var i=0; i<this.numWords; i++){
                this.shuffledIds[i] = i;
            }
        
            shuffle(this.shuffledIds);
        
        
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
        
            // Create the word list
            for (var i=0; i<this.settingsNumWords; i++){
                wordDiv = document.createElement("div");
                wordDiv.setAttribute("class", "wordGrid");
                currId = this.shuffledIds[i];
                wordDiv.innerHTML = this.wordList[currId];
                gridDiv.appendChild(wordDiv);
            }
        
            gridDiv.style.fontSize = this.settingsFontSize + 'px';
        
            const currentDiv = document.getElementById("endOfGame");
            document.body.insertBefore(gridDiv, currentDiv);
        
            this.endGameByTimeId = window.setTimeout(this.endGameByTime, timeForGame);
            window.setTimeout(this.updateTimer, 200);
        
            var btnElem = document.getElementById("submitBtn")
            btnElem.innerText = 'Done';
        
    }

    this.removeGame = function() {

            var element = document.getElementById("gridGame");
            
            // To avoid issues when we clear the board and nothing is present.
            if (element) {
                element.remove();
            
                var element = document.getElementsByClassName("memoryText");
                if (element.length >0){
                    element[0].remove();
            }
            
            
            }
            window.clearTimeout(this.endGameByTimeId);
    }

        this.obtainGuess = function() {

            this.removeGame();
        
            const gridDiv = document.createElement("div");
            gridDiv.setAttribute("id", "gridGame");
        
            titleDiv = document.createElement("div");
            titleDiv.setAttribute("id", "gridGameAnswerText");
            titleDiv.innerHTML = 'Which words can you remember?';
            gridDiv.appendChild(titleDiv);
        
            // Create text fields to input words
            for (var i=0; i<this.settingsNumWords; i++){
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
                answer.style.fontSize = this.settingsFontSize + 'px';
                inputDiv.appendChild(answer);
                gridDiv.appendChild(inputDiv);
        
            }
        
            gridDiv.style.fontSize = this.settingsFontSize + 'px';
        
        
            const currentDiv = document.getElementById("endOfGame");
            document.body.insertBefore(gridDiv, currentDiv);
        
            var btnElem = document.getElementById("submitBtn")
            btnElem.innerText = 'Submit';
    }

    this.checkAnswer = function() {

            var trueAnswers = [];
            for (var i=0; i< this.numWords; i++){
                currInd = this.shuffledIds[i];
                trueAnswers[i] = this.wordList[currInd];
            }
        
            var numCorr = 0;
            var writtenAnswer;

            // Check the answers the user put in with the correct ones
            for (var i=0; i < this.settingsNumWords; i++){
                userAnswer = document.getElementById('answer' + i);
                
                writtenAnswer = userAnswer.value.toLowerCase();
                
                if (writtenAnswer == trueAnswers[i].toLowerCase()) {
                    numCorr = numCorr + 1;
                    userAnswer.style.backgroundColor = '#4CFA7D';
                } else {
                    userAnswer.style.backgroundColor = '#FA3261';
                }
            }
        
            var resString = '';
            resString = "Score: " + numCorr + ' / ' + this.settingsNumWords + '.';
            resString = resString + ' Time taken: ' + (Math.round((this.endTime - this.startTime)/100))/10 + 's.';
            
            const newDiv = document.createElement("div");
            newDiv.setAttribute("class", "memoryText");
            newDiv.innerHTML = resString;
            newDiv.style.fontSize = this.settingsFontSize + 'px';
            newDiv.style.color = '#E8A800';
        
            const currentDiv = document.getElementById("endOfGame");
            document.body.insertBefore(newDiv, currentDiv);
        
            var btnElem = document.getElementById("submitBtn")
            btnElem.innerText = 'Play again';
    }

        // Switch between memorizing words, inputting them and verifying answers
    this.switchWordGameMode = function(){
        if (this.wordsShowing == 0) {
            this.wordsShowing = 1;
            this.endTime = new Date();
            this.obtainGuess();
            
        } else if (this.wordsShowing == 1){
            this.checkAnswer();
            this.wordsShowing = 2;
        } else {
            this.startTime = new Date();
            this.createWords();
            this.wordsShowing = 0;
        }
        
            
    }

    this.setFontSize = function() {
        var settingsFontSizeElem = document.getElementById('fontSizeField');
        var settingsExampleText = document.getElementById('settingsExampleText');
        this.settingsFontsize = Math.min(settingsFontSizeElem.value, 50);
        this.settingsFontsize = Math.max(this.settingsFontsize, 5);
        settingsFontSizeElem.value = this.settingsFontsize;
        settingsExampleText.style.fontSize = this.settingsFontsize + 'px';
        
    }
    
    this.setSettingsWords = function() {
        var settingsNumWordsElem = document.getElementById('numWordsField');
        settingsNumWordsElem.max = this.numWords;
        
    
        var settingsNumWordsText = document.getElementById('numWordsText');
        settingsNumWordsText.innerHTML = this.numWords;
        
        this.settingsNumWords = Math.min(settingsNumWordsElem.value, this.numWords);
        this.settingsNumWords = Math.max(this.settingsNumWords, 1);
        settingsNumWordsElem.value = this.settingsNumWords;
        
    }
    
    this.setSettingsDuration = function() {
        var settingsDurationElem = document.getElementById('durationField');
        
        this.settingsTimePerWord = Math.max(settingsDurationElem.value, 1);
        settingsDurationElem.value = this.settingsTimePerWord;
        
    }

    this.settingsBtn = function() {

        var settingsDurationElem = document.getElementById('durationField');
        var settingsNumWordsElem = document.getElementById('numWordsField');
        var settingsFontSizeElem = document.getElementById('fontSizeField');
    
        this.settingsTimePerWord = settingsDurationElem.value;
        this.settingsNumWords = settingsNumWordsElem.value;
        this.settingsFontSize = settingsFontSizeElem.value;
        
        this.wordsShowing = 0;
        this.changeGameScreen('wordGame')
    }
    
    // Go back to settings from the game
    this.goBackToSettings = function() {
        window.clearTimeout(this.endGameByTimeId);
        this.wordsShowing = 1;
        this.removeGame();
        var elem = document.getElementById("gridBtnWrap");
        elem.style.display = 'none';
        this.changeGameScreen('settings');
    }

    // To go between the game screens associated with the word game
    this.changeGameScreen = function(nextScrn){
        if (nextScrn == 'wordGame'){
            // Remove and add div elements
            var settingsElem = document.getElementById('settingsScreen');
            settingsElem.style.display = 'none';
            this.startTime = new Date();
    
            var settingsElem = document.getElementById('settingsScreen');
            settingsElem.style.display = 'none';
            var wrapElem = document.getElementById('gridBtnWrap');
            wrapElem.style.display = 'grid';
            this.createWords();
        }
        else if (nextScrn == 'settings'){
            // Remove and add div elements
            var dropZone = document.getElementById('drop_zone');
            dropZone.style.display = 'none';
            var settingsElem = document.getElementById('settingsScreen');
            settingsElem.style.display = 'grid';
    
            this.setSettingsWords();
    
    
        } else if (nextScrn == 'dropWordFile') {
            var dropZone = document.getElementById('drop_zone');
            dropZone.addEventListener('dragover', wordGameHandleDragOver, false);
            dropZone.addEventListener('dragleave', wordGameHandleDragLeave, false);
            dropZone.addEventListener('drop', wordGameHandleFileSelect, false);
        }
    }
            

}

myGame = new memorizeWordsGame();
myGame.changeGameScreen('dropWordFile')
//changeGameScreen('dropWordFile')
//changeGameScreen('settings')


/* 
var wordsShowing = 0;
var numWords = 2;
var startTime, endTime;

startTime = new Date();

createWords() */







