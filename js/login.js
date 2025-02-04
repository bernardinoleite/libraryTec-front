

class Auth {

    constructor() {
        this.form = document.querySelector("main form")
        this.getData()
    }

    async sendData(data) {

        console.log(config)
        const request = await fetch(config.routerAuthPost, {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const response = await request.json()
        console.log(response);

        if (response.token) {
            localStorage.setItem("token", response.token)
            localStorage.setItem("user", JSON.stringify(response.user))
            location.href = "./painel.html"
        }
        else if (response.statusCode == 400) {
            alert(response.message)
        }
        else if (response.statusCode == 401) {
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
                    alert(`preencha todos os campos`)
                    return
                }
            }

            this.sendData(data)

        })
    }
}


new Auth()
