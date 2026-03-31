const wyzwania = [
    "Zrób 10 pompek",
    "Idź na 30 minutowy spacer",
    "Podnieś 20 kilo na sztandze",
    "Przeczytaj 20 stron książki",
    "Wypij 2 litry wody",
    "Zrób porządek na biurku",
    "Spędź godzinę bez telefonu",
    "Zjedz ślimaka",
    "Przebiegnij 2 km",
    "Zrób 30 przysiadów",
    "Posłuchaj polityków muzyki",
    "Zrób Obraz",
    "Pomóż bezdomnemu",
    "Rób deskę przez minutę",
    "Wyjdź na zakupy za kogoś",
    "Zorganizuj swoje pliki",
    "Zrób porządek u kogoś",
    "Uśmiechnij się do 5 osób",
    "Zaplanuj jutrzejszy dzień",
    "Podziękuj za ten dzień"
];


const generuj = document.getElementById("generuj");
const wyzwanie = document.getElementById("wyzwanie");
const wyzwanie_tekst = document.getElementById("wyzwanie_tekst");
const zrobione = document.getElementById("zrobione");
const pokaz_historie = document.getElementById("pokaz_historie");
const historia = document.getElementById("historia");
const lista_histori = document.getElementById("lista_histori");
const reset = document.getElementById("reset");


function animateDraw(callback) {
    let liczenie = 0;

    const interval = setInterval(() => {
        const random = wyzwania[Math.floor(Math.random() * wyzwania.length)];
        wyzwanie_tekst.textContent = random;
        liczenie++;

        if (liczenie > 10) {
            clearInterval(interval);
            callback();
        }
    }, 100);
}

generuj.addEventListener("click", () => {
    checkDateReset();

    animateDraw(() => {
        const random = wyzwania[Math.floor(Math.random() * wyzwania.length)];
        wyzwanie_tekst.textContent = random;
    });

    wyzwanie_tekst.classList.remove("completed");
    wyzwanie.classList.remove("hidden");

});


zrobione.addEventListener("click", () => {
    wyzwanie_tekst.classList.add("completed");

    let historia_d = JSON.parse(localStorage.getItem("history")) || [];

    historia_d .push({
        text: wyzwanie_tekst.textContent,
        time: new Date().toLocaleTimeString()
    });

    localStorage.setItem("history", JSON.stringify(historia_d ));
});


pokaz_historie.addEventListener("click", () => {
    historia.classList.toggle("hidden");
    lista_histori.innerHTML = "";

    const historia_z = JSON.parse(localStorage.getItem("history")) || [];

    if (historia_z.length === 0){
        const li = document.createElement("li");
        li.textContent = `Brak histori`;
        lista_histori.appendChild(li);


    }
    else{
        historia_z.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.text} (${item.time})`;
        lista_histori.appendChild(li);
    });

    }

});


reset.addEventListener("click", () => {

        localStorage.removeItem("history");

        wyzwanie_tekst.textContent = "";
        wyzwanie.classList.add("hidden");

});