class Subjects {
    constructor() {
        this.requestApi();
        this.getDataForm();
        this.setupModal();
    }

    getDataForm() {
        const inputsFilter = document.querySelector(".inputsFilter");
        inputsFilter.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            let query = `/?`;
            if (data.category) query += `category=${data.category}`;
            if (data.creator) query += `&creator=${data.creator}`;
            if (data.created_at) query += `&created_at=${data.created_at}`;
            this.requestApiFilter(query);
        });
    }

    requestApiFilter(query) {
        fetch("http://localhost:2908/subjects/filter" + query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer token"
            },
        })
            .then(response => response.json())
            .then(result => this.display(result))
            .catch(console.log);
    }

=requestApi() {
        fetch("http://localhost:2908/subjects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer token"
            },
        })
            .then(response => response.json())
            .then(result => this.display(result))
            .catch(console.log);
    }

    display(datas) {
        const sectionTemas = document.querySelector(".sectionTemas");
        sectionTemas.innerHTML = "";
        datas.forEach(data => {
            const cardHtml = `
            <div class="eachTemas">
                <h3>${data.subject}</h3>
                <p>${data.description}</p>
            </div>
        `;
            sectionTemas.innerHTML += cardHtml;
        });
        this.setupModal(); // Reaplicar eventos após atualizar os cartões
    }

    setupModal() {
        const eachTemas = document.querySelectorAll('.eachTemas');
        const modalOverlay = document.getElementById('modal');
        const modalClose = document.getElementById('modalClose');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');

        eachTemas.forEach((e) => {
            e.addEventListener("click", (event) => {
                const tema = event.currentTarget;
                modalTitle.textContent = tema.querySelector('h3').textContent;
                modalDescription.textContent = tema.querySelector('p').textContent;
                // Preencher outros campos conforme necessário
                modalOverlay.classList.remove("hide");
            });
        });

        modalClose.addEventListener("click", () => {
            modalOverlay.classList.add("hide");
        });

        window.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.add("hide");
            }
        });
    }
}

new Subjects();