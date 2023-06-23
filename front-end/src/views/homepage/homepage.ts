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

            function navlist(){
                let ul = document.createElement("ul");
                ul.classList.add("navlist");

                function brand(){
                    let li = document.createElement("li");
                    li.classList.add("brand");
                    let brand = document.createElement("a");
                    brand.setAttribute("href", "#");
                    brand.innerText = "ECG ARCHIVES";
                    li.appendChild(brand);
                    return li;
                }

                function link1(){
                    let li = document.createElement("li");
                    li.classList.add("nav-link");
                    let linker = document.createElement("a");
                    linker.setAttribute("href", "#");
                    linker.innerText = "Request For File";
                    li.appendChild(linker);
                    return li;
                }

                function link2(){
                    let li = document.createElement("li");
                    li.classList.add("nav-link");
                    let linker = document.createElement("a");
                    linker.setAttribute("href", "#");
                    linker.innerText = "Admin Panel";
                    li.appendChild(linker);
                    return li;
                }

                function link3(){
                    let li = document.createElement("li");
                    li.classList.add("nav-link");
                    let linker = document.createElement("a");
                    linker.setAttribute("href", "#");
                    linker.innerText = "Manage Database";
                    li.appendChild(linker);
                    return li;
                }

                function link4(){
                    let li = document.createElement("li");
                    li.classList.add("nav-link" ,"login-button");
                    let linker = document.createElement("a");
                    linker.setAttribute("href", "#");
                    linker.innerText = "Log In";
                    li.appendChild(linker);
                    return li;
                }
                ul.append(brand(), link4(), link3(), link2(),link1());
                return ul;
            }
            div.appendChild(navlist());

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
        let grid = document.createElement("div");
        grid.classList.add("grid");
        div.appendChild(grid);

        function card(){
            let elements:any = [];
            
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
                    img: "/assets/affordable.png", 
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
                    let wrapper = document.createElement("div");
                    wrapper.classList.add("image-wrapper");
                    let img =document.createElement("img");
                    let key = Object.keys(cards)[i]
                    img.setAttribute("src", cards[key].img);
                    img.setAttribute("alt", `${cards[key].title} image`);
                    wrapper.appendChild(img);
                    return wrapper;
                }

                function title(){
                    let element = document.createElement("p");
                    let txt = document.createTextNode(cards[Object.keys(cards)[i]].title);
                    element.classList.add("title");
                    element.appendChild(txt);
                    return element;
                }

                function writing(){
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

        card().forEach((data:HTMLElement)=>{
            grid.appendChild(data);
        });
        
        return div;
    }
    

    private middlePic(){
        let element = document.createElement("div");
        element.classList.add("middle-pic");
        return element;
    }


    private middleHeader(){
        let div = document.createElement("div");
        div.classList.add("middle-header");

        function title(){
            let tit = document.createElement("p");
            tit.classList.add("big-title");
            let txt = document.createTextNode("Who are we? Meet our team!");
            tit.appendChild(txt);
            return tit;
        }

        function caption(){
            let cap = document.createElement("p");
            cap.classList.add("caption");
            let txt = document.createTextNode("We listen, advice, provide the best electricity service at an affordable price you would never get anywhere on this earth!!!");
            cap.appendChild(txt);
            return cap;
        }
        div.append(title(), caption());
        return div;
    }

    private team(){
        let container = document.createElement("div");
        container.classList.add("profiles");
        let grid = document.createElement("div");
        grid.classList.add("grid");
        container.appendChild(grid);


        function cards(){
            let elements = [];
            const cards: {
                [key: string]: {
                    profile: string;
                    name: string;
                    description: string;
                    // iconPosition :string;
                    // job_title : string;
                };
            } = {
                "person1" : {
                    profile : "/assets/person1.png",
                    name : "Kofi Abrefa Gyan",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo in vitae turpis massa sed. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim. ",
                },
                "person2" : {
                    profile : "/assets/person2.png",
                    name : "Kofi Abrefa Gyan",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo in vitae turpis massa sed. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim. ",
                },
                "person3" : {
                    profile : "/assets/person3.png",
                    name : "Kofi Abrefa Gyan",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo in vitae turpis massa sed. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim. ",
                }
            };

            for(let i = 0; i < Object.keys(cards).length; i++){
                let cover = document.createElement("div");
                cover.classList.add("cover");

                function profile(){
                    let imgContainer = document.createElement("div");
                    imgContainer.classList.add("img-container");
                    let img = document.createElement("img");
                    img.setAttribute("src", cards[Object.keys(cards)[i]].profile);
                    img.setAttribute("alt", "profile pic");
                    img.classList.add('profile');
                    imgContainer.appendChild(img);
                    return imgContainer;
                }

                function name(){
                    let nm = document.createElement("p");
                    let txt = document.createTextNode(cards[Object.keys(cards)[0]].name);
                    nm.appendChild(txt);
                    return nm;
                }

                function description(){
                    let desc = document.createElement("div");
                    desc.classList.add("description");
                    let txt = document.createTextNode(cards[Object.keys(cards)[i]].description);
                    desc.appendChild(txt);
                    return desc;
                }

                cover.append(profile(), name(), description());
                elements.push(cover);
            }
            return elements;
        }

        cards().forEach((data:HTMLElement)=>{
            grid.append(data);
        });

        function middleLine(){
            let img = document.createElement("img");
            img.setAttribute("src", "/assets/horizontal-line.png");
            img.classList.add("middleLine");
            return img;
        }

        function footer(){
            let elements2 = [];
            const foots: {
                [key: string]: {
                    iconPosition :string;
                    job_title : string;
                };
            } = {
                person1 : {
                    iconPosition : "/assets/position.png",
                    job_title : "Senior Administrative Assistant"
                },
                person2 : {
                    iconPosition : "/assets/position.png",
                    job_title : "Senior Administrative Assistant"
                },
                person3 : {
                    iconPosition : "/assets/position.png",
                    job_title : "Senior Administrative Assistant"
                },
            };


            for(let i = 0; i < Object.keys(foots).length; i++){
                let div = document.createElement("div");
                div.classList.add("card-footer");

                function image(){
                    let iconPositionContainer = document.createElement("div");
                    iconPositionContainer.classList.add("iconPositionContainer");
                    let img = document.createElement("img");
                    img.setAttribute("src", foots[Object.keys(foots)[i]].iconPosition );
                    img.classList.add("iconPosition");
                    iconPositionContainer.appendChild(img);
                    return iconPositionContainer;
                }

                function jobTitle(){
                    let para = document.createElement("p");
                    para.classList.add("job-title");
                    let txt = document.createTextNode(foots[Object.keys(foots)[i]].job_title);
                    para.appendChild(txt);
                    return para;
                }
                div.append(image(), jobTitle());
                elements2.push(div);
            }
            return elements2;
        }


        grid.appendChild(middleLine());

        footer().forEach((data:HTMLElement)=>{
            grid.appendChild(data);
        });

        return container;
    }

    private footer(){
        let footerDiv = document.createElement("div");
        footerDiv.classList.add("footerDiv");
        return footerDiv;
    }

    public assembler() {
        this.parent.append(this.backgroundFrame(), this.groupCard(), this.middlePic(), this.middleHeader(), this.team(),this.footer());
    }
}

window.addEventListener("load", () => {
    const instance = new Home();
    instance.assembler();
})


