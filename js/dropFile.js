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
        console.log('Bajs')
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

        console.log(storeText)
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
    let rect = dropZone.getBoundingClientRect();
    console.log('Hejsan')
    
        
    dropZone.style.backgroundColor = '#2D3240';

    var dropTextHere = document.getElementById('dropHereId');
    dropTextHere.classList.remove('dropHereAnimForward');

    var dropTextDrop = document.getElementById('dropDropId');
    dropTextDrop.classList.remove('dropDropAnim');

}



{/* <div id="drop_zone">
        <p><span id="dropDropId">Drop the textfile</span> <span id="dropHereId">here</span></p>
    </div> */}