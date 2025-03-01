const sheetURL = "https://script.google.com/macros/s/AKfycbz8rDcV9oEAX5sv8vU0QG9r4qkXXlAVKN5_IC-6Lzc/dev"; // Replace with your Sheet URL

fetch(sheetURL)
    .then(response => response.json())
    .then(data => {
        const entries = data.feed.entry;
        const stateDropdown = document.getElementById("state");
        const ahjDropdown = document.getElementById("ahj");
        const noteDisplay = document.getElementById("note");

        let records = [];

        // Process Sheet Data
        entries.forEach(entry => {
            const state = entry["gsx$state"]["$t"];
            const ahj = entry["gsx$ahj"]["$t"];
            const note = entry["gsx$note"]["$t"];
            records.push({ state, ahj, note });
        });

        // Populate State Dropdown
        const uniqueStates = [...new Set(records.map(item => item.state))];
        uniqueStates.forEach(state => {
            const option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            stateDropdown.appendChild(option);
        });

        // Filter AHJ based on selected STATE
        stateDropdown.addEventListener("change", () => {
            const selectedState = stateDropdown.value;
            ahjDropdown.innerHTML = '<option value="">Select AHJ</option>'; // Reset AHJ dropdown

            const filteredAHJs = records.filter(record => record.state === selectedState);
            filteredAHJs.forEach(record => {
                const option = document.createElement("option");
                option.value = record.ahj;
                option.textContent = record.ahj;
                ahjDropdown.appendChild(option);
            });
        });

        // Show NOTE when AHJ is selected
        ahjDropdown.addEventListener("change", () => {
            const selectedAHJ = ahjDropdown.value;
            const record = records.find(record => record.ahj === selectedAHJ);
            noteDisplay.textContent = record ? record.note : "";
        });
    })
    .catch(error => console.error("Error fetching data:", error));
