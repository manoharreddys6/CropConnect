document.addEventListener("DOMContentLoaded", displayProblems);

function displayProblems() {
  const problems = JSON.parse(localStorage.getItem("problems")) || [];
  const problemsList = document.getElementById("problemsList");
  problemsList.innerHTML = "";
  problems.forEach((problem, index) => {
    const problemElement = document.createElement("div");
    problemElement.classList.add("problem");

    const problemId = document.createElement("p");
    problemId.textContent = `ID: ${problem.id}`;
    problemElement.appendChild(problemId);

    const problemTitle = document.createElement("h3");
    problemTitle.textContent = problem.title;
    problemElement.appendChild(problemTitle);

    const problemDescription = document.createElement("p");
    problemDescription.textContent = problem.description;
    problemElement.appendChild(problemDescription);

    if (problem.image) {
      const problemImage = document.createElement("img");
      problemImage.src = problem.image;
      problemImage.alt = problem.title;
      problemImage.style.maxWidth = "100%";
      problemElement.appendChild(problemImage);
    }

    const answersContainer = document.createElement("div");
    answersContainer.classList.add("answers");
    problem.answers.forEach((answer) => {
      const answerText = document.createElement("p");
      answerText.textContent = answer;
      answersContainer.appendChild(answerText);
    });

    const answerInputContainer = document.createElement("div");
    answerInputContainer.classList.add("answer-input");
    const answerInput = document.createElement("input");
    answerInput.id = `answerInput${index}`;
    answerInput.placeholder = "Your answer...";
    const answerButton = document.createElement("button");
    answerButton.textContent = "Post Answer";
    answerButton.onclick = () => postAnswer(index);

    answerInputContainer.appendChild(answerInput);
    answerInputContainer.appendChild(answerButton);

    problemElement.appendChild(answersContainer);
    problemElement.appendChild(answerInputContainer);

    problemsList.appendChild(problemElement);
  });
}

function postAnswer(problemIndex) {
  const answerInput = document.getElementById(`answerInput${problemIndex}`);
  const answerText = answerInput.value.trim();
  if (answerText) {
    const problems = JSON.parse(localStorage.getItem("problems"));
    problems[problemIndex].answers.push(answerText);
    localStorage.setItem("problems", JSON.stringify(problems));
    answerInput.value = "";
    displayProblems();
  }
}
