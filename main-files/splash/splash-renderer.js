
function closeApp(){
    window.api.close();
}

function setHeight(){
    const element = document.getElementById("main");
    if (element) {
        element.style.height = `${window.innerHeight - 45}px`;
        element.style.maxHeight = `${window.innerHeight - 45}px`;
    }
}

window.addEventListener("load", () => {
    setHeight();
});

window.addEventListener("resize", () => {
    setHeight();
});

document.getElementById("close-app").addEventListener("click", ()=>{
    closeApp();
})



