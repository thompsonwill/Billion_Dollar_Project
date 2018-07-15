$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAo1nuu9HCfzeRVcXGvCpqrVxc_A-4PRbg",
    authDomain: "superhappyfuntime-34e10.firebaseapp.com",
    databaseURL: "https://superhappyfuntime-34e10.firebaseio.com",
    projectId: "superhappyfuntime-34e10",
    storageBucket: "",
    messagingSenderId: "392861754497"
  };
  firebase.initializeApp(config);

  function initializePage() {

  }

  var database = firebase.database();

  // Initial Values
  var name;
  var phone;
  var groupName;
  var eventName;

  // Create Row Function
  function createRow(name) {
    name = $("<td>").text(name);

    var tBody = $("#groupMembers");
    var tRow = $("<tr>");
    tRow.append(name);

    tBody.append(tRow);

  }

  function createEventRow(eventName, eventTitle) {
    eventName = $("<td>").text(eventName);
    eventName.addClass("event");

    eventTitle = $("<td>").text(eventTitle);
    eventTitle.addClass("event");

    var tBody = $("#events");
    var tRow = $("<tr>");
    tRow.append(eventName, eventTitle);

    tBody.append(tRow);

  }

  function createSelectedRow(eventName, eventTitle) {
    eventName = $("<td>").text(eventName);

    eventName.addClass("event");

    eventTitle = $("<td>").text(eventTitle);
    eventTitle.addClass("event");

    var tBody = $("#selected-events");
    var tRow = $("<tr>");
    tRow.append(eventName, eventTitle);

    tBody.append(tRow);

  }



  // Capture Event Click
  $("body").on("click", ".event", function (event) {
    eventName = $(this).html();
    console.log("Line 74 " + eventName);
    var eventEntry = {
      eventName: eventName,
    };
    database.ref().push(eventEntry);

  });

  database.ref().on("child_added", function (eventSnapshot) {
    console.log("Line 82 " + eventSnapshot.val().eventName);
    createSelectedRow(eventSnapshot.val().eventName);
    // createEventRow(eventSnapshot.val().eventName);


    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


  // Capture Button Click
  $("#add-member").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    console.log('name', name)
    phone = $("#phone-input").val().trim();
    groupName = $("#groupName").val().trim();


    var newEntry = {
      name: name,
      phone: phone,
      groupName: groupName
    };

    database.ref().push(newEntry);
    console.log('newEntry', newEntry.name)
  });

  //function to append user names to group members column
  //TO DO: names are not stacking. need to fix
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    createRow(childSnapshot.val().name);


    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  function displayQuery() {
    // var search = $(this).attr("data-search");

    //eventful API


    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?postalCode" + zipCode + "&keyword=rock&apikey=j4hMyFitMlxeByuZyEHlAokEHKqkBezJ";
    var zipCode = 60654;
    var eventKeyword = "rock";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log("API" + response._embedded.events[1].name);
      // eventName = response._embedded.events[1].name;
      // eventTitle = response.Year;




      // var results = response._embedded.events[""].data;
      for (var i = 0; i < 10; i++) {
        eventName = response._embedded.events[i].name;
        createEventRow(eventName);
      };



    });

    // "https://api.giphy.com/v1/gifs/search?q=" +
    // search  + "&api_key=9TDPBQSS97BXCBXaZRIJFKSq1bnBWFpk&limit=10";

    console.log("stop playin with the for loop")

  };

  displayQuery();


  //TO DO: use math.max to determine highest voted item

});
