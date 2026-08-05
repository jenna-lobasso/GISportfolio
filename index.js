fetch("projects.json")

.then(response => response.json())

.then(projects => {


const container =
document.getElementById("project-container");


projects.forEach(project => {


let tags = project.tools.map(
tool => `<span class="tag">${tool}</span>`
).join("");



container.innerHTML += `


<div class="project-card">


<img src="${project.image}">


<h3>
${project.title}
</h3>


<p>
${project.description}
</p>


<div>
${tags}
</div>


<a class="button" href="${project.link}">
OPEN FILE
</a>


</div>


`;


});


});
