document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       PRELOADER
    ========================================= */

    const preloader = document.querySelector(".preloader");

    if (preloader) {

        setTimeout(() => {

            preloader.classList.add("hidden");

            setTimeout(() => {
                preloader.remove();
            }, 900);

        }, 1800);

    }


    /* =========================================
       INTRO — ONLY ON HOME PAGE
    ========================================= */

    const intro = document.querySelector(".intro");

    if (intro) {

        const introText = intro.querySelector(".intro-text");
        const introButton = intro.querySelector(".intro-button");

        const text =
            "Иногда одна встреча меняет больше, чем кажется...";

        if (introText) {

            let index = 0;

            introText.textContent = "";

            const typing = setInterval(() => {

                introText.textContent += text[index];

                index++;

                if (index >= text.length) {

                    clearInterval(typing);

                    if (introButton) {
                        setTimeout(() => {
                            introButton.classList.add("visible");
                        }, 500);
                    }

                }

            }, 45);

        }


        if (introButton) {

            introButton.addEventListener("click", () => {

                intro.classList.add("hidden");

                setTimeout(() => {

                    const heroMessage =
                        document.querySelector(".hero-message");

                    if (heroMessage) {
                        heroMessage.classList.add("visible");
                    }

                }, 700);

            });

        }

    }


    /* =========================================
       HEADER SCROLL
    ========================================= */

    const header = document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

    }

});

