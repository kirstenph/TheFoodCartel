// Show add new food form
document.addEventListener("DOMContentLoaded", function() {
    var formContainer = document.querySelector(".add-food");
    var showFormButton = document.getElementById("showForm");

    showFormButton.addEventListener("click", function() {
        formContainer.style.display = (formContainer.style.display === "block") ? "none" : "block";
    });
});

// Handle the image preview when a file is selected.
document.addEventListener("DOMContentLoaded", function() {
    var uploadFileInput = document.getElementById("uploadFile");
    var imagePreview = document.getElementById("imagePreview");

    uploadFileInput.addEventListener("change", function() {
        var files = this.files;
        if (files.length === 0 || !window.FileReader) return; // no file selected or FileReader not supported

        if (/^image/.test(files[0].type)) { // only image file
            var reader = new FileReader(); // create a FileReader
            reader.readAsDataURL(files[0]); // read the local file

            reader.onloadend = function() { // set image data as background of div
                imagePreview.style.backgroundImage = "url(" + this.result + ")";
            };
        }
    });

    imagePreview.addEventListener("click", function() {
        uploadFileInput.click();
    });
});