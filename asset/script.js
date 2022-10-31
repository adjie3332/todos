let form = document.getElementById("form");
let titleInput = document.getElementById("titleInput");
let dateInput = document.getElementById("dateInput");
let descInput = document.getElementById("descInput");
let msg = document.getElementById("msg");
let dataKegiatan = document.getElementById("dataKegiatan");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

function formValidation() {
    if(titleInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Tidak Boleh Kosong";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

let data = [{}];

function acceptData() {
    data.push({
        title: titleInput.value,
        date: dateInput.value,
        description: descInput.value,
    });
    for(i=0;i <= data.length; i++) {
        localStorage.setItem("data", JSON.stringify(data));
    }

    console.log(data);
    createTasks();
};

function createTasks() {
    dataKegiatan.innerHTML = "";
    data.map((x, y) => {
        return (dataKegiatan.innerHTML += `
        <div id=${y}>
            <span class="fw-bold">Kegiatan : ${x.title}</span>
            <span class="small text-secondary">Tanggal : ${x.date}</span>
            <p>${x.description}</p>
            
            <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `);
    });
    resetForm();
};

function deleteTask(e) {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

function editTask(e) {
    let selectedTask = e.parentElement.parentElement;

    titleInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    descInput.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};

function resetForm() {
    titleInput.value = "";
    dateInput.value = "";
    descInput.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createTasks();
})();