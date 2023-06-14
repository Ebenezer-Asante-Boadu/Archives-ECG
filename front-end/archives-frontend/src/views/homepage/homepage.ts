import "/src/views/homepage/homepage.css";

export class __Homepage{
    parent:HTMLDivElement;
    constructor(){
        this.parent = document.getElementById("app") as HTMLDivElement;
    }

    navbar(){
        let element = document.createElement("div");
        this.parent.appendChild(element);
        return element;
    }
}

new __Homepage().navbar()