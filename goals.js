//Global variable

var row = null;


function Submit() {
    var dataEntered = retrieveData()
    var readData = readingDataFromLocalStorage(dataEntered);
    var title = document.forms["form"]["title"].value;
    var description = document.forms["form"]["description"].value;
    if (dataEntered == false) {
        msg.innerHTML = `<h3 style="color:red;">Please Enter Data</h3>`;
    }
    else {
        if (row == null) {
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

            if (title.trim() === "" || description.trim() === "") {
                alert("Please fill in all fields.");
                return false;
            }
            insert(readData)
            msg.innerHTML = `<h3 style="color:green;">Data Inserted</h3>`;
        } else {
            update();
            msg.innerHTML = `<h3 style="color:orange;">Data Updated</h3>`;
        }
    }
    //make after sumbit to reset
    document.getElementById("form").reset();
}

//Retrieving data from form
function retrieveData() {
    var title1 = document.getElementById("title").value;
    var description = document.getElementById("description").value;


    var arr = [title1, description]
    if (arr.includes("")) {
        return false;
    } else {
        return arr;
    }
}

//Data in LocalStorage
function readingDataFromLocalStorage(dataEntered) {
    //stroring data in local storage
    var t = localStorage.setItem("Title", dataEntered[0]);
    var d = localStorage.setItem("Description", dataEntered[1]);


    //getting values from local to table
    var t1 = localStorage.getItem("Title", t);
    var d1 = localStorage.getItem("Description", d);


    var arr = [t1, d1];
    return arr;
}

//insert
function insert(readData) {
    var row = table.insertRow();  //create an empty <tr> elementand adds it to a table
    //we can write simple
    row.insertCell(0).innerHTML = readData[0]; //innerhtml to show the data in table
    row.insertCell(1).innerHTML = readData[1];

    row.insertCell(2).innerHTML = `<button class="edit" onclick = edit(this)>Edit</button>
                                       <button class="delete" onclick = remove(this) class="delete">Delete</button>` //this refers to current object means current object is innerHTML

}

//Edit
function edit(td) {  //td is the value inside the cell not a row
    row = td.parentElement.parentElement;  //getting row
    document.getElementById("title").value = row.cells[0].innerHTML;
    document.getElementById("description").value = row.cells[1].innerHTML;

}

//Update
function update() {
    row.cells[0].innerHTML = document.getElementById("title").value;
    row.cells[1].innerHTML = document.getElementById("description").value;

    row = null;
}

//Delete
function remove(td) {
    var ans = confirm("Are you sure you want to delete this record")
    if (ans == true) {
        row = td.parentElement.parentElement;
        document.getElementById("table").deleteRow(row.rowIndex) //deleting the specific row
        // document.getElementById("table").remove() //removing whole table
    }
}