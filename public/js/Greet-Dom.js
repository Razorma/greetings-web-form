const submitReset = document.querySelector(".resetNameButton")
submitReset.addEventListener("click", (event) => {
    if (!confirm("Are you sure you want to delete all greeted names from storage?")) {
        event.preventDefault();
    }
});