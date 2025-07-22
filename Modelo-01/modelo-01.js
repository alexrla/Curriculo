const btn = document.querySelector("#btn");

btn.addEventListener("click", (event) => {
    event.preventDefault();

    btn.classList.add("none");

    window.print();

    btn.classList.remove("none");
});
