import dots from "/src/assets/3dots.svg";

namespace DATABASE{



    export class __Database{
        private parent:HTMLDivElement;
        private div_left : HTMLDivElement;
        private div_right : HTMLDivElement;
    
        constructor(){
            this.parent = document.getElementsByClassName("main")[0] as HTMLDivElement;
            this.div_left = document.createElement("div");
            this.div_left.classList.add("left");
            this.div_right = document.createElement("div");
            this.div_right.classList.add("right");
            this.parent.appendChild(this.div_left);
            this.parent.appendChild(this.div_right);
        }
    
    
        //HORIZONTAL TAB
        private horizontalTab(){
            let element = document.createElement("div");
            element.classList.add("horizontal-tab");
    
            function image():HTMLImageElement{
                let image = document.createElement("img");
                image.src = dots;
                image.alt = ":";
                image.width = 20;
                image.height = 20;
                image.style.paddingBottom = "7px";
                return image;
            }
            element.appendChild(image());
            return element;
        }
    
    
    
        //FILTERS
        private filters(){
            let div_element = document.createElement("div");
            div_element.classList.add("filters");
    
            function label(){
                let label = document.createElement("label");
                label.setAttribute("for", "category");
                label.innerHTML = "Search By: &nbsp;";
    
                function select(){
                    let select = document.createElement("select");
                    select.setAttribute("name", "category");
                    select.setAttribute("id", "category");
                    return select;
                }
                label.appendChild(select());
                return label;
            }
    
    
            function search():HTMLDivElement{
                let div = document.createElement("div");
                div.classList.add("search");
        
                function label():HTMLLabelElement{
                    let element = document.createElement("label");
                    element.setAttribute("for", "search");
                    element.innerHTML = "Search: &nbsp;";
        
                    function input():HTMLInputElement{
                        let input = document.createElement("input");
                        input.setAttribute("type", "search");
                        input.setAttribute("name", "search");
                        input.setAttribute("id","search");
                        input.setAttribute("placeholder", "Search...");
                        return input;
                    }
                    element.appendChild(input());
                    return element;
                }
                div.appendChild(label());
                return div;
            }
    
    
            function mode(){
                let element = document.createElement("label");
                element.setAttribute("for", "mode");
                element.innerHTML = "MODE: &nbsp;";
    
                function select(){ //TODO: Onchange
                    let select = document.createElement("select");
                    select.setAttribute("name", "mode");
                    select.setAttribute("id", "mode");
    
                    function option(){
                        let option1 = document.createElement("option");
                        option1.setAttribute("value", "read only");
                        option1.innerText = "read only";
    
                        let option2 = document.createElement("option");
                        option2.setAttribute("value", "write and read");
                        option2.innerText = "write and read";
                        return ({
                            item1 : option1,
                            item2 : option2
                        });
                    }
                    select.appendChild(option().item1);
                    select.appendChild(option().item2);
                    return select;
                }
                element.appendChild(select());
                return element;
            }
    
    
    
            function button(){
                let btn = document.createElement("button");
                btn.setAttribute("type", "submit");
                btn.innerText = "Update Remote Server";
                return btn;
            }
    
            div_element.appendChild(label());
            div_element.appendChild(search());
            div_element.appendChild(mode());
            div_element.appendChild(button());
            return div_element;
        }
    
    
        
    
        //table-container
        private table_Container():HTMLDivElement{
            let div = document.createElement("div");
            div.classList.add("table-container");
    
            function table():HTMLTableElement{
                let element = document.createElement("table");
                element.setAttribute("id", "database");
    
                function tbody():HTMLTableSectionElement{
                    let body = document.createElement("tbody");
    
                    function tr():HTMLTableRowElement{
                        let row = document.createElement("tr");
                        row.classList.add("th");
                        return row;
                    }
                    body.appendChild(tr());
                    return body;
                }
                element.appendChild(tbody());
                return element;
            }
            div.appendChild(table());
            return div;
        }
    
    
        public assembler(){
            this.div_right.appendChild(this.horizontalTab());
            this.div_right.appendChild(this.filters());
            this.div_right.appendChild(this.table_Container());
        }
    
    }
    




    export class Utility{}
}


new DATABASE.__Database().assembler();