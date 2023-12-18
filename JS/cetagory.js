let button = document.querySelector('button');
let card = document.querySelector('.cardCreate')
let action = document.querySelector('.action')
let save = document.querySelector('.save');
let tbody = document.querySelector('tbody');
let input = document.querySelector('input');
let inputName = document.querySelector('#name');
let inputDescript = document.querySelector('#descript');
let stocks = [];

function saveStorage() {
    localStorage.setItem('stocks', JSON.stringify(stocks));
}
function getStorage() {
    if (JSON.parse(localStorage.getItem('stocks')) != null) {
        stocks = JSON.parse(localStorage.getItem('stocks'));
    }
}
function showcard(event) {
    event.style.display = "block";
}

function hidecard(event) {
    event.style.display = 'none';
}

button.onclick = () => {
    hidecard(action);
    showcard(card);
}

// table//====================================
function create() {
    let obj = {}
    obj.name = iput.lastElementChild.value;
    stocks.push(obj)
    console.log(stocks);

}

function addCard() {
    card.style.display = 'block'
    action.style.display = 'none'
}

function deletecard() {
    card.style.display = 'none'
    action.style.display = 'block'
}
function createCard() {
    if (inputName.value === ""){
        return alert('You must input value before create ')
    }
    let uniqesID = localStorage.getItem('id');
    if (uniqesID === null) {
        uniqesID = 1;
        localStorage.setItem('id', JSON.stringify(uniqesID));
    } else {
        uniqesID = parseInt(uniqesID) + 1;
        localStorage.setItem('id', JSON.stringify(uniqesID));
    }
    let cards = {
        id: uniqesID,
        name: inputName.value
    }
    stocks.push(cards);
    // console.log(stocks);
    createRow()
    saveStorage();
    location.reload()
}
function cencel() {
    hidecard(card);
    showcard(action)
}

// ------------------editCetagory-----------------------------------------

function edit_category(event){
    addCard()
    
    let index = event.target.closest('tr').dataset.index
    let tr = event.target.closest('tr')
    let saves = document.querySelector('.save button')
    saves.textContent =  'UPDATE'
    saves.removeAttribute('onclick')
    saves.setAttribute('onclick',`updateCategory(${index})`)
    console.log(save);
    inputName.value = tr.children[1].textContent

}

function updateCategory(index){
    console.log(index);
    let trs = document.querySelector('tbody')
    let names = trs.children[index].firstElementChild.nextElementSibling
    let savesa = document.querySelector('.save button')
    savesa.removeAttribute('onclick')
    savesa.textContent = 'CREATE'
    savesa.setAttribute('onclick','createCard()')
    names.textContent = inputName.value
    inputName.value = ""
    deletecard()
    console.log(savesa);
}

// -------------------------------createCetagory--------------------------------------

function createRow() {
    for (let i=0; i<stocks.length; i++) {
        let tr = document.createElement('tr');
        tr.dataset.index = i;
        let id = document.createElement('td');
        id.textContent = stocks[i].id
        let nameproduct = document.createElement('td')
        nameproduct.textContent = stocks[i].name;
        let sell_progrese = document.createElement('td');
        let imge = document.createElement('img')
        imge.classList.add('image')
        imge.src = '../image/edit_button.png';

        let images = document.createElement('img');
        images.classList.add('image')
        images.src = '../image/trash.png';

        imge.addEventListener('click', edit_category)

        sell_progrese.appendChild(imge)
        sell_progrese.appendChild(images)
        tr.appendChild(id);
        tr.appendChild(nameproduct);

        tr.appendChild(sell_progrese);
        tbody.appendChild(tr);
        // console.log(tbody);
    }

}

getStorage();
createRow()
// localStorage.clear();