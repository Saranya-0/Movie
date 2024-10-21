// Select the input and output elements
const movieInput = document.getElementById('movieInput');
const movieDataDiv = document.getElementById('movieData');

// Your OMDb API key (replace 'your_api_key' with your actual key)
const apiKey = 'your_api_key';  // Replace this with your OMDb API key

// Function to fetch movie data from OMDb API
async function fetchMovie(movieName) {
  try {
    // Use the movieName in the URL instead of data
    // const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`);
    const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=501e2d04`);
    
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch movie data');
    }

    // Parse the JSON data
    const movie = await response.json();

    // Check if the movie was found
    if (movie.Response === "False") {
      movieDataDiv.innerHTML = `<p class="text-danger">Movie not found: ${movie.Error}</p>`;
      return;
    }

    // Clear previous data
    movieDataDiv.innerHTML = '';

    // Create HTML structure to display movie data
    const movieHTML = `
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">${movie.Title} (${movie.Year})</h3>
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x400?text=No+Image'}" class="img-fluid mb-3" alt="Poster of ${movie.Title}">
          <p><strong>Genre:</strong> ${movie.Genre}</p>
          <p><strong>Director:</strong> ${movie.Director}</p>
          <p><strong>Actors:</strong> ${movie.Actors}</p>
         
           <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
          <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View on IMDb</a>
        </div>
      </div>
    `;

    // Append the movie data to the movieDataDiv
    movieDataDiv.innerHTML = movieHTML;

  } catch (error) {
    movieDataDiv.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
  }
}

// Function triggered by the button click
function searchMovie() {
  const movieName = movieInput.value.trim();
  if (movieName) {
    fetchMovie(movieName);
  } else {
    movieDataDiv.innerHTML = '<p class="text-warning">Please enter a movie name.</p>';  // Clear if input is empty
  }
}
