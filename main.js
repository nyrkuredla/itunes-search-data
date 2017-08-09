//declaring global variables
const baseUrl = "https://itunes.apple.com/search?term=";
//https://itunes.apple.com/search?term=jack+johnson
const player = document.querySelector("audio");
const input = document.getElementById("search");
const submit = document.getElementById("submit");
const results = document.getElementsByClassName("results");
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
  console.log(queryUrl);
}

function getResults() {
  return fetch(queryUrl).then(function (data) {
    return data.json();
  }).then(function (data) {
    console.log(data.results);
  })
}




// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
