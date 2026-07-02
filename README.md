# 🏊‍♂️ QCM BNSSA - Entraînement à l'examen théorique

![GitHub last commit](https://img.shields.io/github/last-commit/justinecombeaubts/qcm-bnssa?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/justinecombeaubts/qcm-bnssa?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

> **Prépare-toi efficacement à l'épreuve théorique du BNSSA (Brevet National de Sécurité et de Sauvetage Aquatique) avec des QCM générés aléatoirement, dans les conditions réelles de l'examen.**

---

## 📌 À propos du projet

Ce projet est une **application web** conçue pour aider les candidats à réviser et s'entraîner pour l'épreuve théorique du **BNSSA**. Il propose des **QCM (Questionnaires à Choix Multiples)** générés aléatoirement, respectant les **contraintes officielles** de l'examen :

- **40 questions** tirées aléatoirement.
- **40 minutes** pour répondre (comme à l'examen).
- **Correction immédiate** avec explications.
- **Score calculé** selon les règles officielles.

---

## ✨ Fonctionnalités

### 🎯 Modes d'entraînement
- **Simulations d'examen** : 40 questions en 40 minutes, comme le jour J.
- **Questions aléatoires** : Chaque session est unique.
- **Répartition par catégories** : Respect des contraintes officielles (ex : 5 à 8 questions par thème).

### 📚 Catégories couvertes
Le QCM couvre les **6 parties officielles** de l'examen théorique du BNSSA :

1. **Connaissance du milieu** (ex : courants, marées, vents).
2. **Diplômes, compétences et obligations** (rôle du BNSSA, réglementation).
3. **Organisation administrative** (structures, responsabilités).
4. **Organisation de la sécurité** (dispositifs, signalisation).
5. **Surveillance et sécurité des activités spécifiques** (baignade, sports nautiques).
6. **Conduite à tenir en cas d'accident - Premiers soins** (PSE1, gestes d'urgence).

### 🔍 Correction et feedback
- **Correction immédiate** après soumission.
- **Explications détaillées** pour chaque réponse.
- **Score final** avec pourcentage de réussite.

### ⏱️ Minuterie intégrée
- Chronomètre en temps réel (40 minutes).
- Alertes visuelles pour le temps restant.

---

## 🚀 Installation et utilisation

### 📥 Prérequis
- Un navigateur web moderne (Chrome, Firefox, Edge, Safari).
- Aucune installation nécessaire : l'application fonctionne **100% en ligne** (mode local).

### 🌐 Comment l'utiliser ?
1. **Cloner le dépôt** (optionnel) :
   ```bash
   git clone https://github.com/justinecombeaubts/qcm-bnssa.git
   ```
2. **Ouvrir le fichier `index.html`** dans votre navigateur :
   - Double-cliquez sur `qcm-bnssa/index.html` (si vous avez cloné le dépôt).
   - Ou téléchargez les fichiers et ouvrez-les localement.

3. **Commencer un QCM** :
   - Cliquez sur le bouton **"Commencer le QCM"** depuis la page d'accueil.
   - Répondez aux 40 questions en **40 minutes maximum**.
   - Soumettez vos réponses pour obtenir votre score et les corrections.

---

## 📂 Structure du projet

```
qcm-bnssa/
├── index.html          # Page d'accueil (présentation)
├── qcm.html            # Page du QCM (questions et réponses)
├── script.js           # Logique du QCM (génération, minuterie, correction)
├── config.json         # Configuration (catégories, limites de temps, etc.)
├── questions.json      # Base de données des questions (40+ questions)
└── bddqcmbnssa.txt     # Fichier source des questions (optionnel)
```

---

## 🛠️ Configuration

Le fichier [`config.json`](qcm-bnssa/config.json) permet de personnaliser :
- Le **nombre de questions** par catégorie (min/max).
- La **limite de temps** (par défaut : 40 minutes).
- Le **thème UI** (couleurs, affichage).
- Le **mode de mélange** des questions et réponses.

Exemple de configuration :
```json
{
  "quiz": {
    "timeLimitMinutes": 40,
    "totalQuestions": 40,
    "shuffleQuestions": true,
    "shuffleAnswers": true
  }
}
```

---

## 📝 Contribuer

Les contributions sont les bienvenues ! Voici comment aider :

### 🐛 Signaler un bug
Ouvrez une [issue](https://github.com/justinecombeaubts/qcm-bnssa/issues) en décrivant :
- Le problème rencontré.
- Les étapes pour le reproduire.
- Une capture d'écran si nécessaire.

### ✍️ Ajouter des questions
1. **Forker** le dépôt.
2. **Modifier** le fichier [`questions.json`](qcm-bnssa/questions.json) pour ajouter de nouvelles questions.
   - Format attendu :
     ```json
     {
       "id": 41,
       "question": "Quelle est la profondeur minimale pour un plongeon ?",
       "options": ["1m", "1.5m", "2m", "2.5m"],
       "answer": [1],  // Index de la bonne réponse (0 pour la 1ère option)
       "explanation": "La profondeur minimale recommandée est de 1.5m pour éviter les blessures.",
       "cat": 1        // Catégorie (1 à 6)
     }
     ```
3. **Ouvrir une Pull Request** avec vos modifications.

### 🎨 Améliorer l'UI/UX
- Proposez des améliorations pour le design (CSS/Tailwind).
- Ajoutez des animations ou des fonctionnalités (ex : mode sombre, historique des scores).

---

## 📜 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de :
- L'utiliser, le modifier et le distribuer.
- L'intégrer dans d'autres projets (même commerciaux).

Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- Aux **formateurs BNSSA** pour leur expertise.
- À la communauté **open-source** pour les outils utilisés (Tailwind CSS, etc.).
- À tous les **contributeurs** qui améliorent ce projet.

---

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à :
- Ouvrir une [issue](https://github.com/justinecombeaubts/qcm-bnssa/issues).
- Contacter le propriétaire du dépôt via GitHub.

---

**Bonne révision et bon courage pour l'examen du BNSSA !** 🏊‍♂️💪
