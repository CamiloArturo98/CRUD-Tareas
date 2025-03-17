const selectingElement = document.getElementById("title");
    selectingElement.addEventListener("change", (e) => {
        console.log("New value is : ", e.target.value);
        
    });