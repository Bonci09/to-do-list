// script.js
document.addEventListener("DOMContentLoaded", function() {
    createTaskTable();
});

function createTaskTable() {
    var hours = 24; // 24 óra
    var days = 7; // 7 nap

    var taskTableContainer = document.getElementById("taskTableContainer");
    var table = document.createElement("table");

    // Napok sorának létrehozása
    var dayRow = table.insertRow();
    dayRow.classList.add("day-row");
    var dayCell = dayRow.insertCell();
    dayCell.textContent = "idő";
    for (var j = 0; j < days; j++) {
        var dayCell = dayRow.insertCell();
        dayCell.textContent = getDayOfWeek(j); // Hét napjai
    }

    // Oszlop hozzáadása az órákhoz
    for (var i = 0; i < hours; i++) {
        var row = table.insertRow();
        var hourCell = row.insertCell();
        hourCell.classList.add("hour-column");
        hourCell.textContent = i.toString().padStart(2, "0") + ":00"; // Az óra
        for (var j = 0; j < days; j++) {
            var cell = row.insertCell();
            cell.classList.add("task-cell");
            // Négyzet hozzáadása a szövegdoboz mellett
            var checkbox = document.createElement("div");
            checkbox.classList.add("task-checkbox");
            checkbox.style.display = "none"; // Alapértelmezetten rejtve
            checkbox.addEventListener("click", function(event) {
                event.stopPropagation(); // Ne terjedjen ki a kattintás a cellán kívülre
                this.classList.toggle("checked"); // Pipa hozzáadása vagy eltávolítása
                var textBox = this.nextElementSibling; // A következő elem a szövegdoboz
                if (this.classList.contains("checked")) {
                    textBox.style.marginRight = "30px"; // Margin hozzáadása a jobb oldalra a pipa miatt
                } else {
                    textBox.style.marginRight = "0"; // Margin visszaállítása
                }
            });
            cell.appendChild(checkbox);
            // Szövegdoboz hozzáadása
            var textBox = document.createElement("div");
            textBox.classList.add("text-box");
            textBox.contentEditable = true; // Lehetőség az írásra
            textBox.addEventListener("click", function(event) {
                var checkbox = this.previousElementSibling;
                if (this.textContent === "") {
                    checkbox.style.display = "block"; // Csak akkor jelenik meg a négyzet, ha van szöveg
                }
            });
            textBox.addEventListener("blur", function(event) {
                var checkbox = this.previousElementSibling;
                if (this.textContent === "") {
                    checkbox.style.display = "none"; // A szövegdoboz elveszti a fókuszt, és nincs szöveg
                }
            });
            textBox.addEventListener("input", function(event) {
                var checkbox = this.previousElementSibling;
                if (this.textContent === "") {
                    checkbox.style.display = "none"; // Ha a szövegdoboz üres, a négyzet eltűnik
                } else {
                    checkbox.style.display = "block"; // Különben a négyzet megjelenik
                }
            });
            cell.appendChild(textBox);
        }
    }

    // Táblázat hozzáadása a tartályhoz
    taskTableContainer.appendChild(table);
}

function getDayOfWeek(dayIndex) {
    var days = ["hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat", "vasárnap"];
    return days[dayIndex];
}
// Szerezd be az összes checkbox-ot
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Minden checkbox-ra rakj egy eseményfigyelőt
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (!this.checked) {
            this.parentElement.dataset.checked = "false"; // Visszaállítjuk a dataset-et, ha nem pipált a checkbox
        } else {
            this.parentElement.dataset.checked = "true"; // Beállítjuk a dataset-et, ha pipált a checkbox
        }
    });
});

// Frissítsd a dátumot és jelenítsd meg a "date-display" osztályú elemen
function updateDate() {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)); // Hétfő
    const lastDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7)); // Vasárnap
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedFirstDay = firstDayOfWeek.toLocaleDateString('en-US', options);
    const formattedLastDay = lastDayOfWeek.toLocaleDateString('en-US', options);
    const formattedDate = `${formattedFirstDay} - ${formattedLastDay}`;
    const dateDisplay = document.querySelector('.date-display');
    dateDisplay.textContent = formattedDate;

    // Nyilak hozzáadása
    const prevArrow = document.createElement('span');
    prevArrow.textContent = '<< ';
    prevArrow.classList.add('arrow', 'prev-arrow');

    const nextArrow = document.createElement('span');
    nextArrow.textContent = ' >>';
    nextArrow.classList.add('arrow', 'next-arrow');

    dateDisplay.insertBefore(prevArrow, dateDisplay.firstChild);
    dateDisplay.appendChild(nextArrow);
}

// Hívjuk meg az updateDate függvényt, hogy az oldal betöltésekor és minden alkalommal frissítse a dátumot
updateDate();

// Ha további módosításokra van szükséged, kérlek, szólj!



