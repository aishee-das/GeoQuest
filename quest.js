var currentPoints = 0; // **Points accumulated so far**
var currentLevel = 1; // **Starting level**
const pointsPerLevel = 100; // **Points required to level up**

// Function to load quests from localStorage
function loadQuests(filterCategory = null) {
    var quests = JSON.parse(localStorage.getItem('quests')) || [];
    var questList = document.getElementById('quests');

    // Filter quests by category if filter is applied
    if (filterCategory) {
        quests = quests.filter(quest => quest.category === filterCategory);
    }

    // Clear existing list
    questList.innerHTML = '';

    if (quests.length === 0) {
        questList.innerHTML = '<li>You have no quests yet.</li>';
        return;
    }

    // Create list items for each quest
    quests.forEach(quest => {
        var listItem = document.createElement('li');
        listItem.className = 'quest-item'; // Add a class to style quest items
        listItem.onclick = function() { showQuestPopup(quest); }; // **Add click event to open popup**

        var diamond = document.createElement('div'); // Diamond shape
        diamond.className = 'quest-diamond';

        var questName = document.createElement('span'); // Quest name text
        questName.className = 'quest-name';
        questName.textContent = quest.name;

        listItem.appendChild(diamond);
        listItem.appendChild(questName);

        questList.appendChild(listItem);
    });
}

// Function to show quest details popup
function showQuestPopup(quest) {
    var popup = document.getElementById('quest-popup');
    popup.style.display = 'block';
    document.getElementById('popup-quest-name').textContent = quest.name;
    document.getElementById('popup-quest-points').textContent = quest.points;
    document.getElementById('popup-quest-info').textContent = quest.info;

    // Set up buttons
    document.getElementById('upload-picture').onclick = function() {
        // Upload picture functionality
    };
    document.getElementById('mark-completed').onclick = function() {
        completeQuest(quest);
        popup.style.display = 'none';
    };
    document.getElementById('remove-quest').onclick = function() {
        removeFromQuest(quest.id);
        popup.style.display = 'none';
    };
}

// Function to complete a quest
function completeQuest(quest) {
    var quests = JSON.parse(localStorage.getItem('quests')) || [];
    quests = quests.filter(q => q.id !== quest.id); // Remove from quest list
    localStorage.setItem('quests', JSON.stringify(quests));
    updateProgress(quest.points); // Update progress bar
    loadQuests();
}

// Function to update progress bar and handle levels
function updateProgress(points) {
    currentPoints += points;
    var progressPercent = (currentPoints % pointsPerLevel) / pointsPerLevel * 100;
    document.getElementById('progress-bar').style.width = progressPercent + '%';

    // Update level if points exceed pointsPerLevel
    if (currentPoints >= currentLevel * pointsPerLevel) {
        currentLevel++;
        document.getElementById('current-level').textContent = "Level " + currentLevel;
    }
}

// Function to filter quests by category
function filterQuests() {
    var filterCategory = document.getElementById('category-filter').value;
    loadQuests(filterCategory);
}

// Close popup function
function closePopup() {
    document.getElementById('quest-popup').style.display = 'none';
}

// Load quests and initialize progress on page load
window.onload = function() {
    loadQuests();
    document.getElementById('current-level').textContent = "Level " + currentLevel;
};
