"use strict";

const sidebar = document.getElementById("sidebar");
const sidebarTitle = document.getElementById("sidebar-title");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const find_btn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");

// Bổ sung Animation cho Sidebar
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
// khai báo và lưu dữ liệu dưới LocalStorage
const petArr = JSON.parse(localStorage.getItem("petArr_ls")) ?? [];
const breedArr = JSON.parse(localStorage.getItem("breedArr_ls")) ?? [];
// Hàm hiển thị dữ liệu thú cưng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";

  function displayRow(i) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <th scope="row">${petArr[i].id}</th>
      <td>${petArr[i].name}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight} kg</td>
      <td>${petArr[i].leng_th} cm</td>
      <td>${petArr[i].breed}</td>
      <td style="text-align: center;">
        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
      </td>
      <td style="text-align: center;">
        <i class="${
          petArr[i].vaccinated
            ? "bi bi-check-circle-fill"
            : "bi bi-x-circle-fill"
        }"></i>
      </td>
      <td style="text-align: center;">
        <i class="${
          petArr[i].dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i>
      </td>
      <td style="text-align: center;">
        <i class="${
          petArr[i].sterilized
            ? "bi bi-check-circle-fill"
            : "bi bi-x-circle-fill"
        }">
        </i>
      </td>
      <td>
        ${petArr[i].date}
      </td>
      <td>
        <button onclick= "deletePet(${i})" type="button" class="btn btn-danger">Delete</button>
      </td>
    `;

    tableBodyEl.appendChild(row);
  }

  petArr.forEach((pet, i) => displayRow(i));
}
renderTableData(petArr);
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

// Sự kiện Find
find_btn.addEventListener("click", function () {
  let petArrFind = [];
  let id = idInput.value;
  let name = nameInput.value;
  let type = typeInput.value;
  let breed = breedInput.value;
  // Tìm kiếm pet theo dữ liệu yêu cầu
  for (let i = 0; i < petArr.length; i++) {
    if (
      (petArr[i].id.includes(`${id}`) || id === "") &&
      (petArr[i].name.includes(`${name}`) || name === "") &&
      (petArr[i].type === type || type === "Select Type") &&
      (petArr[i].breed === breed || breed === "Select Breed") &&
      (petArr[i].vaccinated === vaccinatedInput.checked ||
        vaccinatedInput.checked === false) &&
      (petArr[i].dewormed === dewormedInput.checked ||
        dewormedInput.checked === false) &&
      (petArr[i].sterilized === sterilizedInput.checked ||
        sterilizedInput.checked === false)
    ) {
      petArrFind.push(petArr[i]);
    }
  }
  renderTableData(petArrFind);
});
