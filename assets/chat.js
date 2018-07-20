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

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAV8tPliVbQHG9NjP5Phtm5LyJarE_z0XI",
        authDomain: "bootcampchat-76007.firebaseapp.com",
        databaseURL: "https://bootcampchat-76007.firebaseio.com",
        projectId: "bootcampchat-76007",
        storageBucket: "",
        messagingSenderId: "926069013945"
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
    var chatName = "";
    var message = "";
    var nothing = "";
    var clearName = "Admin";



    $("#clear").on("click", function () {

    });


    // function to add row to the chat table
    function createChatRow(chatName, message) {
        var chatContent = $("<li>").html("<b>" + chatName + ": </b>" + message);

        chatContent.prependTo(".chat-list");
    }

    //Data function for chat
    database.ref().on("child_added", function (chatSnapshot) {
        createChatRow(chatSnapshot.val().chatName, chatSnapshot.val().message);
        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


    $("#post").on("click", function (event) {
        // Don't refresh the page!
        event.preventDefault();
        chatName = $("#username").val().trim();
        message = $("#postText").val().trim();

        $("#postText").val("");

        database.ref().push({
            chatName: chatName,
            message: message
        });
    });












    //end document.ready
});










