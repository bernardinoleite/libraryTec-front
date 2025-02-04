class CreateSubject {
    constructor() {
        this.getDataForm()
    }


    requestApi(data) { // falta pegar o token
        fetch("http://localhost:2908/subjects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer token"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(console.log)
    }

    getDataForm() {
        const formSubject = document.querySelector(".formSubject")

        formSubject.addEventListener("submit", (e) => {
            e.preventDefault()


            const formData = new FormData(e.target)
            const data = Object.fromEntries(formData)

            try {
                this.requestApi(data)
                alert("Criado com sucesso")
                e.target.reset()
            } catch (error) {
                console.log(error);

                alert("Erro, tente novamente")
            }
        })
    }




}



new CreateSubject()