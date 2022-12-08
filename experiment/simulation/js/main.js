function showInstructions() {
    let ele = document.getElementsByClassName("instruction-button")[0]
    ele.classList.toggle("active");
    let content = ele.nextElementSibling;
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}