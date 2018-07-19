$(document).ready(function () {

  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyAo1nuu9HCfzeRVcXGvCpqrVxc_A-4PRbg",
  //   authDomain: "superhappyfuntime-34e10.firebaseapp.com",
  //   databaseURL: "https://superhappyfuntime-34e10.firebaseio.com",
  //   projectId: "superhappyfuntime-34e10",
  //   storageBucket: "",
  //   messagingSenderId: "392861754497"
  // };
  // firebase.initializeApp(config);


  //TODO: add chat in column4
  //TODO: create on click to add selected event to archive page
  //TODO: setup google maps API for archive page.

  var config = {
    apiKey: "AIzaSyA5MnBksheSQHlIYZefP6Js29LPeN1CS6Q",
    authDomain: "event-finder-6991c.firebaseapp.com",
    databaseURL: "https://event-finder-6991c.firebaseio.com",
    projectId: "event-finder-6991c",
    storageBucket: "",
    messagingSenderId: "285777158363"
  };
  firebase.initializeApp(config);




  var database = firebase.database();

  // Initial Values
  var name;
  var phone;
  var groupName;
  var eventName;
  var chooseEvent;
  var eventImage;
  console.log('chooseEvent', chooseEvent)



  // Add new users to group members column
  function createRow(name) {
    name = $("<li>").text(name);

    $('#group-members .list').append(name);

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
      groupName: groupName,
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
    var eventKeyword = "music";
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?postalCode=" + zipCode + "&keyword=" + eventKeyword + "&apikey=j4hMyFitMlxeByuZyEHlAokEHKqkBezJ";


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      // var results = response._embedded.events[""].data;
      for (var i = 0; i < 10; i++) {
        eventName = $("<img>");
        eventName.addClass("eventImage");
        eventName.attr("src", response._embedded.events[i].images[5].url);
        // eventName = response._embedded.events[i].name;
        eventVenue = response._embedded.events[i]._embedded.venues[0].name;
        createEventRow(eventName, eventVenue);
      };
    });
  };

  displayQuery();

  // function to populate event rows from firebase
  function createEventRow(eventName, eventVenue, eventImage) {
    eventName = $("<td>").html(eventName);
    eventName.addClass("event");
    console.log('eventName', eventName)

    eventVenue = $("<td>").text(eventVenue);
    eventVenue.addClass("event");

    var tBody = $("#events");
    var tRow = $("<tr>");
    tRow.append(eventName, eventVenue);

    tBody.append(tRow);

  }



  // function to add row to selected events column
  function createSelectedRow(eventName) {
    eventName = $("<td>").html(eventName);
    eventName.addClass("selected-events");  
    var tBody = $("#selected-events");
    var tRow = $("<tr>");
    tRow.append(eventName);
    tBody.append(tRow);
    

  }

  // On click to push to selected row column
  $(document).on("click", ".event", function () {
    eventName = $(this).html();
    console.log("Line 74 " + eventName);
    
    // $(eventName).removeClass("event").addClass("selected-event");
    var eventEntry = {
      eventName: eventName,
    };
    database.ref().push(eventEntry);


  });

  database.ref().on("child_added", function (eventSnapshot) {
    // console.log("Line 82 " + eventSnapshot.val().eventName);
    createSelectedRow(eventSnapshot.val().eventName);

    // createEventRow(eventSnapshot.val().eventName);


    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  })



  // add top choice to top choice page via firebase
  function addTopChoice(chooseEvent, eventVenue) {
    chooseEvent= $("<td>").html(chooseEvent);
    
    var tBody = $("#top-choice");
    var tRow = $("<tr>");
    tRow.append(chooseEvent);

    tBody.append(tRow);

    var tBody = $("#map");
    var tRow = $("<tr>");
    tRow.append(eventVenue);

    tBody.append(tRow);
    
    //add photo

  }

  // On click to push to top choice event to chosen page
  $(document).on("click", ".selected-events", function () {
    chooseEvent = $(this).html();
    console.log('chooseEvent', chooseEvent)
    
    var topChoiceEvent = {
      chooseEvent: chooseEvent,
      eventVenue: eventVenue
    };
    database.ref().push(topChoiceEvent);


  });

  database.ref().on("child_added", function (eventSnapshot) {
    // console.log("Line 82 " + eventSnapshot.val().eventName);
    addTopChoice(eventSnapshot.val().chooseEvent, eventSnapshot.val().eventVenue);


    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  })


  //end document.ready
});










