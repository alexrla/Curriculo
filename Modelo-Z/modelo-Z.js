// Constantes
const fields = document.querySelectorAll("input, textarea");
const btnGenerate = document.querySelector("#generate-pdf");
const btnClear = document.querySelector("#clear-storage");
const sections = {
    academic: document.querySelector("#academic-background-container"),
    experiences: document.querySelector("#experiences-container"),
    language: document.querySelector("#languages-container"),
    info: document.querySelector("#info-container")
};
const btns = document.querySelectorAll(".add-btn");

// Carregando valores do localStorage
fields.forEach(field => {
    const saved = localStorage.getItem(field.name);
    if (saved) field.value = saved;

    // Salvando automaticamente ao digitar
    field.addEventListener("input", () => {
        localStorage.setItem(field.name, field.value);
    });
});

// Campos para adicionar informações: experiências, idiomas, etc.
const templates = {
    academic: () => {
        const ul = document.createElement("ul");

        ul.classList.add("block");
        
        ul.innerHTML = `
            <li>
                    <input 
                        type="text" 
                        name="educational-institution" 
                        placeholder="[Nome da instituição, Cidade, Estado]"
                    >
            </li>
             <ul>
                <li>
                    <input 
                        type="text" 
                        name="course" 
                        placeholder="[Curso | Data de início - Data de conclusão]"
                    >
                </li>
            </ul>
        `;

        return ul;
    },

    experiences: () => {
        const div = document.createElement("div");

        div.innerHTML = `
            <input 
                type="text"
                name="entry-&-exit-date"
                placeholder="Data de admissão - Data de saída"
            >
            <input 
                type="text" 
                name="position-company-city"
                placeholder="Cargo | Empresa | Cidade"
            >
            <textarea 
                name="experience-description" 
                placeholder="Descreva as atividades desempenhadas e as principais realizações"
            ></textarea>
        `;

        return div;
    },

    language: () => {
        const li = document.createElement("li");
        
        li.innerHTML = `
            <input 
                type="text" 
                placeholder="Língua (Nível de proficiência)"
            >
        `;

        return li;
    },

    info: () => {
        const li = document.createElement("li");
        
        li.innerHTML = `
            <input
                name="other-info" 
                placeholder="Prêmios, Trabalho Voluntário, Intercâmbio..."
            >
        `;

        return li;
    }
};


// Botões de adicionar
btns.forEach(btn => {
    btn.addEventListener("click", () => {
        const section = btn.dataset.section;

        const element = templates[section]();

        // Atribuindo nomes únicos para localStorage
        element.querySelectorAll("input, textarea").forEach((field, i) => {
            const uniqueName = `${section}-${Date.now()}-${i}`;

            field.name = uniqueName;

            const saved = localStorage.getItem(uniqueName);

            if (saved) field.value = saved;

            field.addEventListener("input", () => {
                localStorage.setItem(uniqueName, field.value);
            });
        });

        sections[section].appendChild(element);
        });
});

// Geração de PDF
btnGenerate.addEventListener("click", (event) => {
    event.preventDefault();

    const buttons = document.querySelectorAll("button");
    
    buttons.forEach(button => {
        button.classList.add("none");
    })

    window.print();

    buttons.forEach(button => {
        button.classList.remove("none");
    })
});

// Limpar dados
btnClear.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});
