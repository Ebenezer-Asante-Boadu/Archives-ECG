function createInput(type){
    let value = new HTMLInputElement;

    switch(type){
        case "checkbox":
            let element = document.createElement("input");
            element.type = type;
            value = element;
            break;
        default:
            value = false;
            break;
    }
    return value;
}