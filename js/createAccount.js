

class CreateAccount {

    constructor() {
        this.form = document.querySelector("main form")
        this.getData()
    }

    async sendData(data) {

        console.log(config)
        const request = await fetch(config.routerUserPost, {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const response = await request.json()
        if (response.statusCode == 201) {
            alert("Conta criada com sucesso")
            location.href = "./login.html"
        }
        else if (response.statusCode == 400) {
            alert(response.message)
        }
    }

    getData() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault()

            const formData = new FormData(e.target)
            const data = Object.fromEntries(formData)

            for (const input in data) {
                if (!data[input]) {
                    alert(`É obrigatorio preencher todos os campo `)
                    return
                }
            }
            if (!(data.password === data.confirmPassword)) {
                alert("O Campo Senha precisa ser igual ao Campo de confirmação de senha")
                return
            }

            this.sendData(data)

        })
    }
}


new CreateAccount()
