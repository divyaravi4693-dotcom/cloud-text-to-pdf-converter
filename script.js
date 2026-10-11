document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const textarea = document.querySelector("textarea");
    const button = document.querySelector("button");

    // Character Counter
    const counter = document.createElement("p");
    counter.className = "counter";
    counter.innerText = "0 Characters";
    textarea.parentNode.insertBefore(counter, button);

    textarea.addEventListener("input", () => {
        counter.innerText = textarea.value.length + " Characters";
    });

    // Loading Effect
    form.addEventListener("submit", () => {

        button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Creating PDF...';

        button.disabled = true;

    });

});