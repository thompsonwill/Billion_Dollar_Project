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



  var database = firebase.database();

  // Initial Values
  var name;
  var phone;
  var groupName;
  var eventName;
  var votes = 0;
  var votedOnEvents = [];


  // Add new users to group members column
  function createRow(name) {
    name = $("<td>").text(name);

    var tBody = $("#groupMembers");
    var tRow = $("<tr>");
    tRow.append(name);

    tBody.append(tRow);

  }

  // Click event to add group members to firebase 
  $("#add-member").on("click", function (event) {

    event.preventDefault();


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


  // event to pull user names from firebase 
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    createRow(childSnapshot.val().name);


    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


  // ticketmaster API query
  function displayQuery() {

    var zipCode = 60605;
    var eventKeyword = "rock";
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?postalCode" + zipCode + "&keyword=" + eventKeyword + "&apikey=j4hMyFitMlxeByuZyEHlAokEHKqkBezJ";


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      // var results = response._embedded.events[""].data;
      for (var i = 0; i < 10; i++) {
        eventName = response._embedded.events[i].name;
        eventVenue = response._embedded.events[i]._embedded.venues[0].name;
        createEventRow(eventName, eventVenue);
      };
    });
  };

  displayQuery();

  // function to populate event rows from firebase
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

  // function to add row to selected events column
  function createSelectedRow(eventName, eventTitle) {
    eventName = $("<td>").text(eventName);

    eventName.addClass("event");

    eventTitle = $("<td>").text(eventTitle);
    eventTitle.addClass("event");

    var voteBtn = $("<button>");
    voteBtn.addClass("vote-button");
    voteBtn.text(votes);


    var tBody = $("#selected-events");
    var tRow = $("<tr>");
    tRow.append(eventName, eventTitle, voteBtn);

    tBody.append(tRow);

  }

  // On click to push to selected row column
  $(document).on("click", ".event", function () {
    eventName = $(this).html();
    console.log("Line 74 " + eventName);

    // $(eventName).removeClass("event").addClass("selected-event");
    var eventEntry = {
      eventName: eventName,
      votes: votes
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
  })


  function voteClicks() {

    // event.preventDefault();
    // var $target = $(this),
        // votes = $target.siblings(votes).children(".vote-button")
    // $votes = $("#sumClicks");
    // $(this).text;
    votes += 1;
    // $votes.text(votes);
    $(this).text(votes);

    console.log('votes', votes)

    var voteEntry = {
      votes: votes
    };
    database.ref().update(voteEntry);
    console.log('voteEntry', voteEntry)

  }

  // on click event to count votes per event
  $(document).on("click", ".vote-button", voteClicks);


  database.ref().on("child_added", function (eventSnapshot) {
    eventSnapshot.val().votes;


  });
  //end document.ready
});










