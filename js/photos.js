document.addEventListener("DOMContentLoaded", () => {

    const photoCards =
        document.querySelectorAll(".photo-card");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");

    const lightboxCounter =
        document.getElementById("lightboxCounter");


    if (
        !photoCards.length ||
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    const photos = [];


    photoCards.forEach(card => {

        const image =
            card.querySelector("img");

        if (image) {

            photos.push(image.src);

        }

    });


    let currentIndex = 0;


    /* =========================================
       OPEN
    ========================================== */

    function openLightbox(index) {

        currentIndex = index;

        updateLightbox();

        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "menu-open"
        );

    }


    /* =========================================
       CLOSE
    ========================================== */

    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }


    /* =========================================
       UPDATE
    ========================================== */

    function updateLightbox() {

        lightboxImage.src =
            photos[currentIndex];


        lightboxCounter.textContent =
            `${String(currentIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;

    }


    /* =========================================
       NEXT
    ========================================== */

    function nextPhoto() {

        currentIndex++;

        if (currentIndex >= photos.length) {

            currentIndex = 0;

        }

        updateLightbox();

    }


    /* =========================================
       PREVIOUS
    ========================================== */

    function previousPhoto() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                photos.length - 1;

        }

        updateLightbox();

    }


    /* =========================================
       PHOTO CLICK
    ========================================== */

    photoCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        card.dataset.index
                    );

                openLightbox(index);

            }
        );

    });


    /* =========================================
       BUTTONS
    ========================================== */

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightboxNext.addEventListener(
        "click",
        nextPhoto
    );


    lightboxPrev.addEventListener(
        "click",
        previousPhoto
    );


    /* =========================================
       BACKGROUND CLICK
    ========================================== */

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /* =========================================
       KEYBOARD
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowRight") {

                nextPhoto();

            }


            if (event.key === "ArrowLeft") {

                previousPhoto();

            }

        }
    );


    /* =========================================
       SWIPE
    ========================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    lightbox.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    lightbox.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchStartX - touchEndX;


            if (Math.abs(difference) < 50) {
                return;
            }


            if (difference > 0) {

                nextPhoto();

            } else {

                previousPhoto();

            }

        },
        {
            passive: true
        }
    );

});

