
// TO DO: Drop down menus for the year range? 
    // Populate based on the API data (from our own JSON file)

// Populate the state dropdown from our JSON, the id of each state will be the FIPS code (used in the API for data retrieval)

document.addEventListener('DOMContentLoaded', function () {

    fetch('states.json')
    .then((res) => res.text())
    .then((data) => { 
        data = JSON.parse(data);
        let output = '';
        
        // Create a button for each state
        data.forEach(function(states) {
            output += `<option class="dropdown-item selected_state" id="${states.state_code}">${states.state_name}</option>\r\n`;            
        });
        document.getElementById('select_state').innerHTML += output;

    }) 
    .catch((err) => console.log(err));


})


// If the user has selected a state, populate the counties for that state (the id for the counties are the FIPS codes)

document.getElementById("select_state").onchange = populateCountyDropdown ;

function populateCountyDropdown() {

    // Clear the dropdown list
    document.getElementById("select_county").options.length=0;

    var selected_state = document.getElementById('select_state');
    var value = selected_state.options[selected_state.selectedIndex].id;

    fetch('state_county_data.json')
    .then((res) => res.text())
    .then((data) => { 
        data = JSON.parse(data);
        let output = '';
        // Create a button for each county in selected state
        data.forEach(function(state_county_data) {
            if (value == state_county_data.state_code) {
                output += `<option class="dropdown-item" id="${state_county_data.county_code}">${state_county_data.county_name}</option>\r\n`;   
            }         
        });
        document.getElementById('select_county').innerHTML += output;
    }) 
    .catch((err) => console.log(err));
}

document.getElementById("fetch_data_button").addEventListener("click", getAPIData); 

function fetchStates() {

    var jsondata;

    return fetch('states.json')
        .then(function(response) {
            return response.json();
    })  
        .then(function(json) {
            return json;
    });
}

function fetchState_County_Data() {

    var jsondata;

    return fetch('state_county_data.json')
        .then(function(response) {
            return response.json();
    })  
        .then(function(json) {
            return json;
    });
}

function getAPIData() {

    var selected_state = document.getElementById('select_state');
    var selected_county = document.getElementById('select_county');
    var state = selected_state.options[selected_state.selectedIndex].text;
    var county = selected_county.options[selected_county.selectedIndex].text;
    var url = "https://aqs.epa.gov/data/api/annualData/byCounty?email=rachel.peterson.5683@gmail.com&key=tealheron74&param=44201&bdate=20160101&edate=20160228";
    
    fetchStates().then(function(data) {
        data.forEach(function(states) {
            if(state == states.state_name) {
                url += "&state=" + states.state_code;
            }         
        });
    });

    fetchState_County_Data().then(function(data) {
        data.forEach(function(state_county_data) {
            if(county == state_county_data.county_name) {
                url += "&county=" + state_county_data.county_code;
                fetch(url)
                    .then(response => response.json())
                    .then(data => console.log(data));
            }         
        });
    });
}

// Once the user has filled out both the year range and county/city data, call the API (using Fetch?)

// Analyze that data 

// Generate charts based on the data pulled (using what tools?)

// Push the charts to html



