let topics = [];
let notes = [];
let rotations = [];
let bgNotes = [];
let pinColors = [];
let display = [];
let displayX = [];

let bullets = ['Coding', 'Reminder', 'Info', 'Job', 'Haus'];
let prios = ['wichtig/dringlich', 'wichtig/nicht dringlich', 'nicht wichtig/dringlich', 'nicht wichtig/nicht dringlich'];
let topiccolors = ['red', 'green', 'blue', 'rgb(70 , 70, 70)', 'hotpink']
let priocolors = ['rgb(255, 160, 125)', 'rgb(140, 255, 125)', 'rgb(125, 200, 255)', 'beige']



load();


function render(){
    showInputSection();
    showBoard(); 
}

//-----topics-----
function openTopicDropdown(){
    document.getElementById('topicDropdownMenu').style.display = 'flex';
}
function closeTopicDropdown(){
    document.getElementById('topicDropdownMenu').style.display = 'none';
}

function topicBullets(){
    let bulletMenu = document.getElementById('topicDropdownMenu');
        
    for (let i = 0; i < bullets.length; i++) {
        const topic = bullets[i];

        bulletMenu.innerHTML += /*HTML*/`
            <div id="topic${i}" class="DropdownBullet" onclick="getTopicContent(${i})">${topic}</div>
        `;
    };
}

function getTopicContent(t){
    let selectedTopic = bullets[t];
    let pinColor = topiccolors[t];
    let topic = document.getElementById('topicDropdown');

    topic.innerHTML = selectedTopic;
    topic.style.backgroundColor = pinColor;

    document.getElementById('topicDropdown').innerHTML = selectedTopic;
    closeTopicDropdown();
}

//-----prio-----
function openPrioDropdown(){
    document.getElementById('prioDropdownMenu').style.display = 'flex';
}
function closePrioDropdown(){
    document.getElementById('prioDropdownMenu').style.display = 'none';
}

function prioBullets(){
    let prioMenu = document.getElementById('prioDropdownMenu');
    
    for (let i = 0; i < prios.length; i++) {
        const prio = prios[i];

        prioMenu.innerHTML += /*HTML*/`
            <div id="prio${i}" class="DropdownBullet" onclick="getPrioContent(${i})">${prio}</div>
        `;
    };
}

function getPrioContent(p){
    let selectedPrio = prios[p];
    let bgColor = priocolors[p];
    let prio = document.getElementById('prioDropdown');

    prio.innerHTML = selectedPrio;
    prio.style.backgroundColor = bgColor;
    prio.style.color = ('black');

    closePrioDropdown();
}

function showInputSection(){
    let input = document.getElementById('contentInputSection');
    
    input.innerHTML = ``;

    input.innerHTML += /*html*/`
    <div class="inputSection">
        <div class="flex">
        <div>
            <div id="topicDropdown" class="Dropdown" onclick="openTopicDropdown()" onmouseout="closeTopicDropdown()">Thema</div>
            <div id="topicDropdownMenu" class="DropdownMenu" onmouseover="openTopicDropdown()" onmouseout="closeTopicDropdown()"></div>
        </div>
        <div>
            <div id="prioDropdown" class="Dropdown" onclick="openPrioDropdown()" onmouseout="closePrioDropdown()">Priorität</div>
            <div id="prioDropdownMenu" class="DropdownMenu" onmouseover="openPrioDropdown()" onmouseout="closePrioDropdown()"></div>
        </div>
        </div>

        <textarea name="" id="inputNote" cols="1" rows="3"></textarea>

        <div class="flex">
        <button onclick="addNote()">hinzufügen</button>   
        <button onclick="showInputSection()">abbruch</button> 
        </div>
    </div> 
    `;
    topicBullets();
    prioBullets();
}

function showBoard(){
    let board = document.getElementById('contentBoard');
    
    board.innerHTML = ``;

    board.innerHTML += /*html*/`
    <div class="board">
        <div id="noteArea" class="noteArea"></div>
        <div id="checkedNoteArea" class="checkedNoteArea"></div>
    </div>
    `;
    note();
}

function note(){
    let noteArea = document.getElementById('noteArea');
    let checkedNoteArea = document.getElementById('checkedNoteArea');
    
    for (let i = 0; i < notes.length; i++) {
        
        const topic = topics[i];
        const note = notes[i];
        const rotation = rotations[i];
        const pinColor = pinColors[i];
        const bgcolor = bgNotes[i];
        const displ = display[i];
        const displX = displayX[i];

    noteArea.innerHTML += /*html*/`
        <div id="paper${i}" class="notes" style="rotate: ${rotation}deg; background-color: ${bgcolor}; display: ${displ};" >
        <div id="pin${i}" class="pin" style="background-color: ${pinColor}"></div>     
            <b style="text-decoration: underline;">${topic}</b><br>
            <textarea class="writtenNote" id="writtenNote${i}" cols="1" rows="1" oninput="editNote(${i})">${note}</textarea><br>
            <div class="iconContainer">
                <img src="./img/check.png" onclick="checkedNote(${i})">
                <img src="./img/xmark.png" onclick="deleteNote(${i})">  
            </div>
        </div>         
    `;
    checkedNoteArea.innerHTML += /*html*/`
        <div id="paperX${i}" class="notesX" style="rotate: ${rotation}deg; background-color: ${bgcolor}; display: ${displX};" >
        <div id="pinX${i}" class="pin" style="background-color: ${pinColor}" onclick="recoverNote(${i})"></div>     
            <div class="topX">
            <b style="text-decoration: underline;">${topic}</b><br>
            <div class="iconContainer">
                <img src="./img/recover.png" onclick="recoverNote(${i})">
                <img src="./img/xmark.png" onclick="deleteNote(${i})">  
            </div>
            </div>
            <textarea readonly="true" class="writtenNoteX" id="writtenNoteX${i}" cols="1" rows="1">${note}</textarea><br>
        </div>         
    `;
    }
}

function checkedNote(i){
    display.splice(i, 1, 'none');
    displayX.splice(i, 1, 'flex');
    render();
    save();
}

function recoverNote(i){
    display.splice(i, 1, 'flex');
    displayX.splice(i, 1, 'none');
    render();
    save();
}

function editNote(i){
    let newnote = document.getElementById(`writtenNote${i}`).value;
    notes.splice(i, 1, newnote);
    save();
}

function randomRotation(){
    let max = 7;
    let min = -7;
    let x = Math.round(Math.random() * (max - min)) + min;
    return x;
}

function addNote(){
    let prioText = document.getElementById('prioDropdown').textContent; //Text von Prio (wichtig, dda)
    let topic = document.getElementById('topicDropdown').textContent; //Textinhalt des Thema (Coding, dda)
    let iPrio = prios.indexOf(prioText); //Index der prios
    let bgnote = priocolors[iPrio]; //priocolors als String
    let iTopic = bullets.indexOf(topic); //Index des Themas
    let pincolor = topiccolors[iTopic];
    let note = document.getElementById('inputNote').value; //Textinhalt der Notiz
    let rotation = randomRotation();

    topics.push(topic);
    notes.push(note);
    pinColors.push(pincolor);
    bgNotes.push(bgnote);
    rotations.push(rotation);
    display.push('flex');
    displayX.push('none');
    
    render();
    save();
}

function deleteNote(i){
    topics.splice(i, 1);
    notes.splice(i, 1);
    pinColors.splice(i, 1);
    bgNotes.splice(i, 1);
    rotations.splice(i, 1);
    display.splice(i, 1);
    displayX.splice(i, 1);
    render();
    save();
}

function save(){
    let topicAsText = JSON.stringify(topics);
    let notesAsText = JSON.stringify(notes);
    let rotationAsText = JSON.stringify(rotations);
    let bgNotesAsText = JSON.stringify(bgNotes);
    let pinColorsAsText = JSON.stringify(pinColors);
    let displayAsText = JSON.stringify(display);
    let displayXAsText = JSON.stringify(displayX);
 
    localStorage.setItem('top', topicAsText);
    localStorage.setItem('not', notesAsText);
    localStorage.setItem('bgnot', bgNotesAsText);
    localStorage.setItem('rot', rotationAsText);
    localStorage.setItem('pin', pinColorsAsText);
    localStorage.setItem('dis', displayAsText);
    localStorage.setItem('disX', displayXAsText);
}

function load(){
    let topicAsText = localStorage.getItem('top');
    let notesAsText = localStorage.getItem('not');
    let rotationAsText = localStorage.getItem('rot');
    let bgNotesAsText = localStorage.getItem('bgnot');
    let pinColorsAsText = localStorage.getItem('pin');
    let displayAsText = localStorage.getItem('dis');
    let displayXAsText = localStorage.getItem('disX');
    
    if (topicAsText && notesAsText && rotationAsText && pinColorsAsText && bgNotesAsText && displayAsText && displayXAsText) {
        topics = JSON.parse(topicAsText);
        notes = JSON.parse(notesAsText);
        rotations = JSON.parse(rotationAsText);
        bgNotes = JSON.parse(bgNotesAsText);
        pinColors = JSON.parse(pinColorsAsText);
        display = JSON.parse(displayAsText);
        displayX = JSON.parse(displayXAsText);
    }
}