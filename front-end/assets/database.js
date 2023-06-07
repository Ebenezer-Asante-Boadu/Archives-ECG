


let tabs = ["REG DATE", "FILE TYPE", "FILE NO", "TYPE OF FILE", "DATE", "ORIGIN OF FILE", "DATE COMPLETED",
    "DATE COMMENCED", "NAME OF FILE", "DATE COMPLETED", "DATE COMMENCED", "NAME OF FILE", "DATE COMPLETED", "DATE COMMENCED", "NAME OF FILE",
    "DATE COMMENCED", "NAME OF FILE", "DATE COMMENCED", "NAME OF FILE",];

  
let rows = {
    row1: ["d ", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row2: [" d", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row3: ["d ", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row4: ["d ", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row5: [" d", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row6: ["d ", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row7: ["d ", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row8: [" d", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row9: ["d ", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row10: ["d ", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row11: [" d", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row12: ["d ", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row13: ["d ", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row14: [" d", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row15: ["d ", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row16: ["d ", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row17: [" d", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
    row18: ["d ", "KIF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF", "KAF", "NOF"],
};

let activeTab = tabs[0];

function createTabs(tabname) {
    document.getElementsByClassName("horizontal-tab")[0].innerHTML += `<div class="tab">${tabname}</tab>`;
}

function createTableHead() {
    tabs.forEach((item, index) => {
        let parent = document.getElementsByClassName("th")[0];

        if (index == 0) {
            let th = document.createElement("th");
            let text = document.createTextNode(" ");
            th.appendChild(text)
            parent.appendChild(th);
            th = 0;

            th = document.createElement("th");
            let input = document.createElement("input");
            input.type = "text"
            input.value = item;
            input.classList = "read";
            input.readOnly = true;
            th.appendChild(input);
            parent.appendChild(th);
        }
        else {
            let th = document.createElement("th");
            let input = document.createElement("input");
            input.type = "text";
            input.value = item;
            input.classList = "read";
            input.readOnly = true;
            th.appendChild(input)
            parent.appendChild(th);
        }
        //parent.innerHTML += (index == 0) ? `<th> </th> <th>${item}</th>` : `<th>${item}</th>`;
    })
}

function setTabGridItems(className = "horizontal-tab") {
    const element = document.getElementsByClassName(className)[0];
    let results = '';
    for (let i = 0; i < tabs.length + 1; i++) {
        if (className == "horizontal-tab") {
            results += (i == 0) ? "1% " : "auto ";
        } else {
            results += "auto ";
        }
    }
    element.style.gridTemplateColumns = results;
}



function createDatabaseRows() {
    let parent = document.getElementById("database").querySelector("tbody");
    let row = null;
    for (let i = 0; i < Object.keys(rows).length; i++) { //looping through the object
        row = document.createElement('tr');//create a row for each element in the object
        for (let x = 0; x < rows[Object.keys(rows)[i]].length; x++) { //looping through the array
            let tableData = document.createElement('td');

            if (x == 0) {
                let checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.classList += "blue-accent";
                tableData.appendChild(checkbox);
                row.appendChild(tableData);
                tableData = document.createElement('td');
            }
            let data = () => { 
                let input = document.createElement("input");
                input.type = "text";
                input.value = rows[Object.keys(rows)[i]][x];
                input.classList = "read";
                input.id = "read-row";
                input.readOnly = true;
                return input; 
            };

            tableData.appendChild(data());
            row.appendChild(tableData);
        }
        parent.appendChild(row);
    }
}

function setModeEnvironment() {
    let element = document.getElementById("mode").value;
  
    let readElements = Array.from(document.getElementsByClassName("read"));
    let writeElements = Array.from(document.getElementsByClassName("write"));
  
    if (element == "write and read") {
      for (let i = 0; i < readElements.length; i++) {
        readElements[i].readOnly = false;
        readElements[i].classList.remove("read");
        readElements[i].classList.add("write");
        readElements[i].id = "write-row";
      }
    } else if (element == "read only") {
      for (let i = 0; i < writeElements.length; i++) {
        writeElements[i].readOnly = true;
        writeElements[i].classList.remove("write");
        writeElements[i].classList.add("read");
        writeElements[i].id = "read-row";
      }
    }
  }
  

window.addEventListener("load", () => {
    setTabGridItems();
    createTableHead();
    tabs.forEach(createTabs);
    tabs.forEach((item) => {
        document.getElementById("category").innerHTML += `<option>${item}</option>`;
    });
    createDatabaseRows();
});