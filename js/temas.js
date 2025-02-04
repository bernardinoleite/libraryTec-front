
class Subjects {

    constructor() {
        this.requestApi()
        this.getDataForm()
    }


    getDataForm() {
        const inputsFilter = document.querySelector(".inputsFilter")

        inputsFilter.addEventListener("submit", (e) => {
            e.preventDefault()


            const formData = new FormData(e.target)
            const data = Object.fromEntries(formData)

            let query = `/?`
            if (data.category) {
                query += `category=${data.category}`
            }
            if (data.creator) {
                query += `&creator=${data.creator}`
            }
            if (data.created_at) {
                query += `&created_at${data.created_at}`
            }


            this.requestApiFilter(query)


        })
    }

    requestApiFilter(query) { //falta o token

        fetch("http://localhost:2908/subjects/filter" + query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer token"
            },

        })
            .then(response => response.json())
            .then(result => this.display(result))
            .catch(console.log)
    }




    requestApi() { // falta o token
        fetch("http://localhost:2908/subjects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer token"
            },

        })
            .then(response => response.json())
            .then(result => this.display(result))
            .catch(console.log)
    }

    display(datas) {
        const sectionTemas = document.querySelector(".sectionTemas")
        sectionTemas.innerHTML = ""


        datas.forEach(data => {
            const cardHtml = `
            <div class="eachTemas">
                    <div class="bolaAnimada">

                    </div>

                    <h3>${data.subject}</h3>
                    <p>${data.description}</p>
                </div>
           
           `
            sectionTemas.innerHTML += cardHtml
            console.log(data);

        })

    }
}

new Subjects();


























const eachTemas = document.querySelectorAll('.eachTemas')
const modal = document.querySelector('.modal')
const closebtn = document.querySelector('.close-btn')


eachTemas.forEach((e) => {
    e.addEventListener("click", (even) => {
        modal.classList.remove("hide")
    })
})

closebtn.addEventListener("click", () => {
    modal.classList.add("hide")
})
