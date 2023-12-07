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
// Bổ sung Animation cho Sidebar
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
// khai báo và lưu dữ liệu dưới LocalStorage
const petArr = JSON.parse(localStorage.getItem("petArr_ls")) ?? [];
const breedArr = JSON.parse(localStorage.getItem("breedArr_ls")) ?? [];
function savePetDataToStorage() {
  localStorage.setItem("petArr_ls", JSON.stringify(petArr));
}
function saveBreedDataToStorage() {
  localStorage.setItem("breedArr_ls", JSON.stringify(breedArr));
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
//hiển thị du lieu thu cung ra man hinh
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
        <button onclick= "editPet(${i})" type="button" class="btn btn-warning">Edit</button>
      </td>
    `;

    tableBodyEl.appendChild(row);
  }

  petArr.forEach((pet, i) => displayRow(i));
}
renderTableData(petArr);
// Chức năng: Edit
function editPet(peti) {
  if (
    confirm(`Edit ${petArr[peti].name} id: ${petArr[peti].id}. Are you sure?`)
  ) {
    console.log(peti);
    //Thêm Breed của Pet edit (Breed chưa có trong breedArr)
    const adata = { name: petArr[peti].breed, type: petArr[peti].type };
    const upBreed = updateBreed(adata);
    function updateBreed(adata) {
      let pushBreed = true;
      for (let i = 0; i < breedArr.length; i++) {
        if (
          adata.name === breedArr[i].name &&
          adata.type === breedArr[i].type
        ) {
          pushBreed = false;
        }
      }
      return pushBreed;
    }
    if (upBreed === true) {
      let text = `add ${adata.type} (${adata.name}) to Breed!\nEither OK or Cancel.`;
      if (confirm(text) === true) {
        breedArr.push(adata);
        saveBreedDataToStorage();
      }
    }
    //data Pet edit
    idInput.value = petArr[peti].id;
    nameInput.value = petArr[peti].name;
    ageInput.value = petArr[peti].age;
    typeInput.value = petArr[peti].type;
    weightInput.value = petArr[peti].weight;
    lengthInput.value = petArr[peti].leng_th;
    colorInput.value = petArr[peti].color;
    breedInput.value = petArr[peti].breed;
    vaccinatedInput.checked = petArr[peti].vaccinated;
    dewormedInput.checked = petArr[peti].dewormed;
    sterilizedInput.checked = petArr[peti].sterilized;
    // danh sách Breed theo type
    renderBreed();
    // hiển thị breed pet edit nếu breed có trong breedArr
    breedInput.value = petArr[peti].breed;

    document.getElementById("container-form").classList.remove("hide");

    // Sự kiện Submit
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
        if (petArr[peti].id === data.id) {
          petArr[peti] = data;
          savePetDataToStorage();
          renderTableData(petArr);
          document.getElementById("container-form").classList.add("hide");
        }
      }
      //Kiểm tra thông tin Pet edit
      function validateData(data) {
        const isValidate = true;
        if (
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
        if (data.breed === "Select Breed" || data.breed === "") {
          alert("Please select Breed!");
          isValidate = false;
        }
        return isValidate;
      }
    });
  }
}
