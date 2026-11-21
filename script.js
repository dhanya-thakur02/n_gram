/* =========================
   WARM-UP DATA
   Sentence: "i love natural language processing"
   Target trigram starts at "love" (indexes 1, 2, 3).
   Checked with NLTK ngrams.
========================= */

const practiceSentence = ["I", "love", "natural", "language", "processing"];
const practiceAnswer = new Set([1, 2, 3]);
let practiceSelection = new Set();

/* =========================
   TASK DATA
   level: "easy" | "medium" | "hard"
   type "select": click all the chips that match.
   type "choice": pick one option per row.
   All n-grams, counts and probabilities verified with NLTK / Python Counter.
========================= */

const LEVEL_LABEL = { easy: "Easy", medium: "Medium", hard: "Hard" };
const NAME_OPTIONS = ["Unigram", "Bigram", "Trigram", "4-gram"];

const questions = [
    /* ---------- EASY ---------- */
    {
        level: "easy",
        type: "select",
        title: "Build the bigrams",
        instruction: "A bigram is two words that sit next to each other, in their original order. Click every valid bigram.",
        prompt: "Which of these are bigrams of \"I love natural language processing\"?",
        sentence: ["I love", "love natural", "I natural", "natural language", "processing language", "language processing", "love language"],
        answers: [0, 1, 3, 5],
        explain: "Sliding a 2-word window over the sentence gives exactly 4 bigrams: " +
                 "<strong>I love, love natural, natural language, language processing</strong>. " +
                 "<strong>I natural</strong> and <strong>love language</strong> skip a word, so the words are not neighbours. " +
                 "<strong>processing language</strong> has the right words in the wrong order."
    },
    {
        level: "easy",
        type: "choice",
        title: "Name the n",
        instruction: "The n in n-gram is the number of words in it. Pick the right name for each one.",
        prompt: "What kind of n-gram is each item?",
        items: [
            { label: "language",       options: NAME_OPTIONS, answer: "Unigram" },
            { label: "New York",       options: NAME_OPTIONS, answer: "Bigram" },
            { label: "I love NLP",     options: NAME_OPTIONS, answer: "Trigram" },
            { label: "to be or not",   options: NAME_OPTIONS, answer: "4-gram" }
        ],
        explain: "Count the words: <strong>language</strong> has 1 (unigram), <strong>New York</strong> has 2 (bigram), " +
                 "<strong>I love NLP</strong> has 3 (trigram), and <strong>to be or not</strong> has 4, so it is a 4-gram. " +
                 "After 3, we simply say 4-gram, 5-gram, and so on."
    },
    {
        level: "easy",
        type: "select",
        title: "Build the trigrams",
        instruction: "A trigram is three words in a row, in their original order. Click every valid trigram.",
        prompt: "Which of these are trigrams of \"the quick brown fox jumps\"?",
        sentence: ["the quick brown", "quick brown fox", "the brown fox", "brown fox jumps", "fox jumps brown", "quick fox jumps"],
        answers: [0, 1, 3],
        explain: "The sentence has 5 words, so it has 5 − 3 + 1 = 3 trigrams: " +
                 "<strong>the quick brown, quick brown fox, brown fox jumps</strong>. " +
                 "<strong>the brown fox</strong> and <strong>quick fox jumps</strong> skip a word. " +
                 "<strong>fox jumps brown</strong> has the words in the wrong order."
    },
    {
        level: "easy",
        type: "choice",
        title: "First and last n-gram",
        instruction: "The window starts at the first word and stops when it reaches the end of the sentence. Pick the n-gram for each row.",
        prompt: "Sentence: \"data science is fun\"",
        items: [
            { label: "First bigram",   options: ["data science", "science is", "data is"],              answer: "data science" },
            { label: "Last bigram",    options: ["science is", "is fun", "data fun"],                   answer: "is fun" },
            { label: "First trigram",  options: ["data science is", "science is fun", "data is fun"],   answer: "data science is" },
            { label: "Last trigram",   options: ["data science is", "science is fun", "data science fun"], answer: "science is fun" }
        ],
        explain: "The bigrams are <strong>data science, science is, is fun</strong> (first and last are the ends of that list). " +
                 "The trigrams are <strong>data science is, science is fun</strong>. " +
                 "The last window ends exactly at the last word of the sentence."
    },

    /* ---------- MEDIUM ---------- */
    {
        level: "medium",
        type: "choice",
        title: "Count the n-grams",
        instruction: "A sentence with T words has T − n + 1 n-grams. Pick the number for each row.",
        prompt: "How many n-grams are there?",
        items: [
            { label: "Bigrams in \"the cat sat on the mat\" (6 words)",                       options: ["4", "5", "6"], answer: "5" },
            { label: "Trigrams in \"the cat sat on the mat\" (6 words)",                      options: ["3", "4", "5"], answer: "4" },
            { label: "4-grams in \"to be or not to be that is the question\" (10 words)",     options: ["6", "7", "8"], answer: "7" },
            { label: "Trigrams in a sentence with exactly 3 words",                           options: ["0", "1", "3"], answer: "1" }
        ],
        explain: "Use <strong>T − n + 1</strong>. Bigrams: 6 − 2 + 1 = <strong>5</strong>. Trigrams: 6 − 3 + 1 = <strong>4</strong>. " +
                 "4-grams: 10 − 4 + 1 = <strong>7</strong>. A 3-word sentence has only one window of 3, so 3 − 3 + 1 = <strong>1</strong>. " +
                 "The window can start at every word except the last n − 1, which is why bigger n gives fewer n-grams."
    },
    {
        level: "medium",
        type: "choice",
        title: "Work backwards",
        instruction: "Now use the formula in reverse. Rearranged: T = (number of n-grams) + n − 1, and n = T + 1 − (number of n-grams).",
        prompt: "Find the missing value.",
        items: [
            { label: "A sentence has 8 bigrams. How many words does it have?",   options: ["8", "9", "10"], answer: "9" },
            { label: "A sentence has 5 trigrams. How many words does it have?",  options: ["6", "7", "8"],  answer: "7" },
            { label: "A 6-word sentence has 3 n-grams. What is n?",              options: ["3", "4", "5"],  answer: "4" },
            { label: "A sentence has just 1 bigram. How many words does it have?", options: ["1", "2", "3"], answer: "2" }
        ],
        explain: "<strong>8 bigrams:</strong> T = 8 + 2 − 1 = 9. <strong>5 trigrams:</strong> T = 5 + 3 − 1 = 7. " +
                 "<strong>6 words, 3 n-grams:</strong> 6 − n + 1 = 3, so n = 4. " +
                 "<strong>1 bigram:</strong> T = 1 + 2 − 1 = 2, because one pair of words makes exactly one bigram."
    },
    {
        level: "medium",
        type: "select",
        title: "Spot the mistake",
        instruction: "A student wrote out the bigrams of \"the cat sat on the mat\". Some of them are wrong. Click every wrong bigram.",
        prompt: "Which of the student's bigrams are wrong?",
        sentence: ["the cat", "cat sat", "sat the", "on the", "mat the"],
        answers: [2, 4],
        explain: "The correct bigrams are <strong>the cat, cat sat, sat on, on the, the mat</strong>. " +
                 "<strong>sat the</strong> skips the word \"on\", so it should be <strong>sat on</strong>. " +
                 "<strong>mat the</strong> has the words in reverse order, so it should be <strong>the mat</strong>. " +
                 "Notice the list still has 5 items, which matches 6 − 2 + 1, so counting alone would not reveal these errors."
    },

    /* ---------- HARD ---------- */
    {
        level: "hard",
        type: "choice",
        title: "Repeated n-grams",
        instruction: "The same n-gram can appear more than once. Write out the bigrams first, then count. Pick the number for each row.",
        prompt: "Sentence: \"the cat sat on the mat the cat ran\" (9 words)",
        items: [
            { label: "How many bigrams in total?",                         options: ["7", "8", "9"], answer: "8" },
            { label: "How many times does the bigram \"the cat\" appear?", options: ["1", "2", "3"], answer: "2" },
            { label: "How many different (unique) bigrams are there?",     options: ["6", "7", "8"], answer: "7" },
            { label: "How many bigrams start with the word \"the\"?",      options: ["2", "3", "4"], answer: "3" }
        ],
        explain: "The 8 bigrams are: <strong>the cat, cat sat, sat on, on the, the mat, mat the, the cat, cat ran</strong>. " +
                 "Total = 9 − 2 + 1 = <strong>8</strong>. \"the cat\" appears <strong>2</strong> times, so only <strong>7</strong> are unique. " +
                 "Three bigrams start with \"the\" (the cat, the mat, the cat). " +
                 "Language models rely on exactly this kind of counting."
    },
    {
        level: "hard",
        type: "select",
        title: "Spot the mistake in the trigrams",
        instruction: "A student wrote out the trigrams of \"I like to read books every day\". Click every wrong trigram. Check the formula first: how many trigrams should there be?",
        prompt: "Which of the student's trigrams are wrong?",
        sentence: ["I like to", "like to read", "like read books", "to read books", "read books every", "books every day", "day every books"],
        answers: [2, 6],
        explain: "The sentence has 7 words, so it has 7 − 3 + 1 = <strong>5</strong> trigrams, but the student listed 7. " +
                 "The correct ones are <strong>I like to, like to read, to read books, read books every, books every day</strong>. " +
                 "<strong>like read books</strong> skips the word \"to\", and <strong>day every books</strong> reverses the order. " +
                 "Comparing the list length with the formula is a fast way to find out that something is wrong."
    },
    {
        level: "hard",
        type: "choice",
        title: "Predict the next word",
        instruction: "Bigram counts let us estimate which word comes next: P(w2 | w1) = count(w1 w2) ÷ count(w1). Use the counts given to work out each probability.",
        prompt: "Corpus: \"I love pizza. I love pizza. I love pasta. I like pasta.\"  Counts: I = 4, love = 3, \"I love\" = 3, \"love pizza\" = 2, \"love pasta\" = 1",
        items: [
            { label: "P(pizza | love)", options: ["1/3", "2/3", "3/4"], answer: "2/3" },
            { label: "P(pasta | love)", options: ["1/3", "2/3", "1/2"], answer: "1/3" },
            { label: "P(love | I)",     options: ["1/4", "3/4", "1"],   answer: "3/4" },
            { label: "Which word is the most likely to follow \"love\"?", options: ["pizza", "pasta", "like"], answer: "pizza" }
        ],
        explain: "<strong>P(pizza | love)</strong> = count(love pizza) ÷ count(love) = 2 ÷ 3. " +
                 "<strong>P(pasta | love)</strong> = 1 ÷ 3. <strong>P(love | I)</strong> = 3 ÷ 4, because \"I\" appears 4 times and is followed by \"love\" 3 times. " +
                 "\"pizza\" is the most likely word after \"love\" because 2/3 is bigger than 1/3. " +
                 "This is the idea behind a simple bigram language model."
    }
];

let currentQuestionIndex = 0;
let selections = questions.map(q =>
    q.type === "select" ? new Set() : q.items.map(() => null)
);
let questionResults = new Array(questions.length).fill(null);

/* =========================
   SHARED HELPERS
========================= */

function makeChip(text, isSelected, onClick) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "word-chip" + (isSelected ? " selected" : "");
    chip.textContent = text;
    chip.setAttribute("aria-pressed", isSelected ? "true" : "false");
    chip.addEventListener("click", onClick);
    return chip;
}

function setChipSelected(chip, isSelected) {
    chip.classList.toggle("selected", isSelected);
    chip.setAttribute("aria-pressed", isSelected ? "true" : "false");
}

function sameSet(a, b) {
    return a.size === b.size && [...a].every(v => b.has(v));
}

/* =========================
   WARM-UP
========================= */

function renderPractice() {
    const container = document.getElementById("practiceSentence");
    container.innerHTML = "";
    practiceSelection = new Set();

    practiceSentence.forEach((word, index) => {
        const chip = makeChip(word, false, () => {
            if (practiceSelection.has(index)) practiceSelection.delete(index);
            else practiceSelection.add(index);
            setChipSelected(chip, practiceSelection.has(index));
        });
        container.appendChild(chip);
    });
}

function checkPractice() {
    const feedback = document.getElementById("practiceFeedback");
    const result = document.getElementById("practiceResult");
    const isCorrect = sameSet(practiceSelection, practiceAnswer);

    feedback.className = isCorrect ? "feedback show correct" : "feedback show wrong";
    feedback.innerHTML = isCorrect
        ? "<strong>🎉 Correct!</strong><br>The trigram starting at \"love\" is <strong>love natural language</strong>."
        : "<strong>❌ Not quite.</strong><br>A trigram is 3 words in a row. Start at \"love\" and take it plus the next two words.";

    // All trigrams of the sentence, with the one from this exercise highlighted.
    const trigrams = [];
    for (let i = 0; i <= practiceSentence.length - 3; i++) {
        trigrams.push({ text: practiceSentence.slice(i, i + 3).join(" "), target: i === 1 });
    }
    result.className = "practice-result show";
    result.innerHTML = `
        <div class="result-label">All 3 trigrams of the sentence (5 − 3 + 1 = 3):</div>
        <div class="result-chips">
            ${trigrams.map(t => `<span class="result-chip${t.target ? " changed" : ""}">${t.text}</span>`).join("")}
        </div>
    `;

    document.querySelectorAll("#practiceSentence .word-chip").forEach((chip, index) => {
        chip.classList.remove("correct", "missed", "wrong-selected");
        if (practiceAnswer.has(index)) {
            chip.classList.add(practiceSelection.has(index) ? "correct" : "missed");
        } else if (practiceSelection.has(index)) {
            chip.classList.add("wrong-selected");
        }
    });
}

/* =========================
   PROGRESS STRIP
========================= */

function buildProgressStrip() {
    const strip = document.getElementById("progressStrip");
    strip.innerHTML = "";
    questions.forEach((q, i) => {
        const seg = document.createElement("button");
        seg.type = "button";
        seg.className = "progress-seg seg-" + q.level;
        seg.textContent = i + 1;
        seg.addEventListener("click", () => {
            currentQuestionIndex = i;
            renderQuestion();
        });
        strip.appendChild(seg);
    });
}

function updateProgressStrip() {
    document.querySelectorAll("#progressStrip .progress-seg").forEach((seg, i) => {
        const r = questionResults[i];
        seg.classList.toggle("seg-correct", r === true);
        seg.classList.toggle("seg-wrong", r === false);
        seg.classList.toggle("seg-current", i === currentQuestionIndex);
        const status = r === true ? "correct" : r === false ? "incorrect" : "not checked";
        seg.setAttribute("aria-label", `Question ${i + 1}, ${LEVEL_LABEL[questions[i].level]}, ${status}`);
        if (i === currentQuestionIndex) seg.setAttribute("aria-current", "step");
        else seg.removeAttribute("aria-current");
    });
}

/* =========================
   TASK RENDERING
========================= */

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    const area = document.getElementById("taskArea");
    area.innerHTML = "";

    document.getElementById("currentQuestion").textContent = currentQuestionIndex + 1;
    document.getElementById("questionInstruction").textContent = q.instruction;

    const box = document.getElementById("questionBox");
    box.innerHTML = "";
    const meta = document.createElement("div");
    meta.className = "question-meta";
    const title = document.createElement("span");
    title.className = "question-title";
    title.textContent = q.title;
    const level = document.createElement("span");
    level.className = "level level-" + q.level;
    level.textContent = LEVEL_LABEL[q.level];
    meta.append(title, level);
    const prompt = document.createElement("div");
    prompt.className = "question-prompt";
    prompt.textContent = q.prompt;
    box.append(meta, prompt);

    if (q.type === "select") renderSelectQuestion(q, area);
    else renderChoiceQuestion(q, area);

    resetFeedback();

    if (questionResults[currentQuestionIndex] !== null) {
        applyMarks();
        showFeedback(true);
    }

    updateSelectionStatus();
    updateNavigationButtons();
    updateProgressStrip();
}

function renderSelectQuestion(q, area) {
    const wrap = document.createElement("div");
    wrap.className = "task-word-area";
    wrap.id = "taskWords";
    const selection = selections[currentQuestionIndex];

    q.sentence.forEach((word, index) => {
        const chip = makeChip(word, selection.has(index), () => {
            if (selection.has(index)) selection.delete(index);
            else selection.add(index);
            setChipSelected(chip, selection.has(index));
            onSelectionChanged();
        });
        wrap.appendChild(chip);
    });
    area.appendChild(wrap);
}

function renderChoiceQuestion(q, area) {
    const list = document.createElement("div");
    list.className = "choice-list";
    const picks = selections[currentQuestionIndex];

    q.items.forEach((item, rowIndex) => {
        const row = document.createElement("div");
        row.className = "choice-row";
        row.dataset.row = rowIndex;

        const label = document.createElement("div");
        label.className = "choice-label";
        label.textContent = item.label;

        const options = document.createElement("div");
        options.className = "choice-options";

        item.options.forEach(option => {
            const chip = makeChip(option, picks[rowIndex] === option, () => {
                picks[rowIndex] = option;
                options.querySelectorAll(".word-chip").forEach(c => setChipSelected(c, c === chip));
                onSelectionChanged();
            });
            chip.dataset.option = option;
            options.appendChild(chip);
        });

        row.append(label, options);
        list.appendChild(row);
    });
    area.appendChild(list);
}

function onSelectionChanged() {
    // Changing an answer after checking clears the old result so it can be checked again.
    if (questionResults[currentQuestionIndex] !== null) {
        questionResults[currentQuestionIndex] = null;
        clearMarks();
        resetFeedback();
        updateProgressStrip();
    }
    updateSelectionStatus();
}

function updateSelectionStatus() {
    const q = questions[currentQuestionIndex];
    const status = document.getElementById("selectionStatus");
    if (q.type === "select") {
        const count = selections[currentQuestionIndex].size;
        status.textContent = `${count} item${count === 1 ? "" : "s"} selected`;
    } else {
        const answered = selections[currentQuestionIndex].filter(v => v !== null).length;
        status.textContent = `${answered} of ${q.items.length} answered`;
    }
}

/* =========================
   CHECKING
========================= */

function checkAnswer() {
    const q = questions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");
    let isCorrect;

    if (q.type === "select") {
        const selected = selections[currentQuestionIndex];
        if (selected.size === 0) {
            feedback.className = "feedback show wrong";
            feedback.innerHTML = "<strong>Select at least one item first.</strong><br>Click the items you think match, then check again.";
            return;
        }
        isCorrect = sameSet(selected, new Set(q.answers));
    } else {
        const picks = selections[currentQuestionIndex];
        if (picks.some(p => p === null)) {
            feedback.className = "feedback show wrong";
            feedback.innerHTML = "<strong>Answer every row first.</strong><br>Pick one option in each row, then check again.";
            return;
        }
        isCorrect = q.items.every((item, i) => picks[i] === item.answer);
    }

    questionResults[currentQuestionIndex] = isCorrect;
    applyMarks();
    showFeedback(false);
    updateProgressStrip();
}

function applyMarks() {
    const q = questions[currentQuestionIndex];

    if (q.type === "select") {
        const selected = selections[currentQuestionIndex];
        const correct = new Set(q.answers);
        document.querySelectorAll("#taskWords .word-chip").forEach((chip, index) => {
            chip.classList.remove("correct", "missed", "wrong-selected");
            if (correct.has(index)) chip.classList.add(selected.has(index) ? "correct" : "missed");
            else if (selected.has(index)) chip.classList.add("wrong-selected");
        });
        return;
    }

    const picks = selections[currentQuestionIndex];
    document.querySelectorAll(".choice-row").forEach(row => {
        const rowIndex = Number(row.dataset.row);
        const item = q.items[rowIndex];
        const rowCorrect = picks[rowIndex] === item.answer;
        row.classList.remove("row-correct", "row-wrong");
        row.classList.add(rowCorrect ? "row-correct" : "row-wrong");

        row.querySelectorAll(".word-chip").forEach(chip => {
            chip.classList.remove("correct", "missed", "wrong-selected");
            if (chip.dataset.option === item.answer) chip.classList.add("correct");
            else if (chip.dataset.option === picks[rowIndex]) chip.classList.add("wrong-selected");
        });
    });
}

function clearMarks() {
    document.querySelectorAll("#taskArea .word-chip").forEach(chip =>
        chip.classList.remove("correct", "missed", "wrong-selected"));
    document.querySelectorAll(".choice-row").forEach(row =>
        row.classList.remove("row-correct", "row-wrong"));
}

function showFeedback(isSaved) {
    const q = questions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");
    const explain = document.getElementById("explainBox");
    const ok = questionResults[currentQuestionIndex] === true;

    feedback.className = ok ? "feedback show correct" : "feedback show wrong";
    if (ok) {
        feedback.innerHTML = isSaved
            ? "<strong>🎉 Correct!</strong><br>You answered this question correctly."
            : "<strong>🎉 Correct!</strong><br>Every answer is right.";
    } else {
        feedback.innerHTML = "<strong>❌ Not quite.</strong><br>The correct answers are highlighted in green. Read the explanation below, then change your answers to try again.";
    }

    explain.className = "explain-box show";
    explain.innerHTML = "<strong>Why:</strong> " + q.explain;
}

function resetFeedback() {
    const feedback = document.getElementById("feedback");
    const explain = document.getElementById("explainBox");
    feedback.className = "feedback";
    feedback.innerHTML = "";
    explain.className = "explain-box";
    explain.innerHTML = "";
}

/* =========================
   NAVIGATION & FINISH
========================= */

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function updateNavigationButtons() {
    const previousButton = document.getElementById("previousButton");
    const nextButton = document.getElementById("nextButton");
    previousButton.disabled = currentQuestionIndex === 0;

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "Finish Task ✓";
        nextButton.onclick = finishTask;
    } else {
        nextButton.textContent = "Next →";
        nextButton.onclick = nextQuestion;
    }
}

function finishTask() {
    const score = questionResults.filter(r => r === true).length;
    const total = questions.length;
    const taskCard = document.querySelector(".task-card");

    const levelScores = ["easy", "medium", "hard"].map(level => {
        const idx = questions.map((q, i) => q.level === level ? i : -1).filter(i => i !== -1);
        const got = idx.filter(i => questionResults[i] === true).length;
        return `<li><span><span class="level level-${level}">${LEVEL_LABEL[level]}</span></span><span>${got} / ${idx.length}</span></li>`;
    }).join("");

    const recap = questions.map((q, i) => {
        const status = questionResults[i] === true
            ? '<span class="ok">Correct</span>'
            : questionResults[i] === false
                ? '<span class="no">Incorrect</span>'
                : '<span class="no">Not checked</span>';
        return `<li><span>${i + 1}. ${q.title}</span>${status}</li>`;
    }).join("");

    taskCard.innerHTML = `
        <div class="final-score">
            <div class="score-icon">🎉</div>
            <h2>Task Completed!</h2>
            <p>You completed all ${total} n-gram challenges.</p>
            <div class="score-circle">${score}/${total}</div>
            <ul class="recap">${levelScores}</ul>
            <ul class="recap">${recap}</ul>
            <p class="score-message">
                ${score === total
                    ? "Excellent! You can build, count, check and use n-grams."
                    : score >= Math.ceil(total * 0.7)
                    ? "Good job! Review the questions you missed and try again."
                    : "Keep practicing! Remember: n-grams are neighbouring words in order, and a sentence has T − n + 1 of them."
                }
            </p>
            <button onclick="restartQuiz()">Try Again</button>
        </div>
    `;
}

function restartQuiz() {
    location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("totalQuestions").textContent = questions.length;
    renderPractice();
    buildProgressStrip();
    renderQuestion();
});
