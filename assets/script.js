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

  // Capture Button Click
  $("#add-member").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    console.log('name', name)
    phone = $("#phone-input").val().trim();
    groupName = $("#groupName").val().trim();
    

    database.ref().set({
      name: name,
      phone: phone,
      groupName: groupName
      
    });

  });

//   // Firebase watcher + initial loader HINT: .on("value")
//   database.ref().on("value", function(snapshot) {

//     // Log everything that's coming out of snapshot
//     console.log(snapshot.val());
//     console.log(snapshot.val().name);
//     console.log(snapshot.val().phone);
//     console.log(snapshot.val().groupName);
    

//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().phone);
//     $("#age-display").text(snapshot.val().groupName);
   

//     // Handle the errors
//   }, function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
//   });


});