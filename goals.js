var row=null;

function add() {
    var formContainer = document.getElementById("form-container");
    var newField = document.createElement("div")
    newField.innerHTML = `
        <div class="form-row, row">
            <button type="button" onclick="remove(this)">&#10006</button>
            <input type="text" id="title"   name="title[]" placeholder="Type a goal Title here">
   
        </div>
        <div class="form-row">
            <input type="text" name="description[]" id="description" placeholder="Type a goal description here">
         </div>`
    formContainer.appendChild(newField)

}


function Save() {
    var dataEntered = retrieveData()
     var readData = readingDataFromLocalStorage(dataEntered);
     var title = document.forms["form"]["title"].value;
     var description = document.forms["form"]["description"].value;
     if (dataEntered == false) {
        alert("please enter all field")
     }
     else {
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
        insert(readData)
     }           
 } 
function retrieveData() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var arr = [title, description]
    if (arr.includes("")) {
        return false;
    } else {
        return arr;
    }

}


function readingDataFromLocalStorage(dataEntered) {
    var t = localStorage.setItem("Title", dataEntered[0]);
    var d = localStorage.setItem("Description", dataEntered[1]);

    var t1 = localStorage.getItem("Title", t);
    var d1 = localStorage.getItem("Description", d);

    var arr = [t1, d1];
    return arr;
}


function insert(readData) {
    var row = table.insertRow()
    row.insertCell(0).innerHTML = readData[0];
    row.insertCell(1).innerHTML = readData[1];
}


function remove(element) {
    var formContainer = document.getElementById("form-container")
    var Remove = element.parentNode.parentNode;
    formContainer.removeChild(Remove)
}


