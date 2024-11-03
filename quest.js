var currentPoints = parseInt(localStorage.getItem('currentPoints')) || 0; // Load accumulated points from localStorage
var currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1; // Load current level from localStorage
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

    
        // console.log(`Quest Name: ${quest.name}, Category: ${quest.category}`); // This should show the correct category

        
        var diamondContainer = document.createElement('div');
        diamondContainer.className = 'diamond-container';

        var diamond = document.createElement('img');
        diamond.className = 'quest-diamond';
        diamond.src = 'yellow-diamond-precious-stone-or-gem-vector.png'; // Path to your image
        diamond.alt = 'Quest Icon';

        diamondContainer.appendChild(diamond);
        listItem.appendChild(diamondContainer);

        // Quest details container styled as a pop-up
        var questDetails = document.createElement('div');
        questDetails.className = 'quest-details';

        var questName = document.createElement('h3');
        questName.className = 'quest-name';
        questName.textContent = quest.name;

        var questPoints = document.createElement('p');
        questPoints.textContent = `Points: ${quest.points}`;

        var questInfo = document.createElement('p');
        questInfo.textContent = quest.info;

        // Buttons
        var uploadButton = document.createElement('button');
        uploadButton.textContent = 'Upload Picture';

        var markCompletedButton = document.createElement('button');
        markCompletedButton.textContent = 'Mark as Completed';
        markCompletedButton.onclick = function() {
            completeQuest(quest);
        };

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove from Quest';
        removeButton.onclick = function() {
            removeFromQuest(quest.id);
        };

        // Append details and buttons to questDetails container
        questDetails.appendChild(questName);
        questDetails.appendChild(questPoints);
        questDetails.appendChild(questInfo);
        questDetails.appendChild(uploadButton);
        questDetails.appendChild(markCompletedButton);
        questDetails.appendChild(removeButton);

        listItem.appendChild(questDetails);

        questList.appendChild(listItem);
    });
}

function completeQuest(quest) {
    var quests = JSON.parse(localStorage.getItem('quests')) || [];
    quests = quests.filter(q => q.id !== quest.id); // Remove from quest list
    localStorage.setItem('quests', JSON.stringify(quests));

    updateProgress(quest.points); // Update progress bar and level
    loadQuests(); // Reload quests
}

function updateProgress(points) {
    currentPoints += points;
    var progressPercent = (currentPoints % pointsPerLevel) / pointsPerLevel * 100;
    document.getElementById('progress-bar').style.width = progressPercent + '%';

    // Update level if points exceed pointsPerLevel
    if (currentPoints >= currentLevel * pointsPerLevel) {
        currentLevel++;
        document.getElementById('current-level').textContent = "Level " + currentLevel;
    }
    localStorage.setItem('currentPoints', currentPoints);
    localStorage.setItem('currentLevel', currentLevel);
}

// Function to filter quests by category
function filterQuests(category) {
    var filterCategory = category === 'All' ? null : category;
    loadQuests(filterCategory);
    
}

function removeFromQuest(id) {
    var quests = JSON.parse(localStorage.getItem('quests')) || [];
    quests = quests.filter(quest => quest.id !== id);
    localStorage.setItem('quests', JSON.stringify(quests));
    loadQuests();
}

// Load quests and initialize progress on page load
window.onload = function() {
    loadQuests();
    document.getElementById('current-level').textContent = "Level " + currentLevel;
    var progressPercent = (currentPoints % pointsPerLevel) / pointsPerLevel * 100;
    document.getElementById('progress-bar').style.width = progressPercent + '%';
};

