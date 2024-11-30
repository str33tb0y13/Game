// HTML element references
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("user-input");
const startButton = document.getElementById("start-btn");
const submitButton = document.getElementById("submit-btn");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const remainingWordsDisplay = document.getElementById("remaining-words");
const categoryButtons = document.querySelectorAll(".category-btn");
const bgToDeBtn = document.getElementById("bg-to-de-btn");  // Button for Bulgarian → German
const deToBgBtn = document.getElementById("de-to-bg-btn");  // Button for German → Bulgarian

// State variables
let currentWords = [];
let currentWordIndex = 0;
let score = 0;
let remainingWords = 0;
let isBgToDe = true; // Default translation direction (Bulgarian → German)

// Word categories
const categories = {
    lektion1: [
        { bg: "Здравей", de: "Hallo" },
        { bg: "Добро утро", de: "Guten Morgen" },
        { bg: "Добър ден", de: "Guten Tag" },
        { bg: "Добър вечер", de: "Guten Abend" },
        { bg: "Лека нощ", de: "Gute Nacht" },
        { bg: "Довиждане", de: "Auf Wiedersehen" },
        { bg: "Госпожа", de: "die Frau, -en" },
        { bg: "Господин", de: "der Herr, -en" },
        { bg: "Име", de: "der Name, -n" },
        { bg: "Първо име", de: "der Vorname, -n" },
        { bg: "Фамилия", de: "der Familienname, -n" },
        { bg: "Азбука", de: "das Alphabet, -e" },
        { bg: "Също", de: "Auch" },
        { bg: "Благодаря", de: "Danke" },
        { bg: "Да", de: "Ja" },
        { bg: "Не", de: "Nein" },
        { bg: "Много", de: "Sehr" }
    ],
    lektion2: [
        { bg: "Работодател", de: "der Arbeitgeber, -" },
        { bg: "Обучение", de: "die Ausbildung, -en" },
        { bg: "Професия", de: "der Beruf, -e" },
        { bg: "Университет", de: "die Hochschule," },
        { bg: "Година", de: "das Jahr, -e" },
        { bg: "Работа", de: "der Job, -s" },
        { bg: "Стаж", de: "das Praktikum, Praktika" },
        { bg: "Училище", de: "die Schule, -n" },
        { bg: "Място", de: "die Stelle, -n" },
        { bg: "Работя", de: "Arbeiten" },
        { bg: "Архитект", de: "der Architekt, -en" },
        { bg: "Лекар", de: "der Arzt, -e" },
        { bg: "Фризьор", de: "der Friseur, -e" },
        { bg: "Дете", de: "das Kind, -er" },
        { bg: "Вярвам", de: "Glauben" },
        { bg: "Имам", de: "Haben" },
        { bg: "Правя", de: "Machen" },
        { bg: "Вярно", de: "Richtig" },
        { bg: "Грешно", de: "Falsch" },
        { bg: "Семейно положение", de: "der Familienstand" },
        { bg: "Инженер", de: "der Ingenieur, -e" },
        { bg: "Журналист", de: "der Journalist, -en" },
        { bg: "Сервитьор", de: "der Kellner, -" },
        { bg: "Медицинска сестра", de: "die Krankenschwester, -n" },
        { bg: "Учител", de: "der Lehrer, -" },
        { bg: "Мехатроник", de: "der Mechatroniker, -" },
        { bg: "Студент", de: "der Student, -en" },
        { bg: "Актьор", de: "der Schauspieler, -" },
        { bg: "Ученик", de: "der Schüler, -" },
        { bg: "Секретар", de: "der Sekretär, -e" },
        { bg: "Продавач", de: "der Verkäufer, -" }
    ],
    lektion3: [
        { bg: "Семейство", de: "die Familie, -n" },
        { bg: "Баща", de: "der Vater, Väter" },
        { bg: "Майка", de: "die Mutter, Mütter" },
        { bg: "Родители", de: "die Eltern (Pl.)" },
        { bg: "Син", de: "der Sohn, Söhne" },
        { bg: "Дъщеря", de: "die Tochter, Töchter" },
        { bg: "Дядо", de: "der Großvater, Großväter" },
        { bg: "Баба", de: "die Großmutter, Großmütter" },
        { bg: "Дядо и баба", de: "die Großeltern (Pl.)" },
        { bg: "Внучка", de: "die Enkelin, -nen" },
        { bg: "Внук", de: "der Enkel, -" },
        { bg: "Брат", de: "der Bruder, Brüder" },
        { bg: "Сестра", de: "die Schwester, -n" },
        { bg: "Братя и сестри", de: "die Geschwister (Pl.)" },
        { bg: "Съпруга", de: "die (Ehe)Frau, -en" },
        { bg: "Езици", de: "die Sprachen" },
        { bg: "Език", de: "die Sprache, -n" },
        { bg: "Снимка", de: "das Bild, -er" },
        { bg: "Приятел", de: "der Freund, -e" },
        { bg: "Колега", de: "der Kollege, -n" },
        { bg: "Партньор", de: "der Partner, -" },
        { bg: "Да", de: "ja" },
        { bg: "Не", de: "nein" },
        { bg: "Напротив", de: "doch" },
        { bg: "Малко", de: "ein bisschen" },
        { bg: "Моля", de: "bitte" },
        { bg: "Точно", de: "genau" },
        { bg: "Мой", de: "mein" },
        { bg: "Твой", de: "dein" }
    ],
    lektion4: [
        { bg: "Мебели", de: "die Möbel (Pl.)" },
        { bg: "Легло", de: "das Bett, -en" },
        { bg: "Картина", de: "das Bild, -er" },
        { bg: "Лампа", de: "die Lampe, -n" },
        { bg: "Шкаф", de: "der Schrank, Schränke" },
        { bg: "Фотьойл", de: "der Sessel, -" },
        { bg: "Диван", de: "das Sofa, -s" },
        { bg: "Стол", de: "der Stuhl, Stühle" },
        { bg: "Килим", de: "der Teppich, -e" },
        { bg: "Маса", de: "der Tisch, -e" },
        { bg: "Евро", de: "der Euro, -s" },
        { bg: "Цент", de: "der Cent, -s" },
        { bg: "Цена", de: "der Preis, -e" },
        { bg: "Оферта", de: "das Angebot, -e" },
        { bg: "струвам", de: "kosten" },
        { bg: "правя", de: "machen" },
        { bg: "евтин", de: "günstig/billig" },
        { bg: "скъп", de: "teuer" },
        { bg: "Помощ", de: "die Hilfe, -n" },
        { bg: "Стая", de: "das Zimmer, -" },
        { bg: "нуждая се", de: "brauchen" },
        { bg: "намирам", de: "finden" },
        { bg: "казвам", de: "sagen" },
        { bg: "само", de: "nur" },
        { bg: "наистина", de: "wirklich" },
        { bg: "голям", de: "groß" },
        { bg: "грозен", de: "hässlich" },
        { bg: "малък", de: "klein" },
        { bg: "кратък", de: "kurz" },
        { bg: "дълъг", de: "lang" },
        { bg: "лесен", de: "leicht" },
        { bg: "модерен", de: "modern" },
        { bg: "практичен", de: "praktisch" },
        { bg: "лош", de: "schlecht" },
        { bg: "красив", de: "schön" },
        { bg: "труден", de: "schwer" }
    ],
        lektion5: [
            { de: "der Regenschirm, -e", bg: "Чадър" },
            { de: "der Ring, -e", bg: "Пръстен" },
            { de: "der Schlüssel, -", bg: "Ключ" },
            { de: "die Seife, -n", bg: "Сапун" },
            { de: "das Streichholz, Streichhölzer", bg: "Кибритена клечка" },
            { de: "die Tasche, -n", bg: "Чанта" },
            { de: "die Uhr, -en", bg: "Часовник" },
            { de: "die Form, -en", bg: "Форма" },
            { de: "eckig", bg: "Ъглов" },
            { de: "leicht", bg: "Лек" },
            { de: "neu", bg: "Нов" },
            { de: "rund", bg: "Кръгъл" },
            { de: "das Material, Materialien", bg: "Материал" },
            { de: "das Glas, Gläser", bg: "Стъкло" },
            { de: "das Holz, -", bg: "Дърво" },
            { de: "das Metall, -e", bg: "Метал" },
            { de: "das Papier, -e", bg: "Хартия" },
            { de: "das Plastik, -", bg: "Пластмаса" },
            { de: "der Bleistift, -e", bg: "Молив" },
            { de: "die Brille, -n", bg: "Очила" },
            { de: "das Buch, Bücher", bg: "Книга" },
            { de: "das Feuerzeug, -e", bg: "Запалка" },
            { de: "die Flasche, -n", bg: "Бутилка" },
            { de: "der Fotoapparat, -e", bg: "Фотоапарат" },
            { de: "die Geldbörse, -n", bg: "Портмоне" },
            { de: "die Adresse, -n", bg: "Адрес" },
            { de: "die Nummer, -n", bg: "Номер" },
            { de: "die Kette, -n", bg: "Колие" },
            { de: "der Kugelschreiber, -", bg: "Химикалка" },
            { de: "die Farbe, -n", bg: "Цвят" },
            { de: "blau", bg: "Син" },
            { de: "braun", bg: "Кафяв" },
            { de: "gelb", bg: "Жълт" },
            { de: "grün", bg: "Зелен" },
            { de: "orange", bg: "Оранжев" },
            { de: "rot", bg: "Червен" },
            { de: "schwarz", bg: "Черен" },
            { de: "weiß", bg: "Бял" },
            { de: "möchten", bg: "Искам" },
            { de: "die E-Mail, -s", bg: "Имейл" },
            { de: "das Fax, -e", bg: "Факс" },
            { de: "das Geburtsdatum, Geburtsdaten", bg: "Дата на раждане" },
            { de: "der Ort, -e", bg: "Място" },
            { de: "die Straße, -n", bg: "Улица" },
            { de: "das Telefon, -e", bg: "Телефон" },
            { de: "die Entschuldigung, -en", bg: "Извинение" },
            { de: "die Menge, -n", bg: "Количество" },
            { de: "das Problem, -e", bg: "Проблем" },
            { de: "das Produkt, -e", bg: "Продукт" },
            { de: "das Wort, Wörter", bg: "Дума" },
            { de: "das Wörterbuch, Wörterbücher", bg: "Речник" },
            { de: "bieten", bg: "Предлагам" },
            { de: "schreiben", bg: "Пиша" },
            { de: "jetzt", bg: "Сега" },
            { de: "jeder", bg: "Всеки" },
            { de: "noch einmal", bg: "Още веднъж" },
            { de: "so", bg: "Така" }
        ],
    
        lektion6: [
            { de: "der Arbeitsplatz, Arbeitsplätze", bg: "Работно място" },
            { de: "der Bildschirm, -e", bg: "Екран" },
            { de: "die Briefmarke, -n", bg: "Пощенска марка" },
            { de: "das Büro, -s", bg: "Офис" },
            { de: "der Chef, -s", bg: "Шеф" },
            { de: "der Computer, -", bg: "Компютър" },
            { de: "der Drucker, -", bg: "Принтер" },
            { de: "die Firma, Firmen", bg: "Фирма" },
            { de: "das Formular, -e", bg: "Формуляр" },
            { de: "das Handy, -s", bg: "Мобилен телефон" },
            { de: "der Kalender, -", bg: "Календар" },
            { de: "der Laptop, -s", bg: "Лаптоп" },
            { de: "die Maus, Mäuse", bg: "Мишка" },
            { de: "das Notizbuch, Notizbücher", bg: "Бележник" },
            { de: "die Rechnung, -en", bg: "Фактура" },
            { de: "die SMS, -", bg: "Съобщение" },
            { de: "der Stift, -e", bg: "Химикалка" },
            { de: "der Termin, -e", bg: "Среща" },
            { de: "Achtung!", bg: "Внимание!" },
            { de: "Auf Wiederhören", bg: "Дочуване" },
            { de: "das Foto, -s", bg: "Снимка" },
            { de: "der Gruß, Grüße", bg: "Поздрав" },
            { de: "der See, -n", bg: "Езеро" },
            { de: "der Stress, -", bg: "Стрес" },
            { de: "die Telefonnummer, -n", bg: "Телефонен номер" },
            { de: "die Zeit, -en", bg: "Време" },
            { de: "gehen", bg: "Отивам" },
            { de: "suchen", bg: "Търся" },
            { de: "heute", bg: "Днес" },
            { de: "hier", bg: "Тук" },
            { de: "mit", bg: "Със" },
            { de: "oder", bg: "Или" },
            { de: "wieder", bg: "Отново" }
        ], 
    lektion7: [
        { de: "der Ausflug", bg: "Излет" },
        { de: "der Film", bg: "Филм" },
        { de: "die Freizeit", bg: "Свободно време" },
        { de: "das Hobby", bg: "Хоби" },
        { de: "das Kino", bg: "Кино" },
        { de: "backen", bg: "Пека" },
        { de: "besuchen", bg: "Посещавам" },
        { de: "treffen", bg: "Срещам" },
        { de: "fotografieren", bg: "Фотографирам" },
        { de: "kochen", bg: "Готвя" },
        { de: "lesen", bg: "Чета" },
        { de: "lieben", bg: "Обичам" },
        { de: "malen", bg: "Рисувам" },
        { de: "die Musik", bg: "Музика" },
        { de: "Rad fahren", bg: "Карам колело" },
        { de: "schwimmen", bg: "Плувам" },
        { de: "singen", bg: "Пея" },
        { de: "spazieren gehen", bg: "Разхождам се" },
        { de: "spielen", bg: "Играя" },
        { de: "tanzen", bg: "Танцувам" },
        { de: "immer", bg: "Винаги" },
        { de: "oft", bg: "Често" },
        { de: "manchmal", bg: "Понякога" },
        { de: "klar", bg: "Ясно" },
        { de: "natürlich", bg: "Разбира се" },
        { de: "leider", bg: "За съжаление" },
        { de: "tut mir leid", bg: "Съжалявам" },
        { de: "das Auto", bg: "Кола" },
        { de: "das Gespräch", bg: "Разговор" },
        { de: "das Internet", bg: "Интернет" },
        { de: "die Natur", bg: "Природа" },
        { de: "Spaß machen", bg: "Забавлявам" },
        { de: "können", bg: "Мога" },
        { de: "rauchen", bg: "Пуша" }
    ],
    lektion8: [
        { de: "die Ausstellung", bg: "Изложба" },
        { de: "die Bar", bg: "Бар" },
        { de: "das Café", bg: "Кафе" },
        { de: "die Disco", bg: "Дискотека" },
        { de: "die Kneipe", bg: "Кръчма" },
        { de: "das Konzert", bg: "Концерт" },
        { de: "das Museum", bg: "Музей" },
        { de: "das Restaurant", bg: "Ресторант" },
        { de: "das Schwimmbad", bg: "Плувен басейн" },
        { de: "das Theater", bg: "Театър" },
        { de: "die Uhr", bg: "Часовник" },
        { de: "halb", bg: "Половина" },
        { de: "Viertel", bg: "Четвърт" },
        { de: "der Morgen", bg: "Сутрин" },
        { de: "der Vormittag", bg: "Преди обяд" },
        { de: "der Mittag", bg: "Обяд" },
        { de: "der Nachmittag", bg: "Следобед" },
        { de: "der Abend", bg: "Вечер" },
        { de: "die Nacht", bg: "Нощ" },
        { de: "die Woche", bg: "Седмица" },
        { de: "der Montag", bg: "Понеделник" },
        { de: "der Dienstag", bg: "Вторник" },
        { de: "der Mittwoch", bg: "Сряда" },
        { de: "der Donnerstag", bg: "Четвъртък" },
        { de: "der Freitag", bg: "Петък" },
        { de: "der Samstag", bg: "Събота" },
        { de: "der Sonntag", bg: "Неделя" },
        { de: "das Essen", bg: "Храна" },
        { de: "das Fernsehen", bg: "Телевизия" },
        { de: "der Kaffee", bg: "Кафе" },
        { de: "das Radio", bg: "Радио" },
        { de: "sehen", bg: "Виждам" },
        { de: "wissen", bg: "Знам" },
        { de: "bald", bg: "Скоро" },
        { de: "besonders", bg: "Особено" },
        { de: "höflich", bg: "Учтиво" },
        { de: "morgen", bg: "Утре" },
        { de: "noch", bg: "Още" },
        { de: "spät", bg: "Късно" },
        { de: "vielleicht", bg: "Може би" },
        { de: "die Idee", bg: "Идея" }
    ],
    lektion9: [
        { de: "der Apfel, Äpfel", bg: "Ябълка" },
        { de: "der Braten, -", bg: "Печено месо" },
        { de: "das Brötchen, -", bg: "Питка" },
        { de: "das Brot, -e", bg: "Хляб" },
        { de: "die Butter, -", bg: "Масло" },
        { de: "das Ei, -er", bg: "Яйце" },
        { de: "das Eis, -", bg: "Сладолед" },
        { de: "der Fisch, -e", bg: "Риба" },
        { de: "das Fleisch, -", bg: "Месо" },
        { de: "der Käse, -", bg: "Сирене/Кашкавал" },
        { de: "die Kartoffel, -n", bg: "Картоф" },
        { de: "der Kuchen, -", bg: "Кекс" },
        { de: "die Milch, -", bg: "Мляко" },
        { de: "das Obst, -", bg: "Плодове" },
        { de: "die Orange, -n", bg: "Портокал" },
        { de: "der Reis, -", bg: "Ориз" },
        { de: "die Sahne, -", bg: "Сметана" },
        { de: "der Salat, -e", bg: "Салата" },
        { de: "der Schinken, -", bg: "Шунка" },
        { de: "die Schokolade, -n", bg: "Шоколад" },
        { de: "die Suppe, -n", bg: "Супа" },
        { de: "der Tee, -s", bg: "Чай" },
        { de: "die Tomate, -n", bg: "Домат" },
        { de: "die Wurst, -e", bg: "Наденица" },
        { de: "die Zitrone, -n", bg: "Лимон" },
        { de: "die Zwiebel, -n", bg: "Лук" },
        { de: "das Frühstück, -e", bg: "Закуска" },
        { de: "der Hunger, -", bg: "Глад" },
        { de: "der Kühlschrank, Kühlschränke", bg: "Хладилник" },
        { de: "essen, -", bg: "Ям" },
        { de: "frühstücken, -", bg: "Закусвам" },
        { de: "mögen, -", bg: "Харесвам" },
        { de: "schmecken, -", bg: "Вкусвам" },
        { de: "trinken, -", bg: "Пия" },
        { de: "die Einladung, -en", bg: "Покана" },
        { de: "die Speisekarte, -n", bg: "Меню" },
        { de: "das Wochenende, -n", bg: "Уикенд" },
        { de: "möchten, -", bg: "Желая" },
        { de: "kennen, -", bg: "Познавам" },
        { de: "etwas, -", bg: "Нещо" },
        { de: "erst, -", bg: "Едва" },
        { de: "schon, -", bg: "Вече" }
    ],
    lektion10: [
        { de: "der Bahnhof, -e", bg: "ЖП гара" },
        { de: "der Bahnsteig, -e", bg: "Платформа" },
        { de: "der Bus, -se", bg: "Автобус" },
        { de: "der Halt, -e", bg: "Спирка" },
        { de: "der Flughafen, Flughäfen", bg: "Летище" },
        { de: "das Flugzeug, -e", bg: "Самолет" },
        { de: "das Gepäck, -", bg: "Багаж" },
        { de: "das Gleis, -e", bg: "Релса" },
        { de: "der Koffer, -", bg: "Чанта/Куфар" },
        { de: "die S-Bahn, -en", bg: "Трамвай" },
        { de: "die Straßenbahn, -en", bg: "Трамвай" },
        { de: "die Tram, -s", bg: "Трамвай" },
        { de: "das Taxi, -s", bg: "Такси" },
        { de: "die Minute, -n", bg: "Минута" },
        { de: "die Vorsicht, -", bg: "Внимание" },
        { de: "entschuldigen", bg: "Извинявайте" },
        { de: "anrufen", bg: "Обаждам се" },
        { de: "bekommen", bg: "Получавам" },
        { de: "einkaufen", bg: "Пазарувам" },
        { de: "fernsehen", bg: "Гледам телевизия" },
        { de: "mitbringen", bg: "Нося с мен" },
        { de: "nehmen", bg: "Вземам" },
        { de: "also", bg: "Също така" },
        { de: "dann", bg: "Тогава" },
        { de: "gerade", bg: "Тъкмо" },
        { de: "nächste", bg: "Следващ" },
        { de: "viel", bg: "Много" },
        { de: "auf", bg: "На" },
        { de: "die U-Bahn, -en", bg: "Метро" },
        { de: "das Verkehrsmittel, -", bg: "Транспортно средство" },
        { de: "der Zug, Züge", bg: "Влак" },
        { de: "abfahren", bg: "Отпътувам" },
        { de: "abholen", bg: "Извеждам" },
        { de: "ankommen", bg: "Пристигам" },
        { de: "aussteigen", bg: "Слизам" },
        { de: "einsteigen", bg: "Качвам се" },
        { de: "umsteigen", bg: "Прехвърлям се (на друг транспорт)" }
    ]
};

// Get the button and body elements
const modeToggleBtn = document.getElementById("mode-toggle-btn");
const body = document.body;

// Check the initial mode (if dark mode is already applied)
const isDarkMode = localStorage.getItem("darkMode") === "true";

// Apply the correct theme on page load
if (isDarkMode) {
    body.classList.add("dark-mode");
    modeToggleBtn.textContent = "Switch to Light Mode";
} else {
    modeToggleBtn.textContent = "Switch to Dark Mode";
}

// Add event listener for button click
modeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Toggle button text and update localStorage
    if (body.classList.contains("dark-mode")) {
        modeToggleBtn.textContent = "Switch to Light Mode";
        localStorage.setItem("darkMode", "true"); // Save the preference
    } else {
        modeToggleBtn.textContent = "Switch to Dark Mode";
        localStorage.setItem("darkMode", "false"); // Save the preference
    }
});



// Load words for selected category
function loadCategory(category) {
    if (categories[category]) {
        currentWords = [...categories[category]]; // Make a copy of the words array
        shuffleWords(currentWords); // Randomize the words
        resetGame();
    } else {
        console.error(`Category '${category}' does not exist.`);
    }
}

// Shuffle the words randomly
function shuffleWords(words) {
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]]; // Swap words
    }
}

// Reset the game state
function resetGame() {
    currentWordIndex = 0;
    score = 0;
    remainingWords = currentWords.length;
    scoreDisplay.textContent = `Score: ${score}`;
    remainingWordsDisplay.textContent = `Remaining words: ${remainingWords}`;
    feedback.textContent = "";
    wordDisplay.textContent = "Press 'Start' to begin!";
    inputField.value = "";
    inputField.disabled = true;
    submitButton.disabled = true;
}

// Start the game
startButton.addEventListener("click", () => {
    if (currentWords.length > 0) {
        resetGame();
        inputField.disabled = false;
        submitButton.disabled = false;
        loadNextWord();
    } else {
        wordDisplay.textContent = "Please select a category first!";
    }
});

// Load the next word in the game
function loadNextWord() {
    if (currentWordIndex < currentWords.length) {
        const currentWord = currentWords[currentWordIndex];
        // Display the correct word based on the direction
        if (isBgToDe) {
            wordDisplay.textContent = `Translate: ${currentWord.bg}`; // Bulgarian → German
        } else {
            wordDisplay.textContent = `Translate: ${currentWord.de}`; // German → Bulgarian
        }
    } else {
        endGame();
    }
}

// Submit the user's answer
submitButton.addEventListener("click", () => {
    const userInput = inputField.value.trim();
    const currentWord = currentWords[currentWordIndex];
    if (!currentWord) return;

    const correctAnswer = isBgToDe ? currentWord.de : currentWord.bg;
    if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = `Incorrect! The correct answer is: ${correctAnswer}`;
    }

    scoreDisplay.textContent = `Score: ${score}`;
    currentWordIndex++;
    remainingWords--;
    remainingWordsDisplay.textContent = `Remaining words: ${remainingWords}`;

    inputField.value = "";
    loadNextWord();
});



// End the game
function endGame() {
    wordDisplay.textContent = "Game over! Well done!";
    inputField.disabled = true;
    submitButton.disabled = true;
}

// Language Toggle Buttons
bgToDeBtn.addEventListener("click", () => {
    isBgToDe = true;
    loadNextWord();
    bgToDeBtn.disabled = true;
    deToBgBtn.disabled = false;
});

deToBgBtn.addEventListener("click", () => {
    isBgToDe = false;
    loadNextWord();
    bgToDeBtn.disabled = false;
    deToBgBtn.disabled = true;
});

// Category Button Clicks
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedCategory = button.getAttribute("data-category");
        loadCategory(selectedCategory); // Load the clicked category
    });
});
