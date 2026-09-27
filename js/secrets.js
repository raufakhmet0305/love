document.addEventListener("DOMContentLoaded", () => {

    const SECRET_COUNT = 7;

    const secrets = {
        1: {
            symbol: "♥",
            title: "С самого начала",
            text: "Иногда одно маленькое событие становится началом чего-то большого."
        },

        2: {
            symbol: "✦",
            title: "03.03.2026",
            text: "День, когда наше общение только начиналось."
        },

        3: {
            symbol: "◇",
            title: "Наши моменты",
            text: "Некоторые моменты хочется сохранить не только на фотографиях."
        },

        4: {
            symbol: "∞",
            title: "Почему ты",
            text: "Потому что среди миллионов людей именно ты стала частью моей истории."
        },

        5: {
            symbol: "♡",
            title: "Несколько слов",
            text: "Не всё важное получается сказать вслух."
        },

        6: {
            symbol: "✧",
            title: "Всё впереди",
            text: "У нашей истории ещё очень много страниц."
        },

        7: {
            symbol: "♥",
            title: "Главный секрет",
            text: "Самое главное — это то, что мы продолжаем писать эту историю вместе."
        }
    };


    /*
    =========================================
    SESSION STORAGE
    =========================================
    */

    let foundSecrets = JSON.parse(
        sessionStorage.getItem("raufPolinaSecrets") || "[]"
    );

    /*
    =========================================
    CREATE SECRET UI
    =========================================
    */

    const counter = document.createElement("div");

    counter.className = "secret-counter";

    document.body.appendChild(counter);


    function updateCounter() {
        counter.textContent =
            `Секреты: ${foundSecrets.length} / ${SECRET_COUNT}`;
    }

    updateCounter();


    /*
    =========================================
    OPEN SECRET
    =========================================
    */

    function openSecret(id) {

        if (!secrets[id]) return;

        const secret = secrets[id];

        if (!foundSecrets.includes(id)) {

            foundSecrets.push(id);

            sessionStorage.setItem(
                "raufPolinaSecrets",
                JSON.stringify(foundSecrets)
            );

            updateCounter();
        }


        const overlay = document.createElement("div");

        overlay.className = "secret-overlay";

        overlay.innerHTML = `
            <button class="secret-close" type="button">
                ×
            </button>

            <div class="secret-scene">

                <div class="secret-symbol">
                    ${secret.symbol}
                </div>

                <div class="secret-number">
                    СЕКРЕТ ${String(id).padStart(2, "0")}
                </div>

                <h2>
                    ${secret.title}
                </h2>

                <p>
                    ${secret.text}
                </p>

                <div class="secret-progress">
                    ${foundSecrets.length} / ${SECRET_COUNT}
                </div>

            </div>
        `;

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add("visible");
        });


        const closeButton =
            overlay.querySelector(".secret-close");


        closeButton.addEventListener("click", () => {

            overlay.classList.remove("visible");

            setTimeout(() => {
                overlay.remove();

                checkCompletion();

            }, 700);

        });


        overlay.addEventListener("click", (event) => {

            if (event.target === overlay) {
                closeButton.click();
            }

        });


        document.body.classList.add("secret-open");
    }


    /*
    =========================================
    SECRET BUTTONS
    =========================================
    */

    document.querySelectorAll("[data-secret]").forEach(element => {

        const id = Number(element.dataset.secret);

        element.addEventListener("click", () => {
            openSecret(id);
        });

        if (foundSecrets.includes(id)) {
            element.classList.add("secret-found");
        }

    });


    /*
    =========================================
    COMPLETION
    =========================================
    */

    function checkCompletion() {

        if (foundSecrets.length !== SECRET_COUNT) return;

        setTimeout(() => {

            const complete =
                document.createElement("div");

            complete.className = "secrets-complete";

            complete.innerHTML = `
                <div class="complete-content">

                    <div class="complete-number">
                        07 / 07
                    </div>

                    <div class="complete-heart">
                        ♥
                    </div>

                    <h2>
                        Ты нашла всё.
                    </h2>

                    <p>
                        Но самый главный секрет
                        всё это время был здесь.
                    </p>

                    <span>
                        Рауф & Полина
                    </span>

                </div>
            `;

            document.body.appendChild(complete);

            requestAnimationFrame(() => {
                complete.classList.add("visible");
            });


            setTimeout(() => {

                window.location.href = "final.html";

            }, 5500);

        }, 300);

    }


    /*
    =========================================
    SPECIAL SECRET #6
    =========================================
    */

    const hero = document.querySelector(".hero");

    if (hero && !document.querySelector("[data-secret='6']")) {

        let secret6Shown = false;

        window.addEventListener("scroll", () => {

            if (secret6Shown) return;

            if (window.scrollY > window.innerHeight * 0.8) {

                secret6Shown = true;

                const secret = document.createElement("button");

                secret.type = "button";
                secret.className = "floating-secret";
                secret.dataset.secret = "6";
                secret.textContent = "✧";

                document.body.appendChild(secret);

                secret.addEventListener("click", () => {
                    openSecret(6);
                    secret.remove();
                });

            }

        }, { passive: true });

    }


    /*
    =========================================
    ESC
    =========================================
    */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        const overlay =
            document.querySelector(".secret-overlay");

        if (overlay) {
            overlay.querySelector(".secret-close").click();
        }

    });

});

