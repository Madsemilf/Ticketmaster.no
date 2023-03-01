export default async function fetchData() {

	const searchElement = document.getElementById('event-search');
	const eventOutput = document.getElementById('event-output');
	const resultElement = document.getElementById('result');
	const errorElement = document.getElementById('error');

	async function fetchEvents() {
		const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
		const apiKey = 'w7baiDCMhxZVZXRxEGfihdDaXSIVFcZB';
		const countryCode = `NO`
		const options = {
			method: 'GET',
			headers: {
				size: 100
			}
		}

		const endpointNorway = `${baseUrl}?apikey=${apiKey}&countryCode=${countryCode}&`;

		const response = await fetch(endpointNorway);
		const events = await response.json()
		console.log(events._embedded.events)
	}

	await fetchEvents();


}

