let api = "andy1337";
const box = document.querySelector(".container");
const ddd = window.location;


const getCats = function(){
    fetch(`https://sb-cats.herokuapp.com/api/2/${api}/show`)
    .then(res => res.json())
    .then(data => {
        data.data.forEach(el => {
            if(el.id && el.name) {
            let card = `
                <div class="card">
                <div class="card-img" style="${el.img_link && `background-image: url(${el.img_link})`}"></div>
                <h4>${el.name}</h4>
                <br>
                <span>Возраст ${el.age} лет/года</span>
                <br>
                <span>${el.rate}/10</span>
                <span>ID: ${el.id}</span>
                <p>${el.description}</p>
                <a onclick="console.log(${el.id})" href="/cats0070.github.io/cat-page.html?${el.id}">see more</a>
                <br>
                </div>
            `;
            box.innerHTML += card;
            
        }});
    })
    
};
getCats();

const form = document.forms.addCat;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const body = {}
    for (let i = 0; i < form.elements.length; i++) {
        const el = form.elements[i];
        if (el.name && el.value) {
            body[el.name] =el.value
        }
        console.log(body)
    }
    fetch(`https://sb-cats.herokuapp.com/api/2/${api}/add`, {
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)

}
    ).then(res => res.json())
    .then(data => {
        if(data.message === "ok") {
            box.innerHTML = "";
            window.location.replace("/");
        }
    })
})




function info_create(){
    alert("Чтобы добавить, введите имя*, далее id*, рейтинг, возраст, описание и картинку в виде URL")
}
