class Auth {
    constructor() {
        this.form = document.querySelector("#signin-form");
        if (!this.form) {
            console.error("Formulário de login não encontrado.");
            return;
        }
        this.getData();
    }

    showError(message) {
        const existingError = this.form.querySelector(".error-message");
        if (existingError) existingError.remove();

        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.textContent = message;
        this.form.prepend(errorDiv);

        setTimeout(() => {
            if (errorDiv.parentElement) errorDiv.remove();
        }, 5000);
    }

    async sendData(data) {
        if (!config?.routerAuthPost) {
            console.error("Configuração de autenticação não encontrada.");
            this.showError("Erro de configuração. Contate o suporte.");
            return;
        }

        try {
            const request = await fetch(config.routerAuthPost, {
                body: JSON.stringify(data),
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const response = await request.json();


            if (response.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                const redirectUrl = response.user?.role ? "./painel.html" : "./client/home.html";
                location.href = redirectUrl;
            } else {
                this.showError(response.message || "Erro ao fazer login.");
            }
        } catch (error) {
            this.showError("Falha na conexão. Tente novamente.");
        }
    }

    getData() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            // Validação de email
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
            if (!emailRegex.test(data.email)) {
                this.showError("Por favor, insira um email válido.");
                return;
            }

            // Validação de senha
            if (data.password.length < 8) {
                this.showError("A senha deve ter pelo menos 8 caracteres.");
                return;
            }

            // Sanitização básica
            const sanitize = (str) => str.replace(/[<>"'&]/g, "");
            const sanitizedData = {
                email: sanitize(data.email),
                password: sanitize(data.password),
            };

            this.sendData(sanitizedData);
        });
    }
}

new Auth();
