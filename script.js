const form = document.getElementById("employeeForm");
const tableBody = document.getElementById("employeeTableBody");

const API_URL = "http://localhost:3000/employees";

// GET employees
async function getEmployees() {
  try {
    const res = await axios.get(API_URL);
    renderTable(res.data);
  } catch (err) {
    console.error(err);
  }
}

function renderTable(employees) {
  tableBody.innerHTML = "";

  if (employees.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6">No employees yet</td>
      </tr>
    `;
    return;
  }

  employees.forEach((emp, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${emp.fullName}</td>
        <td>${emp.email}</td>
        <td>${emp.age}</td>
        <td>${emp.salary}</td>
        <td>
          <button class="delete-btn" onclick="deleteEmployee('${emp.id}')">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

// create

form.addEventListener("submit" , async (e)=>{
e.preventDefault();


    const employee = {
    fullName: fullName.value,
    email : email.value,
    age : Number(age.value),
    salary : Number(salary.value)
    }

    try {
      await axios.post(API_URL , employee)
      form.reset();
      getEmployees();

    } catch (error) {
      alert("dogru deil!")
    }
})



   


// DELETE employee
async function deleteEmployee(id) {
  if (!confirm("Delete this employee?")) return;

  try {
    await axios.delete(`${API_URL}/${id}`);
    getEmployees();
  } catch (err) {
    console.error(err);
    alert("Failed to delete employee");
  }
}

window.deleteEmployee = deleteEmployee;

// First load
getEmployees();
