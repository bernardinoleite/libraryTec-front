class CreateAccount {
    constructor() {
        this.form = document.querySelector("#signup-form");
        this.getData();
    }

    showError(message) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.textContent = message;
        this.form.prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }

    async sendData(data) {
        if (!config?.routerUserPost) {
            console.error("Configuração de autenticação não encontrada.");
            this.showError("Erro de configuração. Contate o suporte.");
            return;
        }

        try {
            const request = await fetch(config.routerUserPost, {
                body: JSON.stringify(data),
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const response = await request.json();

            if (response.statusCode === 201) {
                this.showError("Conta criada com sucesso!");
                setTimeout(() => {
                    location.href = "./login.html";
                }, 2000);
            } else {
                this.showError(response.message || "Erro ao criar conta.");
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

            // Validação de campos vazios
            for (const input in data) {
                if (!data[input]) {
                    this.showError("Preencha todos os campos.");
                    return;
                }
            }

            // Validação de nome
            if (data.name.length < 2) {
                this.showError("O nome deve ter pelo menos 2 caracteres.");
                return;
            }

            // Validação de email
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
            if (!emailRegex.test(data.email)) {
                this.showError("Insira um email válido.");
                return;
            }

            // Validação de senha
            if (data.password.length < 8) {
                this.showError("A senha deve ter pelo menos 8 caracteres.");
                return;
            }

            // Validação de confirmação de senha
            if (data.password !== data.confirmPassword) {
                this.showError("As senhas não coincidem.");
                return;
            }

            // Sanitização básica
            const sanitize = (str) => str.replace(/[<>"'&]/g, "");
            const sanitizedData = {
                name: sanitize(data.name),
                email: sanitize(data.email),
                password: sanitize(data.password),
                confirmPassword: sanitize(data.confirmPassword),
            };

            this.sendData(sanitizedData);
        });
    }
}

new CreateAccount();