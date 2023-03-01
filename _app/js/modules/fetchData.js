import { e } from "./env.js"
export default async function fetchData() {

	const searchElement = document.getElementById('event-search');
	const resultElement = document.getElementById('result');
	const errorElement = document.getElementById('error');
	let events = []

	async function fetchEvents() {
		const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
		const countryCode = 'NO'
		const musicGenre = 'KZFzniwnSyZfZ7v7nJ'
		const options = {
			method: 'GET',
			headers: {
				genre: {
					name: "Dance/Electronic"
				}
			}
		}

		const endpointNorway = `${baseUrl}?apikey=${e}&countryCode=${countryCode}&genreId=${musicGenre}&`;

		const response = await fetch(endpointNorway);
		const data = await response.json();
		events = data._embedded.events;
		console.log(events);
	}

	async function searchEvents() {
		const query = document.getElementById('search-input').value;

		const filteredEvents = events.filter(event => {
			const eventName = event.name.toLowerCase();
			return eventName.includes(query.toLowerCase());
		});

		console.log(filteredEvents)
		
	}

	await fetchEvents();
	searchElement.addEventListener('click', searchEvents);
	

}

