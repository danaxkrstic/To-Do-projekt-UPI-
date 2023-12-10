const ITEMS_CONTAINER = document.getElementById("items");
const ITEM_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");

let items = getItems();

function getItems() {
    const value = localStorage.getItem("todo") || "[]";

    return JSON.parse(value);
}


function setItems(items) {
    const itemsJson = JSON.stringify(items);

    localStorage.setItem("todo", itemsJson);
}


function addItem() {
    items.unshift({
        description: "",
        completed: false
    });

    setItems(items);
    osvjeziListu();
}


function azurirajPodatke(item, key, value){
    item[key] =value;

    setItems(items);
    osvjeziListu();
}


function osvjeziListu(){
    items.sort((a, b) => {
        if(a.completed){
            return 1;
        }
        if(b.completed){
            return -1;
        }

        return a.description < b.description ? -1 : 1;
    });


    ITEMS_CONTAINER.innerHTML="";


    for (const item of items) {
        const itemElement = ITEM_TEMPLATE.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedInput = itemElement.querySelector(".item-completed");

        descriptionInput.value = item.description;
        completedInput.checked = item.completed;

        descriptionInput.addEventListener("change", () => {
            azurirajPodatke(item, "description", descriptionInput.value);
        });

        completedInput.addEventListener("change", () => {
            azurirajPodatke(item, "completed", completedInput.checked);
        });

        ITEMS_CONTAINER.append(itemElement);
    }
}


ADD_BUTTON.addEventListener("click", () => {
    addItem();
});

osvjeziListu();