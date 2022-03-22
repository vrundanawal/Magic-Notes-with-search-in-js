const addTxt = document.getElementById("addTxt");
const addBtn = document.getElementById("addBtn");
const noteTitle = document.getElementById("noteTitle");


const showData = () => {
    let notesElement = document.getElementById("notes")
    let notes = localStorage.getItem("magicNotes")
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    let html = ""
    notesObj.forEach((element, index) => {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title"> ${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`
    });

    if (notesObj != 0) {
        notesElement.innerHTML = html
    } else {
        notesElement.innerHTML = `<h5>Please add some magic notes ......</h5>`;
    }
}


//delete Notes
const deleteNote = (index) => {
    //console.log(index)
    let notes = localStorage.getItem("magicNotes");
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1)
    localStorage.setItem("magicNotes", JSON.stringify(notesObj))
    showData()
}


//to show the data when page load
showData();

//add note to local storage
const addNote = () => {
    let notes = localStorage.getItem("magicNotes")
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    //notesObj.push([addTxt.value, noteTitle.value])
    notesObj.push({
        title: noteTitle.value, text: addTxt.value
    })
    localStorage.setItem("magicNotes", JSON.stringify(notesObj))
    addTxt.value = "";
    noteTitle.value = ""
    showData()
    console.log(notesObj)

}
addBtn.addEventListener("click", addNote)


//seach with input value text
let search = document.getElementById("searchTxt")
search.addEventListener("input", () => {
    //console.log(search.value)
    let inputValue = search.value.toLowerCase()
    console.log(inputValue)
    let noteCards = document.getElementsByClassName("noteCard")
    //console.log(noteCards)
    Array.from(noteCards).forEach((element) => {

        let cardTxtTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase()
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase()

        if (cardTxt.includes(inputValue) || cardTxtTitle.includes(inputValue)) {

            element.style.display = "block"
        } else {
            element.style.display = "none"
        }
    })
})



