// ===============================
// StudyMate AI - Main JavaScript
// ===============================

// ---------- App State ----------
let currentSubject = "";
let notesSaved = false;
let quizScore = 0;
let quizStarted = false;
let aiUsed = false;


// ---------- Get HTML Elements ----------
const homeSection = document.getElementById("homeSection");
const startButton = document.getElementById("startButton");

const studySection = document.getElementById("studySection");
const subjectInput = document.getElementById("subjectInput");
const continueButton = document.getElementById("continueButton");
const message = document.getElementById("message");

const dashboardSection = document.getElementById("dashboardSection");
const currentSubjectDisplay = document.getElementById("currentSubject");
const subjectCount = document.getElementById("subjectCount");
const notesCount = document.getElementById("notesCount");
const quizScoreDisplay = document.getElementById("quizScore");

const notesSection = document.getElementById("notesSection");
const notesInput = document.getElementById("notesInput");
const saveNotesButton = document.getElementById("saveNotesButton");
const clearNotesButton = document.getElementById("clearNotesButton");
const notesMessage = document.getElementById("notesMessage");

const quizSection = document.getElementById("quizSection");
const quizButton = document.getElementById("quizButton");
const quizArea = document.getElementById("quizArea");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.querySelectorAll(".quizOption");
const quizResult = document.getElementById("quizResult");
const quizScoreText = document.getElementById("quizScoreText");

const assistantSection = document.getElementById("assistantSection");
const assistantButton = document.getElementById("assistantButton");
const assistantArea = document.getElementById("assistantArea");
const explainButton = document.getElementById("explainButton");
const summaryButton = document.getElementById("summaryButton");
const revisionButton = document.getElementById("revisionButton");
const examButton = document.getElementById("examButton");
const assistantMessage = document.getElementById("assistantMessage");

const askAISection = document.getElementById("askAISection");
const aiQuestion = document.getElementById("aiQuestion");
const askAIButton = document.getElementById("askAIButton");
const aiAnswerBox = document.getElementById("aiAnswerBox");
const aiAnswer = document.getElementById("aiAnswer");

const savedSection = document.getElementById("savedSection");
const savedNotes = document.getElementById("savedNotes");

const progressSection = document.getElementById("progressSection");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const toolsSection = document.getElementById("toolsSection");
const notesTool = document.getElementById("notesTool");
const quizTool = document.getElementById("quizTool");
const aiTool = document.getElementById("aiTool");
const savedTool = document.getElementById("savedTool");

const navigationSection = document.getElementById("navigationSection");
const dashboardButton = document.getElementById("dashboardButton");
const notesNavigationButton = document.getElementById("notesNavigationButton");
const quizNavigationButton = document.getElementById("quizNavigationButton");
const aiNavigationButton = document.getElementById("aiNavigationButton");


// ---------- Helper Function ----------
function showSection(section) {
    if (!section) return;

    section.classList.remove("hidden");

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ---------- Start Learning ----------
if (startButton) {
    startButton.addEventListener("click", function () {

        if (homeSection) {
            homeSection.classList.add("hidden");
        }

        showSection(studySection);
        showSection(dashboardSection);
        showSection(notesSection);
        showSection(quizSection);
        showSection(assistantSection);
        showSection(askAISection);
        showSection(savedSection);
        showSection(progressSection);
        showSection(toolsSection);
        showSection(navigationSection);

        if (subjectInput) {
            subjectInput.focus();
        }
    });
}


// ---------- Continue With Subject ----------
if (continueButton) {
    continueButton.addEventListener("click", function () {

        const subject = subjectInput
            ? subjectInput.value.trim()
            : "";

        if (subject === "") {
            if (message) {
                message.textContent = "Please enter a subject first 📚";
            }
            return;
        }

        currentSubject = subject;

        localStorage.setItem("studySubject", currentSubject);

        if (message) {
            message.textContent =
                "Great! Let's learn " + currentSubject + " 📚";
        }

        if (currentSubjectDisplay) {
            currentSubjectDisplay.textContent = currentSubject;
        }

        if (subjectCount) {
            subjectCount.textContent = "1";
        }

        updateProgress();
    });
}


// ---------- Save Notes ----------
if (saveNotesButton) {
    saveNotesButton.addEventListener("click", function () {

        const notes = notesInput
            ? notesInput.value.trim()
            : "";

        if (notes === "") {
            if (notesMessage) {
                notesMessage.textContent =
                    "Please write something before saving 📝";
            }
            return;
        }

        localStorage.setItem("studyNotes", notes);

        notesSaved = true;

        if (notesMessage) {
            notesMessage.textContent = "Notes saved successfully! ✅";
        }

        displaySavedNotes();
        updateProgress();
    });
}


// ---------- Clear Notes ----------
if (clearNotesButton) {
    clearNotesButton.addEventListener("click", function () {

        localStorage.removeItem("studyNotes");

        if (notesInput) {
            notesInput.value = "";
        }

        notesSaved = false;

        if (notesMessage) {
            notesMessage.textContent = "Notes cleared 🗑️";
        }

        displaySavedNotes();
        updateProgress();
    });
}


// ---------- Display Saved Notes ----------
function displaySavedNotes() {

    const saved = localStorage.getItem("studyNotes");

    if (!savedNotes) return;

    if (saved) {
        savedNotes.textContent = saved;
    } else {
        savedNotes.textContent = "No saved notes yet.";
    }
}


// ---------- Quiz ----------
if (quizButton) {
    quizButton.addEventListener("click", function () {

        quizStarted = true;
        quizScore = 0;

        if (quizArea) {
            quizArea.classList.remove("hidden");
        }

        if (quizQuestion) {
            quizQuestion.textContent =
                "What process do plants use to make food? 🌱";
        }

        if (quizResult) {
            quizResult.textContent = "";
        }

        if (quizScoreText) {
            quizScoreText.textContent = "Score: 0";
        }

        updateProgress();
    });
}


// ---------- Quiz Options ----------
quizOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        const answer = option.textContent.trim();

        if (answer.toLowerCase() === "photosynthesis") {

            quizScore = 1;

            if (quizResult) {
                quizResult.textContent =
                    "Correct! 🎉 Plants use photosynthesis to make food.";
            }

        } else {

            quizScore = 0;

            if (quizResult) {
                quizResult.textContent =
                    "Not quite! ❌ The correct answer is Photosynthesis.";
            }
        }

        if (quizScoreText) {
            quizScoreText.textContent =
                "Score: " + quizScore + "/1";
        }

        if (quizScoreDisplay) {
            quizScoreDisplay.textContent =
                quizScore + "/1";
        }

        updateProgress();
    });
});


// ---------- AI Study Assistant ----------
if (assistantButton) {
    assistantButton.addEventListener("click", function () {

        if (assistantArea) {
            assistantArea.classList.remove("hidden");
        }

        if (assistantMessage) {
            assistantMessage.textContent =
                "Choose what you want help with below 🤖📚";
        }
    });
}


// ---------- Explain Topic ----------
if (explainButton) {
    explainButton.addEventListener("click", function () {

        aiUsed = true;

        const subject =
            currentSubject || "your topic";

        if (assistantMessage) {
            assistantMessage.textContent =
                "📖 Explanation: " + subject +
                " can be understood by breaking it into small concepts, learning the main ideas, and then practicing with examples.";
        }

        updateProgress();
    });
}


// ---------- Summary ----------
if (summaryButton) {
    summaryButton.addEventListener("click", function () {

        aiUsed = true;

        const subject =
            currentSubject || "your topic";

        if (assistantMessage) {
            assistantMessage.textContent =
                "📝 Summary: Focus on the key definitions, important concepts, examples, and formulas related to " +
                subject + ".";
        }

        updateProgress();
    });
}


// ---------- Revision ----------
if (revisionButton) {
    revisionButton.addEventListener("click", function () {

        aiUsed = true;

        const subject =
            currentSubject || "your topic";

        if (assistantMessage) {
            assistantMessage.textContent =
                "🔄 Revision Plan: Review " +
                subject +
                " for 20 minutes, make short notes, practice questions, and test yourself without looking at your notes.";
        }

        updateProgress();
    });
}


// ---------- Exam Preparation ----------
if (examButton) {
    examButton.addEventListener("click", function () {

        aiUsed = true;

        const subject =
            currentSubject || "your subject";

        if (assistantMessage) {
            assistantMessage.textContent =
                "🎯 Exam Tip: For " +
                subject +
                ", revise important topics first, practice previous questions, and take short timed quizzes.";
        }

        updateProgress();
    });
}


// ---------- Ask AI ----------
if (askAIButton) {
    askAIButton.addEventListener("click", function () {

        const question = aiQuestion
            ? aiQuestion.value.trim()
            : "";

        if (question === "") {

            if (aiAnswerBox) {
                aiAnswerBox.classList.remove("hidden");
            }

            if (aiAnswer) {
                aiAnswer.textContent =
                    "Please type a question first 🤔";
            }

            return;
        }

        aiUsed = true;

        if (aiAnswerBox) {
            aiAnswerBox.classList.remove("hidden");
        }

        let response =
            "That's a great study question! 📚 Try breaking the topic into smaller concepts and reviewing an example.";

        const lowerQuestion = question.toLowerCase();

        if (lowerQuestion.includes("photosynthesis")) {
            response =
                "Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce food (glucose) and release oxygen. 🌱";
        }

        else if (
            lowerQuestion.includes("study") ||
            lowerQuestion.includes("learn")
        ) {
            response =
                "A good study method is: understand the concept → make short notes → practice questions → test yourself → revise later. 📚";
        }

        else if (
            lowerQuestion.includes("exam") ||
            lowerQuestion.includes("exams")
        ) {
            response =
                "For exams, focus on important topics, practice questions, revise your mistakes, and use short study sessions with breaks. 🎯";
        }

        else if (
            lowerQuestion.includes("math") ||
            lowerQuestion.includes("mathematics")
        ) {
            response =
                "For mathematics, first understand the formula, then solve a simple example, and finally practice several questions without looking at the solution. ➗";
        }

        else if (
            lowerQuestion.includes("computer") ||
            lowerQuestion.includes("programming") ||
            lowerQuestion.includes("coding")
        ) {
            response =
                "For programming, learn one concept at a time and immediately practice it by writing small programs. 💻";
        }

        if (aiAnswer) {
            aiAnswer.textContent = response;
        }

        updateProgress();
    });
}


// ---------- Update Progress ----------
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

    if (progressFill) {
        progressFill.style.width = progress + "%";
    }

    if (progressText) {
        progressText.textContent =
            progress + "% Complete";
    }
}


// ---------- Study Tools ----------
if (notesTool) {
    notesTool.addEventListener("click", function () {
        showSection(notesSection);
    });
}

if (quizTool) {
    quizTool.addEventListener("click", function () {
        showSection(quizSection);
    });
}

if (aiTool) {
    aiTool.addEventListener("click", function () {
        showSection(assistantSection);
    });
}

if (savedTool) {
    savedTool.addEventListener("click", function () {
        showSection(savedSection);
    });
}


// ---------- Navigation ----------
if (dashboardButton) {
    dashboardButton.addEventListener("click", function () {
        showSection(dashboardSection);
    });
}

if (notesNavigationButton) {
    notesNavigationButton.addEventListener("click", function () {
        showSection(notesSection);
    });
}

if (quizNavigationButton) {
    quizNavigationButton.addEventListener("click", function () {
        showSection(quizSection);
    });
}

if (aiNavigationButton) {
    aiNavigationButton.addEventListener("click", function () {
        showSection(assistantSection);
    });
}


// ---------- Load Saved Data ----------
window.addEventListener("load", function () {

    const savedSubject =
        localStorage.getItem("studySubject");

    const savedNotes =
        localStorage.getItem("studyNotes");

    if (savedSubject) {

        currentSubject = savedSubject;

        if (subjectInput) {
            subjectInput.value = savedSubject;
        }

        if (currentSubjectDisplay) {
            currentSubjectDisplay.textContent =
                savedSubject;
        }

        if (subjectCount) {
            subjectCount.textContent = "1";
        }
    }

    if (savedNotes) {

        notesSaved = true;

        if (notesInput) {
            notesInput.value = savedNotes;
        }
    }

    displaySavedNotes();
    updateProgress();
});
