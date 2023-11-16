function toggleAddFoodForm() {
  const addFoodForm = document.querySelector("#add-food");
  const isHidden = addFoodForm.style.bottom === "-50rem" || addFoodForm.style.bottom === "";

  addFoodForm.style.transition = "bottom .5s";
  addFoodForm.style.bottom = isHidden ? "1rem" : "-50rem";
}



function handleImagePreview() {
  var uploadFileInput = document.getElementById("uploadFile");
  var imagePreview = document.getElementById("imagePreview");

  uploadFileInput.addEventListener("change", function () {
    var files = this.files;
    if (files.length === 0 || !window.FileReader) return; // no file selected or FileReader not supported

    if (/^image/.test(files[0].type)) { // only image file
      var reader = new FileReader(); // create a FileReader
      reader.readAsDataURL(files[0]); // read the local file

      reader.onloadend = function () { // set image data as background of div
        imagePreview.style.backgroundImage = "url(" + this.result + ")";
      };
    }
  });

  imagePreview.addEventListener("click", function () {
    uploadFileInput.click();
  });
}

async function handleFoodItemDeletion(event) {
  const target = event.target;

  if (target.classList.contains("delete-form")) {
    event.preventDefault();
    const form = target;
    const id = form.getAttribute("action").split("/").pop();

    if (confirm("Do you really want to delete this record?")) {
      try {
        const response = await fetch(`/dashboard/food/${id}`, { method: "DELETE" });
        if (response.ok) {
          const tableRow = form.closest("tr");
          if (tableRow) {
            tableRow.remove();
          }
          alert("Data Deleted Successfully!");
        } else {
          throw new Error("Error deleting food item");
        }
      } catch (error) {
        console.error("Error deleting food item:", error);
        alert("Error deleting food item.");
      }
    }
  }
}

function handleSearchAndFilter() {
  const searchInput = document.querySelector('#searchInput');
  const selectAll = document.querySelector('#selectAll');
  const rowCheckboxes = document.querySelectorAll('.rowCheckbox');
  const tableRows = document.querySelectorAll('tbody tr');

  function updateRowCheckboxes() {
    rowCheckboxes.forEach(checkbox => checkbox.checked = selectAll.checked);
    updateDeleteButtonVisibility();
  }

  selectAll.addEventListener('change', updateRowCheckboxes);

  rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateRowCheckboxes);
  });

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    tableRows.forEach(row => {
      const rowData = row.textContent.toLowerCase();
      row.style.display = rowData.includes(searchTerm) ? '' : 'none';
    });

    updateRowCheckboxes();
  });

  function updateDeleteButtonVisibility() {
    const selectedRows = Array.from(rowCheckboxes).filter(checkbox => checkbox.checked);
    const deleteButton = document.querySelector('#deleteSelectedItems');

    deleteButton.style.display = selectedRows.length > 1 ? 'block' : 'none';
  }

  updateDeleteButtonVisibility();
}

function actionToggle() {
  const dropdownButton = document.querySelector(".dropdown-button");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdownButton.addEventListener("click", function (event) {
    event.stopPropagation();

    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  handleImagePreview();
  handleSearchAndFilter();
  actionToggle();
  toggleEdit();
});

document.addEventListener("click", function (event) {
  if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
    dropdownContent.style.display = "none";
  }
});




function toggleEdit() {
  const editButtons = document.querySelectorAll('.edit-food');
  const addFoodForm = document.querySelector('#add-food');
  const foodForm = document.querySelector('#addfood-form');
  const isHidden = addFoodForm.style.bottom === "-50rem" || addFoodForm.style.bottom === "";





  editButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();

      // Retrieve the data-food-id attribute from the clicked button
      const foodId = button.getAttribute('data-food-id');

      // Fetch the food data using the foodId (you might need to implement this)
      const response = await fetch(`/getFood/${foodId}`);
      const itemData = await response.json();

      // Populate the form fields with the retrieved data
      foodForm.elements.name.value = itemData.name;
      foodForm.elements.category.value = itemData.category;
      foodForm.elements.desc.value = itemData.desc;
      foodForm.elements.goodFor.value = itemData.goodFor;
      foodForm.elements.stock.value = itemData.stock;
      foodForm.elements.price.value = itemData.price;
      foodForm.elements.vat.value = itemData.vat;
      foodForm.elements.status.checked = itemData.status === 'active';
      foodForm.elements.bestseller.checked = itemData.bestseller;
      foodForm.elements.featured.checked = itemData.featured;

      // Show the food form
      toggleAddFoodForm();

      
      addFoodForm.style.transition = "bottom .5s";
      addFoodForm.style.bottom = isHidden ? "1rem" : "-50rem";

      // Modify the form action to indicate editing
      foodForm.action = `/editFood/${foodId}`;
    });
  })
}













// document.addEventListener('DOMContentLoaded', function () {
//   const addFoodForm = document.querySelector("#add-food");
//   const uploadFileInput = document.querySelector("#uploadFile");
//   const imagePreview = document.querySelector("#imagePreview");
//   const searchInput = document.querySelector('#searchInput');
//   const selectAll = document.querySelector('#selectAll');
//   const rowCheckboxes = document.querySelectorAll('.rowCheckbox');
//   const tableRows = document.querySelectorAll('tbody tr');
//   const deleteButton = document.querySelector('#deleteSelectedItems');
//   const dropdownButton = document.querySelector(".dropdown-button");
//   const dropdownContent = document.querySelector(".dropdown-content");

//   toggleAddFoodForm();
//   handleImagePreview();
//   handleSearchAndFilter();
//   actionToggle();

//   function toggleAddFoodForm() {
//     const isHidden = addFoodForm.style.bottom === "-50rem" || addFoodForm.style.bottom === "";

//     addFoodForm.style.transition = "bottom .5s";
//     addFoodForm.style.bottom = isHidden ? "1rem" : "-50rem";
//   }

//   function handleImagePreview() {
//     uploadFileInput.addEventListener("change", function () {
//       const files = this.files;
//       if (files.length === 0 || !window.FileReader) return;

//       if (/^image/.test(files[0].type)) {
//         const reader = new FileReader();
//         reader.readAsDataURL(files[0]);

//         reader.onloadend = function () {
//           imagePreview.style.backgroundImage = `url(${this.result})`;
//         };
//       }
//     });
//   }

//   async function handleFoodItemDeletion(event) {
//     const target = event.target;

//     if (target.classList.contains("delete-form")) {
//       event.preventDefault();
//       const form = target;
//       const id = form.getAttribute("action").split("/").pop();

//       if (confirm("Do you really want to delete this record?")) {
//         try {
//           const response = await fetch(`/dashboard/food/${id}`, { method: "DELETE" });
//           if (response.ok) {
//             const tableRow = form.closest("tr");
//             if (tableRow) {
//               tableRow.remove();
//             }
//             alert("Data Deleted Successfully!");
//           } else {
//             throw new Error("Error deleting food item");
//           }
//         } catch (error) {
//           console.error("Error deleting food item:", error);
//           alert("Error deleting food item.");
//         }
//       }
//     }
//   }

//   function handleSearchAndFilter() {
//     function updateRowCheckboxes() {
//       rowCheckboxes.forEach(checkbox => checkbox.checked = selectAll.checked);
//       updateDeleteButtonVisibility();
//     }

//     selectAll.addEventListener('change', updateRowCheckboxes);

//     rowCheckboxes.forEach(checkbox => {
//       checkbox.addEventListener('change', updateRowCheckboxes);
//     });

//     searchInput.addEventListener('input', () => {
//       const searchTerm = searchInput.value.toLowerCase();

//       tableRows.forEach(row => {
//         const rowData = row.textContent.toLowerCase();
//         row.style.display = rowData.includes(searchTerm) ? '' : 'none';
//       });

//       updateRowCheckboxes();
//     });

//     function updateDeleteButtonVisibility() {
//       const selectedRows = Array.from(rowCheckboxes).filter(checkbox => checkbox.checked);
//       deleteButton.style.display = selectedRows.length > 1 ? 'block' : 'none';
//     }

//     updateDeleteButtonVisibility();
//   }

//   function actionToggle() {
//     dropdownButton.addEventListener("click", function (event) {
//       event.stopPropagation();

//       if (dropdownContent.style.display === "block") {
//         dropdownContent.style.display = "none";
//       } else {
//         dropdownContent.style.display = "block";
//       }
//     });
//   }

//   document.addEventListener("click", function (event) {
//     if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
//       dropdownContent.style.display = "none";
//     }
//   });
// });
