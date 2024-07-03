function postProblem() {
    const questionId = document.getElementById("questionId").value.trim();
    const problemTitle = document.getElementById("problemTitle").value.trim();
    const problemDescription = document
      .getElementById("problemDescription")
      .value.trim();
    const problemImageInput = document.getElementById("problemImage");
    const problemImageFile = problemImageInput.files[0];
  
    if (questionId && problemTitle && problemDescription) {
      const problems = JSON.parse(localStorage.getItem("problems")) || [];
      const reader = new FileReader();
  
      reader.onload = function (event) {
        const problem = {
          id: questionId,
          title: problemTitle,
          description: problemDescription,
          image: event.target.result,
          answers: [],
        };
        problems.push(problem);
        localStorage.setItem("problems", JSON.stringify(problems));
        alert("Problem posted successfully!");
        // Clear the input fields
        document.getElementById("questionId").value = "";
        document.getElementById("problemTitle").value = "";
        document.getElementById("problemDescription").value = "";
        problemImageInput.value = "";
      };
  
      if (problemImageFile) {
        reader.readAsDataURL(problemImageFile);
      } else {
        // If no image is selected
        const problem = {
          id: questionId,
          title: problemTitle,
          description: problemDescription,
          image: "",
          answers: [],
        };
        problems.push(problem);
        localStorage.setItem("problems", JSON.stringify(problems));
        alert("Problem posted successfully!");
        // Clear the input fields
        document.getElementById("questionId").value = "";
        document.getElementById("problemTitle").value = "";
        document.getElementById("problemDescription").value = "";
        problemImageInput.value = "";
      }
    } else {
      alert("Please fill out all fields.");
    }
  }