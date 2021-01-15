// SELECT ELEMENTS
const total_cases_element = document.querySelector(".p_stats1");
const new_cases_element = document.querySelector(".p_new1");
const recovered_element = document.querySelector(".p_stats2");
const new_recovered_element = document.querySelector(".p_new2");
const deaths_element = document.querySelector(".p_stats3");
const new_deaths_element = document.querySelector(".p_new3");
const ctx = document.getElementById("axes_line_chart").getContext("2d");

// APP VARIABLES
let app_data = [],
	cases_list = [],
	recovered_list = [],
	deaths_list = [],
	deaths = [],
    formatedDates = [];
    
// FETCH API
function fetchData(){

	cases_list = [], recovered_list =[], deaths_list = [], dates = [], formatedDates = [];
	
	fetch(`https://covid19-monitor-pro.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=Morocco`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
			"x-rapidapi-key": "7e269ec140msh8a5df9cfc21b4b4p1c1e3ejsn9aba26afc6e0"
		}
	})
	.then( response => {
		return response.json();
	})
	.then( data => {
		dates = Object.keys(data);
		
		dates.forEach( date => {
			let DATA = data[date];

			formatedDates.push(formatDate(date));
			app_data.push(DATA);
			cases_list.push(parseInt(DATA.total_cases.replace(/,/g, "")));
			recovered_list.push(parseInt(DATA.total_recovered.replace(/,/g, "")));
			deaths_list.push(parseInt(DATA.total_deaths.replace(/,/g, "")));
		})
	})
	.then( () => {
		updateUI();
	})
	.catch( error => {
		alert(error);
	})
}

// GET RESULTATS
fetchData();

// UPDATE UI FUNCTION
function updateUI(){
	updateStats();
	axesLinearChart();
}

//UPDATESTATS
function updateStats(){
	let last_entry = app_data[app_data.length - 1];
	let before_last_entry = app_data[app_data.length - 2];

	total_cases_element.innerHTML = last_entry.total_cases || 0;
	new_cases_element.innerHTML = `+${last_entry.new_cases || 0 }`;

	recovered_element.innerHTML = last_entry.total_recovered || 0;
	new_recovered_element.innerHTML = `+${parseInt(last_entry.total_recovered.replace(/,/g, "")) - parseInt(before_last_entry.total_recovered.replace(/,/g, ""))}`;
	
	deaths_element.innerHTML = last_entry.total_deaths;
	new_deaths_element.innerHTML = `+${last_entry.new_deaths || 0}`;
}


// UPDATE CHART
let my_chart;
function axesLinearChart(){

	if(my_chart){
		my_chart.destroy();
	}

	my_chart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				label: 'Confirmés',
				data: cases_list,
				fill : false,
				borderColor : '#FFF',
				backgroundColor: '#FFF',
				borderWidth : 1
			},{
				label: 'Guéris',
				data: recovered_list,
				fill : false,
				borderColor : '#009688',
				backgroundColor: '#009688',
				borderWidth : 1
			},{
				label: 'Décès',
				data: deaths_list,
				fill : false,
				borderColor : '#f44336',
				backgroundColor: '#f44336',
				borderWidth : 1
			}],
			labels: formatedDates
		},
		options: {
			responsive : true,
			maintainAspectRatio : false
		}
	});
}

// FORMAT DATES
const monthsNames = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'aout', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(dateString){
	let date = new Date(dateString);

	return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
}