$(document).ready(function () {

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
    var chatName = "";
    var message = "";

    $("#clear").on("click", function () {

    });

    // function to add row to the chat table
    function createChatRow(chatName, message) {
        var chatContent = $("<li>").html("<b>" + chatName + ": </b>" + message);

        chatContent.prependTo(".chat-list");
    }

    $('.modal').modal();
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

        // Prevent empty form submits
        if (($.trim($("#username").val()) === "" || $.trim($("#postText").val()) === "")) {
            $("#post").attr("href", "#modal1")
            $('.modal').modal();
        } else {
            $("#post").attr("href", "#")
            chatName = $("#username").val().trim();
            message = $("#postText").val().trim();

            $("#postText").val("");

            database.ref().push({
                chatName: chatName,
                message: message
            });
        }

    });

    //end document.ready
});
