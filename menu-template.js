// Menu template for Python Learning Course
// This file contains the navigation menu that gets injected into all lesson pages

function createMenuTemplate(currentLesson = '') {
    return `
        <div class="sidebar-header">
            <h2>🐍 Python Course</h2>
            <a href="index.html">← Back to Course</a>
        </div>
        <nav class="sidebar-nav">
            <a href="lesson1.html" class="lesson-link ${currentLesson === 'lesson1' ? 'active' : ''}">
                <div class="lesson-number">1</div>
                <span>Running Python Online & Printing</span>
            </a>
            <a href="lesson2.html" class="lesson-link ${currentLesson === 'lesson2' ? 'active' : ''}">
                <div class="lesson-number">2</div>
                <span>Variables and Data Types</span>
            </a>
            <a href="lesson3.html" class="lesson-link ${currentLesson === 'lesson3' ? 'active' : ''}">
                <div class="lesson-number">3</div>
                <span>Basic Arithmetic</span>
            </a>
            <a href="lesson4.html" class="lesson-link ${currentLesson === 'lesson4' ? 'active' : ''}">
                <div class="lesson-number">4</div>
                <span>String Manipulation</span>
            </a>
            <a href="lesson5.html" class="lesson-link ${currentLesson === 'lesson5' ? 'active' : ''}">
                <div class="lesson-number">5</div>
                <span>Input from User</span>
            </a>
            <a href="lesson6.html" class="lesson-link ${currentLesson === 'lesson6' ? 'active' : ''}">
                <div class="lesson-number">6</div>
                <span>Conditions and If-Else</span>
            </a>
            <a href="lesson7.html" class="lesson-link ${currentLesson === 'lesson7' ? 'active' : ''}">
                <div class="lesson-number">7</div>
                <span>Python Adventure Generator</span>
            </a>
            <a href="lesson8.html" class="lesson-link ${currentLesson === 'lesson8' ? 'active' : ''}">
                <div class="lesson-number">8</div>
                <span>Lists</span>
            </a>
            <a href="lesson9.html" class="lesson-link ${currentLesson === 'lesson9' ? 'active' : ''}">
                <div class="lesson-number">9</div>
                <span>Loops</span>
            </a>
            <a href="lesson10.html" class="lesson-link ${currentLesson === 'lesson10' ? 'active' : ''}">
                <div class="lesson-number">10</div>
                <span>Dictionaries</span>
            </a>
            <a href="lesson11.html" class="lesson-link ${currentLesson === 'lesson11' ? 'active' : ''}">
                <div class="lesson-number">11</div>
                <span>Functions</span>
            </a>
            <a href="lesson12.html" class="lesson-link ${currentLesson === 'lesson12' ? 'active' : ''}">
                <div class="lesson-number">12</div>
                <span>Simple Error Handling</span>
            </a>
            <a href="lesson13.html" class="lesson-link ${currentLesson === 'lesson13' ? 'active' : ''}">
                <div class="lesson-number">13</div>
                <span>Python RPG Builder</span>
            </a>
            <a href="lesson14.html" class="lesson-link ${currentLesson === 'lesson14' ? 'active' : ''}">
                <div class="lesson-number">14</div>
                <span>Classes and Objects</span>
            </a>
            <a href="lesson15.html" class="lesson-link ${currentLesson === 'lesson15' ? 'active' : ''}">
                <div class="lesson-number">15</div>
                <span>Data Structures</span>
            </a>
            <a href="lesson16.html" class="lesson-link ${currentLesson === 'lesson16' ? 'active' : ''}">
                <div class="lesson-number">16</div>
                <span>Algorithms</span>
            </a>
            <a href="lesson17.html" class="lesson-link ${currentLesson === 'lesson17' ? 'active' : ''}">
                <div class="lesson-number">17</div>
                <span>Advanced Review Project</span>
            </a>
            <a href="lesson18.html" class="lesson-link ${currentLesson === 'lesson18' ? 'active' : ''}">
                <div class="lesson-number">18</div>
                <span>Final Capstone Project</span>
            </a>
        </nav>
    `;
}

// Function to save sidebar scroll position
function saveSidebarScrollPosition() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        localStorage.setItem('pythonCourse_sidebarScrollTop', sidebar.scrollTop);
    }
}

// Function to restore sidebar scroll position
function restoreSidebarScrollPosition() {
    const sidebar = document.querySelector('.sidebar');
    const savedScrollTop = localStorage.getItem('pythonCourse_sidebarScrollTop');
    
    if (sidebar && savedScrollTop) {
        sidebar.scrollTop = parseInt(savedScrollTop, 10);
    }
}

// Function to add scroll position saving to menu links
function addScrollPositionHandlers() {
    const menuLinks = document.querySelectorAll('.sidebar .lesson-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Save scroll position before navigating
            saveSidebarScrollPosition();
        });
    });
}

// Function to inject the menu into the current page
function injectMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        // Determine current lesson from URL
        const currentPage = window.location.pathname.split('/').pop().split('.')[0];
        const currentLesson = currentPage === 'index' ? 'index' : currentPage;
        
        // Replace sidebar content with template
        sidebar.innerHTML = createMenuTemplate(currentLesson);
        
        // Add scroll position handlers to menu links
        addScrollPositionHandlers();
        
        // Restore scroll position after a short delay to ensure content is rendered
        setTimeout(restoreSidebarScrollPosition, 100);
    }
}

// Auto-inject menu when DOM is loaded
document.addEventListener('DOMContentLoaded', injectMenu);

// Export functions for manual use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        createMenuTemplate, 
        injectMenu, 
        saveSidebarScrollPosition, 
        restoreSidebarScrollPosition 
    };
} 