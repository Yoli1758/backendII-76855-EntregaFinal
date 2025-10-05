const forgotLink = document.getElementById("forgotPasswordLink");
const emailInput = document.getElementById("emailInput");
const message = document.getElementById("message");

emailInput.addEventListener("input", () => {
    if ( message.textContent !== "") {
        emailInput.classList.remove("input-error");
        message.textContent = "";
        message.className = "";
    }
});


forgotLink.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    
    if (!email) {
        emailInput.classList.add("input-error");
        message.textContent = "⚠️ Ingresá tu correo para recuperar la contraseña.";
        message.className = "error";
        return;
    }

    
    emailInput.classList.remove("input-error");
    message.textContent = "";
    message.className = "";

    try {
        const res = await fetch("/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
            message.textContent = "✅ Correo enviado correctamente.";
            message.className = "success";

            setTimeout(() => {
            message.classList.add("hidden");
            setTimeout(() => {
              message.textContent = "";
              message.className = "";
            }, 300); 
          }, 5000);

        } else {
            message.textContent = "❌ No se pudo enviar el correo.";
            message.className = "error";
        }
    } catch (err) {
        message.textContent = "❌ Error del servidor, intentá más tarde.";
        message.className = "error";
    }
});