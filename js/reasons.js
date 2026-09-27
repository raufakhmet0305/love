document.addEventListener("DOMContentLoaded", () => {

    const deck = document.getElementById("reasonsDeck");
    const nextButton = document.getElementById("reasonNext");
    const currentNumber = document.getElementById("reasonCurrent");

    if (!deck || !nextButton || !currentNumber) return;


    const reasons = [
        "За то, как рядом спокойно.",
        "За твою улыбку.",
        "За искренность.",
        "За твоё тепло.",
        "За то, что с тобой легко.",
        "За наши разговоры.",
        "За моменты, которые хочется помнить.",
        "За твою доброту.",
        "За то, как ты умеешь радовать.",
        "За твою особенность.",
        "За смех, который хочется слышать.",
        "За простые моменты вместе.",
        "За то, что ты рядом.",
        "За твоё внимание.",
        "За твою улыбку в обычный день.",
        "За ощущение, что всё хорошо.",
        "За наши маленькие воспоминания.",
        "За твою искренность.",
        "За то, что с тобой можно быть собой.",
        "За каждый наш новый момент.",
        "За твоё присутствие в моей жизни.",
        "За то, как меняется день рядом с тобой.",
        "За наши прогулки.",
        "За то, что хочется создавать воспоминания.",
        "За твою нежность.",
        "За наши разговоры обо всём.",
        "За то, что ты делаешь дни особенными.",
        "За то, что впереди ещё столько всего.",
        "За нашу историю.",
        "За то, что это именно ты."
    ];


    let currentIndex = 0;


    /* =========================================
       CREATE CARDS
    ========================================= */

    reasons.forEach((reason, index) => {

        const card = document.createElement("div");

        card.className = "reason-card";

        const text = document.createElement("span");
        text.textContent = reason;

        card.appendChild(text);

        card.dataset.index = index;

        card.addEventListener("click", () => {

            if (index === currentIndex) {
                showNextReason();
            }

        });

        deck.appendChild(card);

    });


    const cards = Array.from(
        deck.querySelectorAll(".reason-card")
    );


    /* =========================================
       UPDATE DECK
    ========================================= */

    function updateDeck() {

        cards.forEach((card, index) => {

            card.classList.remove(
                "is-current",
                "is-next",
                "is-third",
                "is-hidden"
            );


            const relativeIndex =
                (index - currentIndex + reasons.length)
                % reasons.length;


            if (relativeIndex === 0) {

                card.classList.add("is-current");

            } else if (relativeIndex === 1) {

                card.classList.add("is-next");

            } else if (relativeIndex === 2) {

                card.classList.add("is-third");

            } else {

                card.classList.add("is-hidden");

            }

        });


        currentNumber.textContent =
            String(currentIndex + 1).padStart(2, "0");


        if (currentIndex === reasons.length - 1) {

            nextButton.innerHTML = `
                <span>Ещё раз</span>
                <span class="reason-arrow">↻</span>
            `;

        } else {

            nextButton.innerHTML = `
                <span>Дальше</span>
                <span class="reason-arrow">→</span>
            `;

        }

    }


    /* =========================================
       NEXT
    ========================================= */

    function showNextReason() {

        if (currentIndex === reasons.length - 1) {

            currentIndex = 0;

            updateDeck();

            return;

        }


        currentIndex++;

        updateDeck();


        if (currentIndex === reasons.length - 1) {

            setTimeout(() => {

                const finalSection =
                    document.getElementById("reasonsFinal");

                if (finalSection) {

                    finalSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }, 850);

        }

    }


    nextButton.addEventListener(
        "click",
        showNextReason
    );


    /* =========================================
       KEYBOARD
    ========================================= */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "ArrowRight" ||
            event.key === " "
        ) {

            const tag =
                document.activeElement?.tagName;

            if (
                tag !== "INPUT" &&
                tag !== "TEXTAREA" &&
                tag !== "BUTTON"
            ) {

                event.preventDefault();

                showNextReason();

            }

        }

    });


    /* =========================================
       INITIAL STATE
    ========================================= */

    updateDeck();

});

