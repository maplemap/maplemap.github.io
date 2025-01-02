'use strict';

const projects = [
    {
        title: 'Whale Creative Agency',
        description: 'Page for web-design studio',
        links: {
            source: 'https://github.com/maplemap/whale-creative-agency-page',
            demo: 'https://maplemap.github.io/whale-creative-agency-page/',
        },
        technologies: {
            main: 'React',
            stack: ['HTML', 'CSS', 'React']
        },
        year: 2016,
    },
    {
        title: 'Weather Angular application',
        description: 'Angular5/Angular-CLI application for receiving actual forecast from openweathermap.org API',
        links: {
            source: 'https://github.com/maplemap/weather-app-angular',
            demo: 'https://maplemap.github.io/weather-app-angular/London'
        },
        technologies: {
            main: 'Angular',
            stack: ['HTML', 'CSS', 'Typescript', 'Angular']
        },
        year: 2017,
    },
    {
        title: 'Weather React application',
        description: 'React application for receiving actual forecast from openweathermap.org API',
        links: {
            source: 'https://github.com/maplemap/weather-app-react',
            demo: 'https://maplemap.github.io/weather-app-react/'
        },
        technologies: {
            main: 'React',
            stack: ['HTML', 'CSS', 'React', 'Typescript']
        },
        year: 2024,
    }
]

document.addEventListener("DOMContentLoaded", function() {
    class Portfolio {
        constructor(projects) {
            this.projects = projects;
            this.filterValue = [];
            this.filteredProjects = projects;
        }

        init() {
            this.renderExperienceYears();
            this.renderTechnologiesLabels();
            this.renderCopyright();
            this.renderProjects();
        }

        setFilterValue(value) {
            this.filterValue = value;
            this.filteredProjects = this.projects.filter(({technologies}) => {
                return this.filterValue.every(technology => technologies.stack.includes(technology));
            });
            this.renderProjects();
        }

        renderCopyright() {
            const currentYear = new Date().getFullYear();
            document.querySelector(".copyright").textContent = `© ${currentYear}`;
        }

        renderExperienceYears() {
            const startDate = '08/2014';
            const currentDate = new Date();
            const [startMonth, startYear] = startDate.split('/').map(Number);
            const startDateObj = new Date(startYear, startMonth - 1);

            let experienceYears = currentDate.getFullYear() - startDateObj.getFullYear();
            const monthDifference = currentDate.getMonth() - startDateObj.getMonth();

            if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < startDateObj.getDate())) {
                experienceYears--;
            }
            document.getElementsByClassName("experience-years").textContent = ` with ${experienceYears} years of experience`;
        }

        renderTechnologiesLabels() {
            const technologies = new Set(this.projects.map(({technologies}) => technologies.stack).flat());
            const technologiesList = document.querySelector(".technologies");

            technologies.forEach(technology => {
                technologiesList.insertAdjacentHTML('beforeend', `<span class="technology">${technology}</span>`);
            });

            technologiesList.addEventListener('click', (event) => {
                event.target.classList.toggle('active');
                const activeTechnologies = Array.from(technologiesList.querySelectorAll('.active')).map(({textContent}) => textContent);
                this.setFilterValue(activeTechnologies);
            });
        }

        renderProjects() {
            const projectContainer = document.querySelector(".projects");
            const remapByYear = this.filteredProjects.reduce((acc, project) => {
                acc[project.year] = acc[project.year] || [];
                acc[project.year].push(project);
                return acc;
            }, {});
            const sortedByYear = Object
                .entries(remapByYear)
                .sort(([year1], [year2]) => year2 - year1)
                .map(([year, projects]) => ({year, projects}));
            let projectsHtml = '';

            if (sortedByYear.length > 0) {
                sortedByYear.forEach(({year, projects}) => {
                    const getProjectLinksHTML = (links) => `
                        <div class="project__links">
                            <strong>Links:</strong>
                            ${Object.keys(links)
                                .filter(key => links[key])
                                .map(key => `<a href="${links[key]}" target="_blank">${key}<i class="fa-solid fa-up-right-from-square"></i></a>`
                                ).join(', ')
                            }
                        </div>
                    `

                    projectsHtml += `
                        <div class="projects__container-by-year">
                            <div>${year}</div>
                            <div class="projects__list">
                                ${projects.map(({title, description, links, technologies}) => `
                                    <div class="project">
                                        <div class="project__title"><h2>${title}</h2></div>
                                        <div class="project__description">${description}</div>
                                        <div>
                                            <div class="project__technologies">
                                                <strong>Techologies:</strong>
                                                ${technologies.stack.join(', ')}
                                            </div>
                                            ${getProjectLinksHTML(links)}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `
                });
            } else {
                projectsHtml = 'No projects found';
            }

            projectContainer.innerHTML = projectsHtml;
        }
    }

    const portfolio = new Portfolio(projects);
    portfolio.init();
});