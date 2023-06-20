class Home {
    private parent: HTMLDivElement;
    constructor() {
        this.parent = document.getElementById("app") as HTMLDivElement;
    }

    private backgroundFrame() {
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



    private groupCard(){
        let div = document.createElement("div");
        div.classList.add("group-card");

        function card(){
            const cards: {
                [key: string]: {
                    img: string;
                    title: string;
                    writing: string;
                };
            } = {
                "card1": {
                    img: "/assets/efficient.png", 
                    title: "EFFICIENCY", 
                    writing: "Efficiency in our archives is a multifaceted endeavor, encompassing organization, accessibility, preservation, technology integration, workflow optimization, and continuous improvement. By striving for excellence in our area, archives can achieve higher levels of efficiency and effectively serve their intended purposes."
                },
                "card2": {
                    img: "/asstes/affordable.png", 
                    title: "AFFORDABLE", 
                    writing: "While achieving absolute affordability for an archive may be challenging, implementing cost-effective strategies, leveraging partnerships, and making informed decisions regarding resource allocation can contribute to the financial sustainability and accessibility of an archive while ensuring its core objectives are met."
                },
                "card3": {
                    img: "/assets/reliable.png",
                     title: "RELIABLE", 
                     writing: "By implementing a reliable factor and adhering to recognized archival principles and practices, our archives can maintain a high level of reliability, ensuring that the records they preserve and provide access to are trustworthy, accurate, and authentic."
                },
            }

            for(let i = 0; i < Object.keys(cards).length; i++){
                
                let element = document.createElement("div");
                element.classList.add(Object.keys(cards)[i]);

                function image(){
                    let img =document.createElement("img");
                    let key = Object.keys(cards)[i]
                    img.setAttribute("src", cards[key].img);
                    img.setAttribute("alt", `${cards[key].title} image`);
                    return img;
                }
            }
        }
    }
    
    public assembler() {
        this.parent.appendChild(this.backgroundFrame());
    }
}

window.addEventListener("load", () => {
    const instance = new Home();
    instance.assembler();
})


