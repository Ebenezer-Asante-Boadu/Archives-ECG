//import "/src/views/homepage/homepage.css";

 function n(){
    let b = document.createElement("p");
    b.innerText = "pol";
    return b;
}

window.addEventListener("load", ()=>{
    document.getElementById("app")?.appendChild(n());
})