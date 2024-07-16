const apiKey = 'houQLaJM37MuiNSbvxxZSh5ra7f3gDylfSAYkvXB';

        // Function to fetch asteroid data by ID
        function searchAsteroid() {
            const asteroidId = document.getElementById('asteroidId').value.trim();

            if (asteroidId === '') {
                alert('Please enter an Asteroid ID.');
                return;
            }

            const apiUrl = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${apiKey}`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Asteroid not found');
                    }
                    return response.json();
                })
                .then(data => {
                    const asteroidData = document.getElementById('asteroidData');
                    asteroidData.innerHTML = ''; // Clear previous data

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${data.name}</td>
                        <td>${data.close_approach_data[0].close_approach_date}</td>
                        <td>${data.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</td>
                        <td>${data.close_approach_data[0].miss_distance.kilometers} km</td>
                    `;
                    asteroidData.appendChild(row);
                })
                .catch(error => {
                    console.error('Error fetching asteroid data:', error);
                    alert('Asteroid not found. Please check the ID and try again.');
                });
        }