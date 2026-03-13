const firstNameTxt = document.getElementById("firstName");
const lastNameTxt = document.getElementById("lastName");
const studentIdTxt = document.getElementById("studentId");
const emailTxt = document.getElementById("email");
const phoneTxt = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");
const addedStudent = document.getElementById("added-student");
const studentForm = document.getElementById("studentForm");
const studentSection = document.getElementById("studentSection");

submitBtn.addEventListener("click", () => {

    if (
        firstNameTxt.value.trim() === "" ||
        lastNameTxt.value.trim() === "" ||
        studentIdTxt.value.trim() === "" ||
        emailTxt.value.trim() === "" ||
        phoneTxt.value.trim() === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    const studentData = {
        firstName: firstNameTxt.value,
        lastName: lastNameTxt.value,
        studentId: studentIdTxt.value,
        email: emailTxt.value,
        phone: phoneTxt.value
    };

    createStudentRow(studentData);
    saveStudent(studentData);
    studentSection.style.display = "block";

    studentForm.reset();
});

function createStudentRow(studentData) {
    const addStudent = document.createElement("tr");

    const first = document.createElement("td");
    first.innerText = studentData.firstName;

    const last = document.createElement("td");
    last.innerText = studentData.lastName;

    const studentId = document.createElement("td");
    studentId.innerText = studentData.studentId;

    const email = document.createElement("td");
    email.innerText = studentData.email;

    const phone = document.createElement("td");
    phone.innerText = studentData.phone;

    const actionTd = document.createElement("td");

    const updateBtn = document.createElement("button");
    updateBtn.innerText = "Modify";
    updateBtn.style.margin = "2px";
    updateBtn.style.borderRadius = "10px"
    updateBtn.style.outline = "none"
    updateBtn.classList.add("update-btn");
    updateBtn.style.border = "none"
    updateBtn.style.padding = "6px 10px";
    updateBtn.style.cursor = "pointer";

    updateBtn.addEventListener("click", () => {
        firstNameTxt.value = first.innerText;
        lastNameTxt.value = last.innerText;
        studentIdTxt.value = studentId.innerText;
        emailTxt.value = email.innerText;
        phoneTxt.value = phone.innerText;

        addStudent.remove();

        deleteStudentFromStorage(studentData.studentId);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.style.margin = "2px"
    deleteBtn.style.borderRadius = "10px"
    deleteBtn.style.outline = "none"
    deleteBtn.classList.add("delete-btn");
    deleteBtn.style.border = "none"
    deleteBtn.style.padding = "6px 10px";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", () => {
        addStudent.remove();
        deleteStudentFromStorage(studentData.studentId);
    });

    actionTd.appendChild(updateBtn);
    actionTd.appendChild(deleteBtn);

    addStudent.appendChild(first);
    addStudent.appendChild(last);
    addStudent.appendChild(studentId);
    addStudent.appendChild(email);
    addStudent.appendChild(phone);
    addStudent.appendChild(actionTd);

    addedStudent.appendChild(addStudent);
}

function saveStudent(studentData) {
    let students = JSON.parse(localStorage.getItem("Students")) || [];

    students.push(studentData);

    localStorage.setItem("Students", JSON.stringify(students));
}

function deleteStudentFromStorage(studentId) {
    let students = JSON.parse(localStorage.getItem("Students")) || [];

    students = students.filter(student => student.studentId !== studentId);

    localStorage.setItem("Students", JSON.stringify(students));
}

function loadStudents() {
    let students = JSON.parse(localStorage.getItem("Students")) || [];

    if (students.length > 0) {
        studentSection.style.display = "block";
    }

    students.forEach(student => {
        createStudentRow(student);
    });
}

loadStudents();