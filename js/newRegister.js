 // Your web app's Firebase configuration
 var config = {
    apiKey: "AIzaSyC7dxjEW78xdxrG0IN-ear__36KiZMzKqU",
    authDomain: "plataformacria-3c64c.firebaseapp.com",
    databaseURL: "https://plataformacria-3c64c.firebaseio.com",
    projectId: "plataformacria-3c64c",
    storageBucket: "plataformacria-3c64c.appspot.com",
    messagingSenderId: "608816204550",
    appId: "1:608816204550:web:4212f12f39408ebe5f6c87",
    measurementId: "G-FN8RG8Z4RB"
};
// Initialize Firebase
firebase.initializeApp(config);
const storageService = firebase.storage();


// Reference messages collection
var messagesRef = firebase.database().ref('users');

// firebase bucket name
// REPLACE WITH THE ONE YOU CREATE
// ALSO CHECK STORAGE RULES IN FIREBASE CONSOLE
var fbBucketName = 'user-images';
// get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
var downloadURL = "temp";
imageProfile = "";

// listen for file selection
fileButton.addEventListener('change', function (e) {
    // what happened
    console.log('file upload event', e);
    // get file
    var file = e.target.files[0];
    // create a storage ref
    var storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    // upload file
    var uploadTask = storageRef.put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = progress;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        function () {
            // Upload completed successfully, now we can get the download URL
            // save this link somewhere, e.g. put it in an input field
            uploadTask.snapshot.ref.getDownloadURL().then(function (imageProfile) {
                console.log('File available at', imageProfile);
                $("#image").val(imageProfile);
                $("#submit").prop("disabled", false);
                $(".body__profile").css({'background-image': 'url(' + imageProfile + ')'});
                $(".card-3 .card-heading").css({'background-image': 'url(' + imageProfile + ')'});
            });
            
        });
});

$('#contactForm').submit(function (e) {
    e.preventDefault();

    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: $('#name').val(),
        email: $('#email').val(),
        city: $('#cidade').val(),
        description: $('#bio').val(),
        instagram: $('#instagram').val(),
        twitter: $('#twitter').val(),
        facebook: $('#facebook').val(),
        portfolio: $('#portfolio').val(),
        image: $('#image').val(),
        job: $('#job').val(),


    });

    $('.success-message').show();

    $('#contactForm')[0].reset();

    window.location.href = "http://plataformacria.com.br/"
});