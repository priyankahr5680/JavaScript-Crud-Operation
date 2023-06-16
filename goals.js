let dataEntered = [];

function addForm() {
  const goalContainer = document.getElementById("goal-container");
  const formRepeats = document.getElementsByClassName("form-repeat");
  const lastForm = formRepeats[formRepeats.length - 1];
  const newForm = lastForm.cloneNode(true);

  const formInputs = newForm.querySelectorAll("input");
  formInputs.forEach((input) => {
    input.value = "";
    input.removeAttribute("readonly");
  });

  const previousForm = formRepeats[formRepeats.length - 1];
  if (previousForm) {
    const previousFormInputs = previousForm.querySelectorAll("input");
    previousFormInputs.forEach((input) => {
      input.disabled = true; // Disable input fields for saved data
    });
  }

  goalContainer.insertBefore(newForm, document.getElementById("add-button"));

  const newFormInputs = newForm.querySelectorAll("input");
  newFormInputs.forEach((input) => {
    input.disabled = false; // Enable input fields for the new form
  });
}

function Save() {
  var formRepeats = document.getElementsByClassName("form-repeat");
  for (let i = 0; i < formRepeats.length; i++) {
    const currentForm = formRepeats[i];
    var title = currentForm.querySelector("input[name='title']").value;
    var description = currentForm.querySelector("input[name='description']").value;

    if (title.trim() === "" || description.trim() === "") {
      alert("Please fill in all fields.");
      return false;
    }

    var titleValid = /^[A-Za-z]+$/;
    if (!title.match(titleValid)) {
      alert("Title should only contain letters.");
      return false;
    }

    var descriptionValid = /^[A-Za-z0-9]+$/;
    if (!description.match(descriptionValid)) {
      alert("Description should contain both letters and numbers.");
      return false;
    }
  }

  dataEntered = [title, description];
  insert(dataEntered);

  formRepeats = document.getElementsByClassName("form-repeat");
  for (let i = 0; i < formRepeats.length - 1; i++) {
    const currentForm = formRepeats[i];
    const formInputs = currentForm.querySelectorAll("input");
    formInputs.forEach((input) => {
      input.disabled = true; // Disable input fields for saved data
    });
  }
}

function insert(dataEntered) {
  const table = document.getElementById("table");
  const row = table.insertRow();
  row.insertCell(0).innerHTML = dataEntered[0];
  row.insertCell(1).innerHTML = dataEntered[1];
}

function deleteGoal(button) {
  const form = button.parentNode.parentNode.parentNode;
  form.remove();

  const formRepeats = document.getElementsByClassName("form-repeat");
  for (let i = 0; i < formRepeats.length; i++) {
    const currentForm = formRepeats[i];
    const formInputs = currentForm.querySelectorAll("input");
    formInputs.forEach((input) => {
      input.disabled = true; // Disable input fields for saved data
    });
  }
}