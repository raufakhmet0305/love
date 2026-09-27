document.addEventListener("DOMContentLoaded", () => {

    const startDate =
        new Date("2026-03-06T00:00:00");


    const daysElement =
        document.getElementById("counterDays");

    const hoursElement =
        document.getElementById("counterHours");

    const minutesElement =
        document.getElementById("counterMinutes");

    const secondsElement =
        document.getElementById("counterSeconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }


    function formatNumber(number) {

        return String(number).padStart(2, "0");

    }


    function updateCounter() {

        const now = new Date();

        const difference =
            now.getTime() -
            startDate.getTime();


        if (difference < 0) {
            return;
        }


        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        const days =
            Math.floor(
                totalSeconds / 86400
            );


        const hours =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );


        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        const seconds =
            totalSeconds % 60;


        daysElement.textContent =
            days;


        hoursElement.textContent =
            formatNumber(hours);


        minutesElement.textContent =
            formatNumber(minutes);


        secondsElement.textContent =
            formatNumber(seconds);

    }


    updateCounter();


    setInterval(
        updateCounter,
        1000
    );

});

