document.addEventListener("DOMContentLoaded", () => {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");


    if (!menuToggle || !mobileMenu) {
        return;
    }


    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                menuToggle.classList.toggle(
                    "active"
                );


            mobileMenu.classList.toggle(
                "active"
            );


            document.body.classList.toggle(
                "menu-open",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    const links =
        mobileMenu.querySelectorAll("a");


    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                menuToggle.classList.remove(
                    "active"
                );


                mobileMenu.classList.remove(
                    "active"
                );


                document.body.classList.remove(
                    "menu-open"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });

});

