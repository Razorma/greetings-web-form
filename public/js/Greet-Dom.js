const submitReset = document.querySelector(".resetNameButton")
submitReset.addEventListener("click",()=>{
    if (confirm("are you sure you want to delete all greeted names from storage")) {
        return
    }
})