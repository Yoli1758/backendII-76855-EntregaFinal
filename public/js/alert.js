document.addEventListener("DOMContentLoaded", () => {
    function showAlert({ icon, title, text, timer = 3000, redirectUrl = null }) {
        Swal.fire({
            icon,
            title,
            text,
            timer,
            showConfirmButton: false,
            willClose: () => {
                if (redirectUrl) window.location.href = redirectUrl;
            }
        });
    }

    if (typeof ALERT_DATA !== "undefined") {
        showAlert(ALERT_DATA);
    }
});



