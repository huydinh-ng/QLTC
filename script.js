"use strict";

const sidebar = document.getElementById("sidebar");
const sidebarTitle = document.getElementById("sidebar-title");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const submitBtn = document.getElementById("submit-btn");
const heathyPetBtn = document.getElementById("healthy-btn");
const danger_btn = document.querySelector("btn-danger");
const tableBodyEl = document.querySelector("#tbody");

const d = new Date();
let healthCheck = true;
let healthyCheck = false;
//Bổ sung Animation cho Sidebar
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
// khai báo và lưu dữ liệu dưới LocalStorage
const petArr = JSON.parse(localStorage.getItem("petArr_ls")) ?? [];
const breedArr = JSON.parse(localStorage.getItem("breedArr_ls")) ?? [];
function saveToStorage() {
  localStorage.setItem("petArr_ls", JSON.stringify(petArr));
}

// Hiển thị màn hình
renderTableData(petArr);
const displayscreen = function () {
  healthCheck === true
    ? renderTableData(petArr)
    : renderTableData(healthyPetArr);
};
// Lấy danh sách healthy pet
const healthyPetArr = [];
for (let i = 0; i < petArr.length; i++) {
  if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
    healthyPetArr.push(petArr[i]);
  }
}
// sự kiện Sbmit
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    color: colorInput.value,
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    leng_th: parseInt(lengthInput.value),
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: `${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()}`,
  };
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    clearInput();
    if (data.vaccinated && data.dewormed && data.sterilized) {
      healthyPetArr.push(data);
    }
    saveToStorage();
    displayscreen();
    renderBreed();
  }
  //Validate True
  function validateData(data) {
    const isValidate = true;
    if (
      data.id.trim() === "" ||
      data.name.trim() === "" ||
      isNaN(data.age) ||
      isNaN(data.weight) ||
      isNaN(data.leng_th)
    ) {
      alert(`Nhập thiếu thông tin Pet`);
      isValidate = false;
    }
    if (1 > data.age || data.age > 15) {
      alert("Age must be between 1 and 15!");
      isValidate = false;
    }
    if (1 > data.weight || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
      isValidate = false;
    }
    if (1 > data.leng_th || data.leng_th > 100) {
      alert("Length must be between 1 and 100!");
      isValidate = false;
    }
    if (data.type === "Select Type") {
      alert("Please select Type!");
      isValidate = false;
    }
    if (data.breed === "Select Breed") {
      alert("Please select Breed!");
      isValidate = false;
    }
    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        alert("ID must be unique!");
        isValidate = false;
      }
    }
    return isValidate;
  }
});
// Sự kiện Show Healthy Pet
heathyPetBtn.addEventListener("click", function () {
  if (healthCheck === true) {
    heathyPetBtn.innerText = "Show all Pet";
    healthCheck = false;
  } else {
    heathyPetBtn.innerText = "Show Healthy Pet";
    healthCheck = true;
  }
  displayscreen();
});
// clear Input
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  colorInput.value = "#000000";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
// Hàm renderTableData
function renderTableData(arr) {
  tableBodyEl.innerHTML = "";
  function displayRow(i) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">
        ${arr[i].id}
      </th>
      <td>
        ${arr[i].name}
      </td>
      <td>
        ${arr[i].age}
      </td>
      <td>
        ${arr[i].type}
      </td>
      <td>
        ${arr[i].weight} kg
      </td>
      <td>
        ${arr[i].leng_th} cm
      </td>
      <td>
        ${arr[i].breed}
      </td>
      <td style="text-align: center;">
        <i class="bi bi-square-fill" style="color: ${arr[i].color}"></i>
      </td>
      <td style="text-align: center;">
        <i class="${
          arr[i].vaccinated ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i>
      </td>
      <td style="text-align: center;">
        <i class="${
          arr[i].dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i>
      </td>
      <td style="text-align: center;">
        <i class="${
          arr[i].sterilized ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i>
      </td>
      <td>
        ${arr[i].date}
      </td>
      <td>
      <button class="btn btn-danger delete-btn" onclick="deletePet('${
        arr[i].id
      }')">Delete</button>
     </td>
    `;
    tableBodyEl.appendChild(row);
  }
  petArr.forEach((pet, i) => displayRow(i));
}
// Hàm Delete Pet
function deletePet(petId) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
      }
    }
    for (let i = 0; i < healthyPetArr.length; i++) {
      if (petId === healthyPetArr[i].id) {
        healthyPetArr.splice(i, 1);
      }
    }
  }
  saveToStorage();
  displayscreen();
}
// Hiển thị Breed
function renderBreed() {
  breedInput.innerHTML = "";
  const row = document.createElement("option");
  row.innerHTML = "Select Breed";
  breedInput.appendChild(row);
  if (typeInput.value === "Select Type") {
    breedArr.forEach((bre) => {
      const row = document.createElement("option");
      row.innerHTML = `${bre.name}`;
      breedInput.appendChild(row);
    });
  }
  if (typeInput.value != "Select Type") {
    breedArr.forEach((bre) => {
      if (bre.type === typeInput.value) {
        const row = document.createElement("option");
        row.innerHTML = `${bre.name}`;
        breedInput.appendChild(row);
      }
    });
  }
}
renderBreed();
