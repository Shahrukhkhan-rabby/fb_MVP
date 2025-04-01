document.addEventListener("DOMContentLoaded", () => {
    const accountToggle = document.querySelector(".account-toggle");
    const accountMenu = document.querySelector(".account-menu");

    accountToggle.addEventListener("click", () => {
        accountMenu.style.display = accountMenu.style.display === "block" ? "none" : "block";
    });

    // Hide menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!accountToggle.contains(e.target) && !accountMenu.contains(e.target)) {
            accountMenu.style.display = "none";
        }
    });
});
