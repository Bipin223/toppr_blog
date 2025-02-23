// Subject data for each semester
const semesterSubjects = {
    1: [
        {
            name: "Computer Fundamentals & Applications",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Digital Logic",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Mathematics I",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "English",
            materials: ["Notes", "Question Bank"]
        }
    ],
    2: [
        {
            name: "C Programming",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Financial Accounting",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Mathematics II",
            materials: ["Notes", "Question Bank"]
        }
    ],
    3: [
        {
            name: "Data Structures",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "OOP using C++",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Database Management System",
            materials: ["Notes", "Question Bank"]
        }
    ],
    4: [
        {
            name: "Operating System",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Computer Networks",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Computer Architecture",
            materials: ["Notes", "Question Bank"]
        }
    ],
    5: [
        {
            name: "Java Programming",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Web Technology",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Software Engineering",
            materials: ["Notes", "Question Bank"]
        }
    ],
    6: [
        {
            name: "Mobile Application Development",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Advanced Web Technology",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Project Work",
            materials: ["Notes", "Guidelines"]
        }
    ],
    7: [
        {
            name: "Cyber Security",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Cloud Computing",
            materials: ["Notes", "Question Bank"]
        },
        {
            name: "Advanced Java",
            materials: ["Notes", "Question Bank"]
        }
    ],
    8: [
        {
            name: "Final Project",
            materials: ["Guidelines", "Documentation"]
        },
        {
            name: "Internship",
            materials: ["Guidelines", "Report Format"]
        }
    ]
};

// Function to render subjects for a semester
function renderSubjects(semester) {
    const contentArea = document.querySelector('.content-area');
    const subjects = semesterSubjects[semester];
    
    let html = `
        <div class="subjects-grid">
            ${subjects.map(subject => `
                <div class="subject-card">
                    <h3>${subject.name}</h3>
                    <div class="materials">
                        ${subject.materials.map(material => `
                            <button class="material-btn">
                                ${material}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    contentArea.innerHTML = html;
}

// Event listeners for tab switching
document.addEventListener('DOMContentLoaded', () => {
    // Show first semester subjects by default
    renderSubjects(1);
    
    // Add click event listeners to all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            // Render subjects for selected semester
            const semester = tab.getAttribute('data-semester');
            renderSubjects(parseInt(semester));
        });
    });
    
    // Search functionality
    const searchBar = document.querySelector('.search-bar');
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const allSubjects = [];
        
        // Collect all subjects that match the search term
        Object.entries(semesterSubjects).forEach(([semester, subjects]) => {
            subjects.forEach(subject => {
                if (subject.name.toLowerCase().includes(searchTerm)) {
                    allSubjects.push({
                        ...subject,
                        semester: semester
                    });
                }
            });
        });
        
        // If search term exists, show filtered results
        if (searchTerm) {
            const contentArea = document.querySelector('.content-area');
            let html = `
                <div class="subjects-grid">
                    ${allSubjects.map(subject => `
                        <div class="subject-card">
                            <h3>${subject.name}</h3>
                            <p class="semester-tag">Semester ${subject.semester}</p>
                            <div class="materials">
                                ${subject.materials.map(material => `
                                    <button class="material-btn">
                                        ${material}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            contentArea.innerHTML = html;
        } else {
            // If search term is empty, show current semester
            const activeSemester = document.querySelector('.tab.active').getAttribute('data-semester');
            renderSubjects(parseInt(activeSemester));
        }
    });
}); 