import { e } from "./env.js"
export default async function fetchData() {

	const searchElement = document.getElementById('event-search');
	const resultElement = document.getElementById('result');
	const errorElement = document.getElementById('error');
	let events = []

	resultElement.classList.add('events'); 

	async function fetchEvents() {
		const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
		const countryCode = 'NO'
		const musicGenre = 'KZFzniwnSyZfZ7v7nJ'
		const size = '100';
		const options = {
			method: 'GET',
			headers: {
				size: 100,
				genre: {
					name: "Dance/Electronic"
				}
			}
		}

		const endpointNorway = `${baseUrl}?apikey=${e}&countryCode=${countryCode}&${size}`;

		const response = await fetch(endpointNorway);
		const data = await response.json();
		events = data._embedded.events;
		console.log(events);
	}

	async function searchEvents() {
		const query = document.getElementById('search-input').value;
  
		const filteredEvents = events.filter(event => {
			const city = event._embedded.venues[0].city.name.toLowerCase();
			return city.includes(query.toLowerCase());
		});
  
		resultElement.innerHTML = ''; // Clear previous results
  
		for (let i = 0; i < Math.min(filteredEvents.length, 5); i++) {
		  const event = filteredEvents[i];
		  const container = document.createElement('div');
		  container.classList.add('events');

		  const eventNameElement = document.createElement('h3');
		  eventNameElement.textContent = event.name;
    	  container.appendChild(eventNameElement);

			const eventImageElement = document.createElement('img');
			eventImageElement.src = event.images[0].url;
			container.appendChild(eventImageElement);
  
		  resultElement.appendChild(container);
		}
	 }
  
	 await fetchEvents();
	 searchElement.addEventListener('click', searchEvents);
  }
  
  fetchData();



