"use strict";
class Home {
    constructor() {
        this.parent = document.getElementById("app");
    }
    backgroundFrame() {
        let div = document.createElement("div");
        div.classList.add("frame");
        function navbar() {
            let _1stdiv = document.createElement("div");
            _1stdiv.classList.add("bigger");
            let div = document.createElement("div");
            div.classList.add("navbar");
            _1stdiv.appendChild(div);
            return _1stdiv;
        }
        function textbox() {
            let txt1 = document.createElement("p");
            let txtnode = document.createTextNode("We delight in rendering the most accurate file requested");
            txt1.appendChild(txtnode);
            txt1.classList.add("large-txt");
            function smalltxt() {
                let txt2 = document.createElement("p");
                let txtnode = document.createTextNode("We like to serve you better");
                txt2.appendChild(txtnode);
                txt2.classList.add("small-txt");
                return txt2;
            }
            txt1.appendChild(smalltxt());
            return txt1;
        }
        div.append(navbar(), textbox());
        return div;
    }
    groupCard() {
        let div = document.createElement("div");
        div.classList.add("group-card");
        let grid = document.createElement("div");
        grid.classList.add("grid");
        div.appendChild(grid);
        function card() {
            let elements = [];
            const cards = {
                "card1": {
                    img: "/assets/efficient.png",
                    title: "EFFICIENCY",
                    writing: "Efficiency in our archives is a multifaceted endeavor, encompassing organization, accessibility, preservation, technology integration, workflow optimization, and continuous improvement. By striving for excellence in our area, archives can achieve higher levels of efficiency and effectively serve their intended purposes."
                },
                "card2": {
                    img: "/assets/affordable.png",
                    title: "AFFORDABLE",
                    writing: "While achieving absolute affordability for an archive may be challenging, implementing cost-effective strategies, leveraging partnerships, and making informed decisions regarding resource allocation can contribute to the financial sustainability and accessibility of an archive while ensuring its core objectives are met."
                },
                "card3": {
                    img: "/assets/reliable.png",
                    title: "RELIABLE",
                    writing: "By implementing a reliable factor and adhering to recognized archival principles and practices, our archives can maintain a high level of reliability, ensuring that the records they preserve and provide access to are trustworthy, accurate, and authentic."
                },
            };
            for (let i = 0; i < Object.keys(cards).length; i++) {
                let element = document.createElement("div");
                element.classList.add(Object.keys(cards)[i]);
                function image() {
                    let wrapper = document.createElement("div");
                    wrapper.classList.add("image-wrapper");
                    let img = document.createElement("img");
                    let key = Object.keys(cards)[i];
                    img.setAttribute("src", cards[key].img);
                    img.setAttribute("alt", `${cards[key].title} image`);
                    wrapper.appendChild(img);
                    return wrapper;
                }
                function title() {
                    let element = document.createElement("p");
                    let txt = document.createTextNode(cards[Object.keys(cards)[i]].title);
                    element.classList.add("title");
                    element.appendChild(txt);
                    return element;
                }
                function writing() {
                    let element = document.createElement("p");
                    element.classList.add("writing");
                    let txt = document.createTextNode(cards[Object.keys(cards)[i]].writing);
                    element.appendChild(txt);
                    return element;
                }
                element.append(image(), title(), writing());
                elements.push(element);
            }
            return elements;
        }
        card().forEach((data) => {
            grid.appendChild(data);
        });
        return div;
    }
    middlePic() {
        let element = document.createElement("div");
        element.classList.add("middle-pic");
        return element;
    }
    middleHeader() {
        let div = document.createElement("div");
        div.classList.add("middle-header");
        function title() {
            let tit = document.createElement("p");
            tit.classList.add("big-title");
            let txt = document.createTextNode("Who are we? Meet our team!");
            tit.appendChild(txt);
            return tit;
        }
        function caption() {
            let cap = document.createElement("p");
            cap.classList.add("caption");
            let txt = document.createTextNode("We listen, advice, provide the best electricity service at an affordable price you would never get anywhere on this earth!!!");
            cap.appendChild(txt);
            return cap;
        }
        div.append(title(), caption());
        return div;
    }
    assembler() {
        this.parent.append(this.backgroundFrame(), this.groupCard(), this.middlePic(), this.middleHeader());
    }
}
window.addEventListener("load", () => {
    const instance = new Home();
    instance.assembler();
});
