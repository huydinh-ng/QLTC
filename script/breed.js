"use strict";

const sidebar = document.getElementById("sidebar");
const sidebarTitle = document.getElementById("sidebar-title");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submit_btn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// Bổ sung Animation cho Sidebar
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

// khai báo và lưu dữ liệu dưới LocalStorage
const breedArr = JSON.parse(localStorage.getItem("breedArr_ls")) ?? [];
function saveBreedDataToStorage() {
  localStorage.setItem("breedArr_ls", JSON.stringify(breedArr));
}
// hàm reset bang nhap thong tin
function reset() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}
// hàm Hiển thị Breed và lưu vào localStorage
function renderBREED() {
  saveBreedDataToStorage();
  tableBodyEl.innerHTML = "";
  function displayRow(i) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        ${i + 1}
      </td>
      <td>
        ${breedArr[i].name}
      </td>
      <td>
        ${breedArr[i].type}
      </td>
      <td>
        <button onclick= "deleteBreed(${i})" type="button" class="btn btn-danger">Delete</button>
      </td>
    `;

    tableBodyEl.appendChild(row);
  }
  breedArr.forEach((bre, i) => displayRow(i));
}
renderBREED();
// xoa du lieu Breed
function deleteBreed(peti) {
  if (
    confirm(
      `Delete ${breedArr[peti].name} of ${breedArr[peti].type}. Are you sure?`
    )
  )
    breedArr.splice(peti, 1);
  renderBREED();
}
// su kien nut Submit
submit_btn.addEventListener("click", function () {
  let data = {
    name: breedInput.value,
    type: typeInput.value,
  };

  let name = false,
    type = false;
  const tname = tyname(data);
  // kiem tra data truoc khi luu
  data.name !== "" ? (name = true) : alert("Please input Breed!");
  data.type !== "Select Type" ? (type = true) : alert("Please select Type!");
  function tyname(data) {
    const typename = true;
    for (let i = 0; i < breedArr.length; i++) {
      if (data.name === breedArr[i].name && data.type === breedArr[i].type) {
        alert(`${data.name}(${data.type} already exist)`);
        typename = false;
      }
    }
    return typename;
  }
  if (type && name && tname) {
    breedArr.push(data);
    reset();
    renderBREED();
  }
});
