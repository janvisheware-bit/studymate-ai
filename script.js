```javascript
/* =========================================
   STUDYMATE AI - MAIN JAVASCRIPT
========================================= */


/* =========================================
   DATA
========================================= */

let currentSubject = "";
let notesSaved = false;
let quizScore = 0;
let quizStarted = false;
let aiUsed = false;


/* =========================================
   GET HTML ELEMENTS
========================================= */

const startButton = document.getElementById("startButton");
const homeSection = document.getElementById("homeSection");

const studySection = document.getElementById("studySection");
const subjectInput = document.getElementById("subjectInput");
const continueButton = document.getElementById("continueButton");
const message = document.getElementById("message");

const dashboardSection =
    document.getElementById("dashboardSection");

const currentSubjectText =
    document.getElementById("currentSubject");

const subjectCount =
    document.getElementById("subjectCount");

const notesCount =
    document.getElementById("notesCount");

const quizScoreText =
    document.getElementById("quizScore");

const studyProgress =
    document.getElementById("studyProgress");


/* NOTES */

const notesSection =
    document.getElementById("notesSection");

const notesInput =
    document.getElementById("notesInput");

const saveNotesButton =
    document.getElementById("saveNotesButton");

const clearNotesButton =
    document.getElementById("clearNotesButton");

const notesMessage =
    document.getElementById("notesMessage");

const savedSection =
    document.getElementById("savedSection");

const savedNotes =
    document.getElementById("savedNotes");


/* QUIZ */

const quizSection =
    document.getElementById("quizSection");

const quizButton =
    document.getElementById("quizButton");

const quizArea =
    document.getElementById("quizArea");

const quizQuestion =
    document.getElementById("quizQuestion");

const quizOptions =
    document.querySelectorAll(".quizOption");

const quizResult =
    document.getElementById("quizResult");

const quizScoreDisplay =
    document.getElementById("quizScoreText");


/* AI ASSISTANT */

const assistantSection =
    document.getElementById("assistantSection");

const assistantButton =
    document.getElementById("assistantButton");

const assistantArea =
    document.getElementById("assistantArea");

const assistantMessage =
    document.getElementById("assistantMessage");

const explainButton =
    document.getElementById("explainButton");

const summaryButton =
    document.getElementById("summaryButton");

const revisionButton =
    document.getElementById("revisionButton");

const examButton =
    document.getElementById("examButton");


/* ASK AI */

const askAISection =
    document.getElementById("askAISection");

const aiQuestion =
    document.getElementById("aiQuestion");

const askAIButton =
    document.getElementById("askAIButton");

const aiAnswerBox =
    document.getElementById("aiAnswerBox");

const aiAnswer =
    document.getElementById("aiAnswer");


/* PROGRESS */

const progressSection =
    document.getElementById("progressSection");

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");


/* TOOLS */

const toolsSection =
    document.getElementById("toolsSection");

const notesTool =
    document.getElementById("notesTool");

const quizTool =
    document.getElementById("quizTool");

const aiTool =
    document.getElementById("aiTool");

const savedTool =
    document.getElementById("savedTool");


/* NAVIGATION */

const navigationSection =
    document.getElementById("navigationSection");

const dashboardButton =
    document.getElementById("dashboardButton");

const notesNavigationButton =
    document.getElementById("notesNavigationButton");

const quizNavigationButton =
    document.getElementById("quizNavigationButton");

const aiNavigationButton =
    document.getElementById("aiNavigationButton");


/* =========================================
   SHOW SECTION
========================================= */

function showSection(section) {

    section.classList.remove("hidden");

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================
   START LEARNING
========================================= */

startButton.addEventListener("click", function () {

    homeSection.classList.add("hidden");

    studySection.classList.remove("hidden");

    dashboardSection.classList.remove("hidden");

    notesSection.classList.remove("hidden");

    quizSection.classList.remove("hidden");

    assistantSection.classList.remove("hidden");

    askAISection.classList.remove("hidden");

    savedSection.classList.remove("hidden");

    progressSection.classList.remove("hidden");

    toolsSection.classList.remove("hidden");

    navigationSection.classList.remove("hidden");

    studySection.scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================================
   CONTINUE / SUBJECT
========================================= */

continueButton.addEventListener("click", function () {

    const subject =
        subjectInput.value.trim();

    if (subject === "") {

        message.textContent =
            "⚠️ Please enter a subject first.";

        return;

    }

    currentSubject = subject;

    localStorage.setItem(
        "studySubject",
        currentSubject
    );

    currentSubjectText.textContent =
        "Currently studying: " + currentSubject;

    subjectCount.textContent = "1";

    message.textContent =
        "Great! Let's learn " +
        currentSubject +
        " 📚";

    updateProgress();

});


/* =========================================
   SAVE NOTES
========================================= */

saveNotesButton.addEventListener("click", function () {

    const notes =
        notesInput.value.trim();

    if (notes === "") {

        notesMessage.textContent =
            "⚠️ Please write some notes first.";

        return;

    }

    localStorage.setItem(
        "studyNotes",
        notes
    );

    notesSaved = true;

    notesCount.textContent = "1";

    notesMessage.textContent =
        "Notes saved successfully! ✅";

    displaySavedNotes();

    updateProgress();

});


/* =========================================
   CLEAR NOTES
========================================= */

clearNotesButton.addEventListener("click", function () {

    notesInput.value = "";

    localStorage.removeItem(
        "studyNotes"
    );

    notesSaved = false;

    notesCount.textContent = "0";

    notesMessage.textContent =
        "Notes cleared.";

    displaySavedNotes();

    updateProgress();

});


/* =========================================
   DISPLAY SAVED NOTES
========================================= */

function displaySavedNotes() {

    const saved =
        localStorage.getItem("studyNotes");

    if (!saved) {

        savedNotes.innerHTML =
            '<p class="emptyMessage">No notes saved yet.</p>';

        return;

    }

    savedNotes.innerHTML = `
        <div class="savedNote">
            ${saved}
        </div>
    `;

}


/* =========================================
   QUIZ
========================================= */

quizButton.addEventListener("click", function () {

    quizStarted = true;

    quizArea.classList.remove("hidden");

    quizQuestion.textContent =
        "What process do plants use to make food? 🌱";

    quizOptions[0].textContent =
        "Photosynthesis";

    quizOptions[1].textContent =
        "Respiration";

    quizOptions[2].textContent =
        "Digestion";

    quizOptions[3].textContent =
        "Transpiration";

    quizScore = 0;

    quizScoreDisplay.textContent =
        "Score: 0";

    quizResult.textContent =
        "";

});


/* =========================================
   QUIZ ANSWERS
========================================= */

quizOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        if (!quizStarted) {
            return;
        }

        if (
            option.textContent ===
            "Photosynthesis"
        ) {

            quizScore = 1;

            quizResult.textContent =
                "🎉 Correct! Great job!";

        } else {

            quizScore = 0;

            quizResult.textContent =
                "❌ Not quite. The correct answer is Photosynthesis.";

        }

        quizScoreDisplay.textContent =
            "Score: " + quizScore;

        quizScoreText.textContent =
            quizScore;

        updateProgress();

    });

});


/* =========================================
   AI STUDY ASSISTANT
========================================= */

assistantButton.addEventListener("click", function () {

    assistantArea.classList.remove("hidden");

    assistantMessage.textContent =
        "Choose what you want help with below. 🤖📚";

});


/* =========================================
   AI ACTIONS
========================================= */

explainButton.addEventListener("click", function () {

    assistantMessage.textContent =
        "📖 Enter a topic and I can help break it down into simple concepts.";

});


summaryButton.addEventListener("click", function () {

    assistantMessage.textContent =
        "📝 I can help turn long study material into short revision points.";

});


revisionButton.addEventListener("click", function () {

    assistantMessage.textContent =
        "🔄 Try reviewing your saved notes and then testing yourself with the quiz.";

});


examButton.addEventListener("click", function () {

    assistantMessage.textContent =
        "🎯 For exam preparation, focus on key concepts, practice questions and regular revision.";

});


/* =========================================
   ASK AI
========================================= */

askAIButton.addEventListener("click", function () {

    const question =
        aiQuestion.value.trim();

    if (question === "") {

        aiAnswerBox.classList.remove("hidden");

        aiAnswer.textContent =
            "⚠️ Please type a question first.";

        return;

    }

    aiUsed = true;

    aiAnswerBox.classList.remove("hidden");

    aiAnswer.textContent =
        "🤖 StudyMate AI: Here's a study-friendly response to your question: " +
        question +
        ". Keep exploring the topic and connect it with your class notes! 📚";

    updateProgress();

});


/* =========================================
   PROGRESS
========================================= */

function updateProgress() {

    let progress = 0;

    if (currentSubject !== "") {
        progress += 25;
    }

    if (notesSaved) {
        progress += 25;
    }

    if (quizStarted) {
        progress += 25;
    }

    if (aiUsed) {
        progress += 25;
    }

    progressFill.style.width =
        progress + "%";

    progressText.textContent =
        progress + "% completed";

    studyProgress.textContent =
        progress + "%";

}


/* =========================================
   STUDY TOOLS
========================================= */

notesTool.addEventListener("click", function () {

    showSection(notesSection);

});


quizTool.addEventListener("click", function () {

    showSection(quizSection);

});


aiTool.addEventListener("click", function () {

    showSection(assistantSection);

});


savedTool.addEventListener("click", function () {

    showSection(savedSection);

});


/* =========================================
   NAVIGATION
========================================= */

dashboardButton.addEventListener("click", function () {

    showSection(dashboardSection);

});


notesNavigationButton.addEventListener("click", function () {

    showSection(notesSection);

});


quizNavigationButton.addEventListener("click", function () {

    showSection(quizSection);

});


aiNavigationButton.addEventListener("click", function () {

    showSection(assistantSection);

});


/* =========================================
   LOAD SAVED DATA
========================================= */

window.addEventListener("load", function () {

    const savedSubject =
        localStorage.getItem("studySubject");

    const savedNotes =
        localStorage.getItem("studyNotes");

    if (savedSubject) {

        currentSubject =
            savedSubject;

        subjectInput.value =
            savedSubject;

        currentSubjectText.textContent =
            "Currently studying: " +
            savedSubject;

        subjectCount.textContent =
            "1";

    }

    if (savedNotes) {

        notesInput.value =
            savedNotes;

        notesSaved = true;

        notesCount.textContent =
            "1";

    }

    displaySavedNotes();

    updateProgress();

});
```
