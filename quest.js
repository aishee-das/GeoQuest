// Function to load quests from localStorage
function loadQuests() {
    var quests = JSON.parse(localStorage.getItem('quests')) || [];
    var questList = document.getElementById('quests');

    // Clear existing list
    questList.innerHTML = '';

    if (quests.length === 0) {
        questList.innerHTML = '<li>You have no quests yet.</li>';
        return;
    }

    // Create list items for each quest
    quests.forEach(quest => {
        var listItem = document.createElement('li');
        var title = document.createElement('h3');
        title.textContent = quest.name;
        listItem.appendChild(title);

        // Add a "Remove" button
        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove from Quest';
        removeButton.onclick = function() {
            removeFromQuest(quest.id);
        };
        listItem.appendChild(removeButton);

        questList.appendChild(listItem);
    });
}

// Function to remove a quest
function removeFromQuest(id) {
    var quests = JSON.parse(localStorage.getItem('quests')) || [];
    quests = quests.filter(quest => quest.id !== id);
    localStorage.setItem('quests', JSON.stringify(quests));
    loadQuests();
}

// Load quests when the page loads
window.onload = loadQuests;
