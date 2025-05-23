        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('skill-form');
            const input = document.getElementById('skill-input');
            const list = document.getElementById('skill-list');
            const progressBar = document.getElementById('progress-bar');
            const progressPercent = document.getElementById('progress-percent');
            
            // Load skills from localStorage or initialize empty array
            let skills = JSON.parse(localStorage.getItem('skills')) || [];
            
            // Update progress display
            function updateProgress() {
                const total = skills.length;
                const done = skills.filter(skill => skill.done).length;
                const percent = total ? Math.round((done / total) * 100) : 0;
                
                progressBar.style.width = `${percent}%`;
                progressPercent.textContent = `${percent}%`;
                
                // Change color based on progress
                if (percent < 30) {
                    progressBar.style.background = 'linear-gradient(90deg, #ef4444, #f87171)';
                } else if (percent < 70) {
                    progressBar.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
                } else {
                    progressBar.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
                }
            }
            
            // Save skills to localStorage
            function saveSkills() {
                localStorage.setItem('skills', JSON.stringify(skills));
                updateProgress();
            }
            
            // Render skills list
            function renderSkills() {
                if (skills.length === 0) {
                    list.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-book-open"></i>
                            <h3>No skills yet</h3>
                            <p>Add your first skill to get started!</p>
                        </div>
                    `;
                    return;
                }
                
                list.innerHTML = '';
                skills.forEach((skill, index) => {
                    const li = document.createElement('li');
                    li.className = 'skill-item';
                    li.innerHTML = `
                        <input type="checkbox" class="skill-checkbox" ${skill.done ? 'checked' : ''} data-index="${index}">
                        <span class="skill-name">${skill.name}</span>
                        <button class="delete-btn" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                    list.appendChild(li);
                });
            }
            
            // Handle checkbox changes
            list.addEventListener('change', function(e) {
                if (e.target.classList.contains('skill-checkbox')) {
                    const index = e.target.dataset.index;
                    skills[index].done = e.target.checked;
                    saveSkills();
                    
                    // Add a little animation when checking
                    if (e.target.checked) {
                        e.target.parentElement.style.transform = 'scale(1.02)';
                        setTimeout(() => {
                            e.target.parentElement.style.transform = '';
                        }, 200);
                    }
                }
            });
            
            // Handle delete button clicks
            list.addEventListener('click', function(e) {
                if (e.target.closest('.delete-btn')) {
                    const index = e.target.closest('.delete-btn').dataset.index;
                    const item = e.target.closest('.skill-item');
                    
                    // Add removal animation
                    item.classList.add('removing');
                    
                    // Remove after animation completes
                    setTimeout(() => {
                        skills.splice(index, 1);
                        saveSkills();
                        renderSkills();
                    }, 300);
                }
            });
            
            // Handle form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const newSkill = input.value.trim();
                
                if (newSkill) {
                    // Add new skill with animation
                    skills.push({ name: newSkill, done: false });
                    input.value = '';
                    saveSkills();
                    renderSkills();
                    
                    // Scroll to the new item
                    setTimeout(() => {
                        const lastItem = list.lastChild;
                        if (lastItem) {
                            lastItem.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                }
            });
            
            // Initial render
            renderSkills();
            updateProgress();
            
            // Focus the input field on page load
            input.focus();
        });