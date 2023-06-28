import "./index.css";
import efficientImage from "../../assets/efficient.png";
import affordableImage from "../../assets/affordable.png";
import reliableImage from "../../assets/reliable.png";
import person1Image from "../../assets/person1.png";
import person2Image from "../../assets/person2.png";
import person3Image from "../../assets/person3.png";
import horizontalLineImage from "../../assets/horizontal-line.png";
import positionImage from "../../assets/position.png";

class Home{
    constructor(){
        this.setImports();
    }

    private setImports(){
        (document.getElementsByClassName("card1-img")[0] as HTMLImageElement).src = efficientImage;
        (document.getElementsByClassName("card2-img")[0] as HTMLImageElement).src = affordableImage;
        (document.getElementsByClassName("card3-img")[0] as HTMLImageElement).src = reliableImage;
        (document.getElementsByClassName("profile1")[0] as HTMLImageElement).src = person1Image;
        (document.getElementsByClassName("profile2")[0] as HTMLImageElement).src = person2Image;
        (document.getElementsByClassName("profile3")[0] as HTMLImageElement).src = person3Image;
        (document.getElementsByClassName("middleLine")[0] as HTMLImageElement).src = horizontalLineImage;
        (document.getElementsByClassName("iconPosition1")[0] as HTMLImageElement).src = positionImage;
        (document.getElementsByClassName("iconPosition2")[0] as HTMLImageElement).src = positionImage;
        (document.getElementsByClassName("iconPosition3")[0] as HTMLImageElement).src = positionImage;
    }
}

window.addEventListener("DOMContentLoaded", ()=>{new Home()});