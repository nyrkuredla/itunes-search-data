//declaring global variables
const baseUrl = "https://itunes.apple.com/search?term=";
//https://itunes.apple.com/search?term=jack+johnson
const player = document.querySelector("audio");
const input = document.getElementById("search");
const submit = document.getElementById("submit");
const resultsDiv = document.getElementById("results");
let searchStr = "";
let searchArr = [];
let queryStr = "";
let queryUrl = "";

//creating event listener for submit button to get input string
submit.addEventListener("click", function(event) {
  event.preventDefault();
  searchStr = input.value;
  formatSearch();
  getResults().then( function() {
    input.value = "";
  });
});

//creating search function from input string
function formatSearch () {
  queryUrl = "";
  searchArr = searchStr.split(" ");
  for (let i = 0; i < (searchArr.length - 1); i++) {
    queryStr += searchArr[i] + "+";
  }
  queryStr += searchArr[(searchArr.length - 1)];
  queryUrl = baseUrl + queryStr;
  searchStr = "";
  searchArr = [];
}

//fetching search results from iTunes API
function getResults() {
  return fetch(queryUrl).then(function (data) {
    return data.json();
  }).then(function (data) {

    //declaring variables for template literal to insert result data into DOM
    let results = data.results;
    let artistName;
    let trackPicture;
    let artistLink;
    let trackTitle;
    let trackClip;

    //looping over result data to create template literal
    let resultsHTML;
    for (let i = 0; i < results.length; i++) {
      //plugging data into variables from result array
      artistName = results[i].artistName;
      trackPicture = results[i].artworkUrl100;
      artistLink = results[i].artistViewUrl;
      trackTitle = results[i].trackCensoredName;
      trackClip = results[i].previewUrl;

      //creating results template literal
      resultsHTML = `
      <div class="results-div">
        <img class="results-pic" src=${trackPicture} />
        <a class="results-link" href=${artistLink}>${artistName}</a>
        <p class="results-track">Track: ${trackTitle}</p>
      </div>`;
      console.log(resultsHTML);

      //adding new divs to result div
      resultsDiv.innerHTML += resultsHTML;
    }

    //adding song clip to audio player
  })
}




// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
