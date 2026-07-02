// Chargement du JSON
let questions = [];
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data.questions;
        startQCM();
    })
    .catch(error => console.error('Erreur de chargement du JSON:', error));

// Variables globales
let selectedAnswers = {};
let timeLeft = 2400; // 40 minutes en secondes
let timerInterval;
let qcmQuestions = [];

// Contraintes par catégorie : { min, max }
const categoryConstraints = {
    1: { min: 6, max: 10 },
    2: { min: 6, max: 10 },
    3: { min: 5, max: 10 },
    4: { min: 5, max: 8 },
    5: { min: 5, max: 8 },
    6: { min: 3, max: 5 }
};

// Démarrer le QCM
function startQCM() {
    qcmQuestions = selectRandomQuestionsWithConstraints(questions);
    qcmQuestions.sort((a, b) => a.cat - b.cat); // Trier par catégorie
    renderQuestions(qcmQuestions);
    startTimer();
}

// Sélectionner 40 questions aléatoires en respectant les contraintes par catégorie
function selectRandomQuestionsWithConstraints(allQuestions) {
    const categories = [...new Set(allQuestions.map(q => q.cat))];
    const questionsByCategory = {};
    categories.forEach(cat => {
        questionsByCategory[cat] = allQuestions.filter(q => q.cat === cat);
    });

    const selected = [];
    let remainingTotal = 40;

    // Répartir les questions en respectant les contraintes
    categories.forEach(cat => {
        const { min, max } = categoryConstraints[cat];
        const availableQuestions = questionsByCategory[cat].length;

        // Calculer le nombre de questions pour cette catégorie
        let count = Math.min(
            Math.max(min, Math.floor((remainingTotal / categories.length))),
            max,
            availableQuestions
        );

        // Ajuster pour ne pas dépasser le total de 40
        if (remainingTotal - count < (categories.length - categories.indexOf(cat) - 1) * 3) {
            count = Math.min(
                remainingTotal - (categories.length - categories.indexOf(cat) - 1) * 3,
                max,
                availableQuestions
            );
        }

        // Sélectionner aléatoirement 'count' questions pour cette catégorie
        const shuffled = [...questionsByCategory[cat]].sort(() => 0.5 - Math.random());
        selected.push(...shuffled.slice(0, count));
        remainingTotal -= count;
    });

    // Si on n'a pas assez de questions, compléter aléatoirement
    while (selected.length < 40) {
        const remainingCategories = categories.filter(cat =>
            selected.filter(q => q.cat === cat).length < categoryConstraints[cat].max
        );
        if (remainingCategories.length === 0) break;

        const randomCat = remainingCategories[Math.floor(Math.random() * remainingCategories.length)];
        const available = questionsByCategory[randomCat].filter(
            q => !selected.some(s => s.idQ === q.idQ)
        );
        if (available.length === 0) continue;

        const randomIndex = Math.floor(Math.random() * available.length);
        selected.push(available[randomIndex]);
    }

    // Si on a trop de questions, en retirer aléatoirement
    while (selected.length > 40) {
        const randomIndex = Math.floor(Math.random() * selected.length);
        selected.splice(randomIndex, 1);
    }

    return selected;
}

// Afficher les questions (avec séparateurs de catégorie)
function renderQuestions(questions) {
    const container = document.getElementById('qcm-container');
    container.innerHTML = '';

    let currentCategory = null;
    questions.forEach((question, index) => {
        // Ajouter un séparateur si la catégorie change
        if (question.cat !== currentCategory) {
            currentCategory = question.cat;
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'bg-blue-200 p-3 rounded-lg mt-4 mb-2 text-center font-bold text-blue-800';
            categoryHeader.textContent = `Catégorie ${currentCategory}`;
            container.appendChild(categoryHeader);
        }

        const questionDiv = document.createElement('div');
        questionDiv.className = 'bg-white p-4 rounded-lg shadow-md mb-4';
        questionDiv.innerHTML = `
            <h3 class="text-lg font-semibold text-blue-800 mb-2">Question ${index + 1} : ${question.quest}</h3>
            <div class="space-y-2">
                ${question.answers.map(answer => `
                    <label class="flex items-center space-x-2 p-2 border rounded-lg hover:bg-blue-50 cursor-pointer">
                        <input type="checkbox" name="q${question.idQ}" value="${answer.idA}" class="h-5 w-5 text-blue-600">
                        <span>${answer.ans}</span>
                    </label>
                `).join('')}
            </div>
        `;
        container.appendChild(questionDiv);
    });
}

// Démarrer le chronomètre
function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQCM();
        }
    }, 1000);
}

// Soumettre le QCM
function submitQCM() {
    clearInterval(timerInterval);
    const answers = document.querySelectorAll('input[type="checkbox"]:checked');
    answers.forEach(answer => {
        const questionId = parseInt(answer.name.substring(1));
        if (!selectedAnswers[questionId]) {
            selectedAnswers[questionId] = [];
        }
        selectedAnswers[questionId].push(parseInt(answer.value));
    });
    showResults();
}

// Afficher les résultats
function showResults() {
    let score = 0;
    const container = document.getElementById('qcm-container');
    container.innerHTML = '';

    // Réorganiser les questions par catégorie pour les résultats
    const sortedQuestions = [...qcmQuestions].sort((a, b) => a.cat - b.cat);

    let currentCategory = null;
    sortedQuestions.forEach((question, index) => {
        // Ajouter un séparateur si la catégorie change
        if (question.cat !== currentCategory) {
            currentCategory = question.cat;
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'bg-blue-200 p-3 rounded-lg mt-4 mb-2 text-center font-bold text-blue-800';
            categoryHeader.textContent = `Catégorie ${currentCategory}`;
            container.appendChild(categoryHeader);
        }

        const userAnswers = selectedAnswers[question.idQ] || [];
        const correctAnswers = question.answers.filter(a => a.verif === 1).map(a => a.idA);
        const isCorrect = JSON.stringify(userAnswers.sort()) === JSON.stringify(correctAnswers.sort());

        if (isCorrect) score++;

        const questionDiv = document.createElement('div');
        questionDiv.className = 'bg-white p-4 rounded-lg shadow-md mb-4';
        questionDiv.innerHTML = `
            <h3 class="text-lg font-semibold mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}">
                Question ${index + 1} : ${question.quest} ${isCorrect ? '✅' : '❌'}
            </h3>
            <div class="space-y-2">
                ${question.answers.map(answer => {
                    const isUserSelected = userAnswers.includes(answer.idA);
                    const isCorrectAnswer = answer.verif === 1;
                    let className = 'p-2 border rounded-lg';
                    if (isUserSelected && isCorrectAnswer) {
                        className += ' bg-green-100 border-green-400';
                    } else if (isUserSelected && !isCorrectAnswer) {
                        className += ' bg-red-100 border-red-400 line-through';
                    } else if (!isUserSelected && isCorrectAnswer) {
                        className += ' bg-red-100 border-red-400';
                    } else {
                        className += ' hover:bg-blue-50 cursor-pointer';
                    }
                    return `<div class="${className}">${answer.ans}</div>`;
                }).join('')}
            </div>
        `;
        container.appendChild(questionDiv);
    });

    // Afficher le score
    const scoreDiv = document.createElement('div');
    scoreDiv.className = 'bg-white p-4 rounded-lg shadow-md text-center text-xl font-bold mt-6';
    scoreDiv.textContent = `Score : ${score}/40`;
    container.appendChild(scoreDiv);

    // Masquer le bouton Envoyer
    document.getElementById('submit-btn').style.display = 'none';
}

// Écouteur pour le bouton Envoyer
document.getElementById('submit-btn').addEventListener('click', submitQCM);