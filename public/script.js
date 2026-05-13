const api = "";

async function saveStudent() {

  const id = document.getElementById("studentId").value;

  const student = {
    name: document.getElementById("name").value,
    rollNo: Number(document.getElementById("rollNo").value),
    math: Number(document.getElementById("math").value),
    science: Number(document.getElementById("science").value),
    english: Number(document.getElementById("english").value)
  };

  if(id){

    await fetch(api + "/update/" + id,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(student)
    });

  }else{

    await fetch(api + "/add",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(student)
    });
  }

  clearForm();
  loadStudents();
}

async function loadStudents(){

  const res = await fetch(api + "/students");
  const students = await res.json();

  let html = "";

  students.forEach(student => {

    html += `
      <div class="student">
        <h3>${student.name}</h3>

        <p>Roll No: ${student.rollNo}</p>

        <p>Math: ${student.math}</p>

        <p>Science: ${student.science}</p>

        <p>English: ${student.english}</p>

        <p>Average: ${student.average}</p>

        <p>Grade: ${student.grade}</p>

        <button onclick='editStudent(${JSON.stringify(student)})'>
          Edit
        </button>

        <button onclick='deleteStudent("${student._id}")'>
          Delete
        </button>
      </div>
    `;
  });

  document.getElementById("studentList").innerHTML = html;
}

function editStudent(student){

  document.getElementById("studentId").value = student._id;

  document.getElementById("name").value = student.name;

  document.getElementById("rollNo").value = student.rollNo;

  document.getElementById("math").value = student.math;

  document.getElementById("science").value = student.science;

  document.getElementById("english").value = student.english;
}

async function deleteStudent(id){

  await fetch(api + "/delete/" + id,{
    method:"DELETE"
  });

  loadStudents();
}

function clearForm(){

  document.getElementById("studentId").value = "";

  document.getElementById("name").value = "";

  document.getElementById("rollNo").value = "";

  document.getElementById("math").value = "";

  document.getElementById("science").value = "";

  document.getElementById("english").value = "";
}

loadStudents();