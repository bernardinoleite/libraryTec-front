








class Projects {

    constructor() {
        this.containerCards = document.querySelector(".containerCards")
        this.handler()
    }

    async handler() {


        const token = localStorage.getItem("token")

        const request = await fetch(config.routerNewProject, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const projects = await request.json()

        projects.forEach(project => {

            const card = `


<div class="cardProject">
<div class="boxTema">
    <!-- <div class="iconGuardar">
        <div class="icon">
            <img src="#" alt="">
        </div>
    </div> -->
    <h5>${project.subject}</h5>
    <p class="descricao">
       ${project.description}
    </p>
  
    <div class="data">
        <p>${project.grade_defense} Valores Alcançados</p>
        <p>${project.date_defense}</p>
    </div>
</div>
<div class="footerCard">
   <button onclick="openProject('${project.id}', '${project.file_path}')">Abrir Projeto</button>
</div>
</div>

`
            this.containerCards.innerHTML += card

        });


    }


}

function openProject(projectId, filePath) {
    // Salva o ID no localStorage
    localStorage.setItem('idProject', projectId);

    // Abre o arquivo do projeto em uma nova aba
    window.open("../openPdf.html", '_blank');
}

new Projects()