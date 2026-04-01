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
const liczba_w = document.getElementById("liczba_w");
const liczba_z = document.getElementById("liczba_z");

function liczniki() {
    liczba_w.textContent = localStorage.getItem("liczba_w") || 0;
    liczba_z.textContent = localStorage.getItem("liczba_z") || 0;
}

function sprawdz_daty() {
    const savedDaty = localStorage.getItem("date");
    const today = new Date().toLocaleDateString();

    if (savedDaty !== today) {
        localStorage.clear();
        localStorage.setItem("date", today);
        localStorage.setItem("liczba_w", 0);
        localStorage.setItem("liczba_z", 0);
    }
}

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
    sprawdz_daty();

    animateDraw(() => {
        const random = wyzwania[Math.floor(Math.random() * wyzwania.length)];
        wyzwanie_tekst.textContent = random;
    });

    let wszystkie = parseInt(localStorage.getItem("liczba_w")) || 0;
    wszystkie++;
    localStorage.setItem("liczba_w", wszystkie);

    liczniki();

    wyzwanie_tekst.classList.remove("zrobione");
    wyzwanie.classList.remove("ukryty");

});


zrobione.addEventListener("click", () => {
    wyzwanie_tekst.classList.add("zrobione");

    let historia_d = JSON.parse(localStorage.getItem("historia_d")) || [];

    historia_d .push({
        text: wyzwanie_tekst.textContent,
        time: new Date().toLocaleTimeString()
    });

    localStorage.setItem("historia_d", JSON.stringify(historia_d));

    let zrobione_count = parseInt(localStorage.getItem("liczba_z")) || 0;
    zrobione_count++;
    localStorage.setItem("liczba_z", zrobione_count);

    liczniki();
});


pokaz_historie.addEventListener("click", () => {
    historia.classList.toggle("ukryty");
    lista_histori.innerHTML = "";

    const historia_d = JSON.parse(localStorage.getItem("historia_d")) || [];

    if (historia_d.length === 0){
        const li = document.createElement("li");
        li.textContent = `Brak histori`;
        lista_histori.appendChild(li);


    }
    else{
        historia_d.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.text} (${item.time})`;
        lista_histori.appendChild(li);
    });

    }

});


reset.addEventListener("click", () => {

        localStorage.removeItem("historia_d");

        localStorage.setItem("liczba_w", 0);
        localStorage.setItem("liczba_z", 0);

        liczniki();

        wyzwanie_tekst.textContent = "";
        wyzwanie.classList.add("ukryty");

});


sprawdz_daty();
liczniki();


