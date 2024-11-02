var currentPoints = 0; // **Points accumulated so far**
var currentLevel = 1; // **Starting level**
const pointsPerLevel = 100; // **Points required to level up**

// Function to load quests from localStorage
function loadQuests(filterCategory = null) {
    var quests = JSON.parse(localStorage.getItem('quests')) || [];
    var questList = document.getElementById('quests');

    // var quests = [
    //     { id: 1, name: "Food Adventure", points: 30, category: "Food", info: "Try a new local dish." },
    //     { id: 2, name: "Mountain Hiking", points: 50, category: "Outdoors", info: "Hike up the mountain trail." },
    //     { id: 3, name: "Art Museum Visit", points: 20, category: "Culture", info: "Explore the art museum." },
    //     { id: 4, name: "Nightlife Experience", points: 40, category: "Nightlife", info: "Visit a popular club at night." },
    //     { id: 5, name: "Community Volunteering", points: 60, category: "Social", info: "Volunteer at a community event." }
    // ];

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

        // Diamond shape centered
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
function filterQuests(category) {
    var filterCategory = category === 'All' ? null : category;
    loadQuests(filterCategory);
}

// Load quests and initialize progress on page load
window.onload = function() {
    loadQuests();
    document.getElementById('current-level').textContent = "Level " + currentLevel;
};
