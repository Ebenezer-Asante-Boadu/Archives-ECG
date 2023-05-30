let tabs = ["REG DATE", "FILE TYPE", "FILE NO", "TYPE OF FILE", "DATE", "ORIGIN OF FILE", "DATE COMPLETED", "DATE COMMENCED", "NAME OF FILE", ];

let rows = {
    row1 : ["KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF"],
    row2: ["KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF"],
    row3 : ["KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF"],
};

let activeTab = tabs[0];

function createTabs(tabname){
    document.getElementsByClassName("horizontal-tab")[0].innerHTML += `<div class="tab">${tabname}</tab>`;
}

function createTableHead(headName){
    document.getElementsByClassName("th")[0].innerHTML += `<th>${headName}</th>`;
}

function setTabGridItems(className="horizontal-tab"){
    const element = document.getElementsByClassName(className)[0];
    let results = '';
   for(let i= 0; i < tabs.length + 1; i++){
    if(className == "horizontal-tab"){
        results += (i == 0)? "1% " : "auto ";
    } else{ 
        results += "auto ";
    }
   }
   element.style.gridTemplateColumns = results;
}

function createDatabaseRows(){
    let _rows = "";
    for(let i = 0; i < Object.keys(rows).length; i++){ console.log(90);
        for(let x = 0; x < Object.keys(rows)[i].length; x++){
           let start = "<tr>";
           rows[Object.keys(rows)[i]].forEach((item)=>{start += `<td>${item}</td>`});

           if(i == Object.keys(rows).length - 1){
            start += "</tr>";
            _rows += start;
           }
        }
    }
    document.getElementById("database").innerHTML += _rows;
}


window.addEventListener("load", ()=>{
    setTabGridItems();
    tabs.forEach(createTableHead);
    tabs.forEach(createTabs);
   // tabs.forEach(createTabs2);
    tabs.forEach((item)=>{
        document.getElementById("category").innerHTML += `<option>${item}</option>`;
    });
    createDatabaseRows();
});