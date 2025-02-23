


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
            const fileForm = new FormData();
            fileForm.append("file", e.target[7].files[0]); // Apenas adiciona ao FormData

            const responseUrl = await fetch(config.routerProjectUpload, {
                method: "POST",
                body: fileForm, // Passa o FormData corretamente
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const url = await responseUrl.json()
            datas.file_path = url.url
            console.log(datas)
            const request = await fetch(config.routerNewProject, {
                method: "POST",
                body: JSON.stringify(datas),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })


            const response = await request.json()
            console.log(response);

            if (response.id) {
                alert("Projecto cadastrado com sucesso")
                e.target.reset()
            }


        })
    }

}



new NewProject()