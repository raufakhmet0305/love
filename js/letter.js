document.addEventListener("DOMContentLoaded", () => {

    const envelopeWrapper =
        document.getElementById("envelopeWrapper");

    const envelope =
        document.getElementById("envelope");

    const actualLetter =
        document.getElementById("actualLetter");


    if (
        !envelopeWrapper ||
        !envelope ||
        !actualLetter
    ) {
        return;
    }


    let opened = false;


    envelope.addEventListener("click", () => {

        if (opened) return;

        opened = true;

        envelopeWrapper.classList.add("open");


        setTimeout(() => {

            actualLetter.classList.add("visible");

            setTimeout(() => {

                actualLetter.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 300);

        }, 1000);

    });

});

