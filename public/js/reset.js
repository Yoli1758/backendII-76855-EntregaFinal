const token = document.body.dataset.token;
const form = document.getElementById("resetForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    message.textContent = "";

    if (!newPassword || !confirmPassword) {
        message.textContent = "⚠️ Debes completar ambos campos.";
        return;
    }

    if (newPassword !== confirmPassword) {
        message.textContent = "❌ Las contraseñas no coinciden.";
        return;
    }

    try {
        const res = await fetch(`/auth/reset_password/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPassword }),
        });

        const data = await res.json();

        if (res.ok) {
            message.style.color = "green";
            message.textContent = "✅ Contraseña actualizada correctamente. Redirigiendo al login...";
            setTimeout(() => {
                window.location.href = "/login";
            }, 3000);
        } else {
            message.textContent = data.error || "Error al actualizar la contraseña.";
        }
    } catch (err) {
        message.textContent = "Error de conexión con el servidor.";
    }
});