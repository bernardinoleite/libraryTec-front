


class NewProject {

    constructor() {
        this.form = document.querySelector("#form")
        this.handler()
    }

    async handler() {
        this.form.addEventListener("submit", async (e) => {
            e.preventDefault()

            const formData = new FormData(e.target)
            const datas = Object.fromEntries(formData)

            for (let data in datas) {

                if (!datas[data]) {
                    alert("É necessario preencher todos campos")
                    return
                }

            }

            const token = localStorage.getItem("token")

            const request = await fetch(config.routerNewProject, {
                method: "POST",
                body: JSON.stringify(datas),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })


            const response = await request.json()

            if (response.id) {
                alert("Projecto cadastrado com sucesso")
                e.target.reset()
            }


        })
    }

}



new NewProject()