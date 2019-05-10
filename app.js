// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD7J86oLz6gLBKxM7ZkfZNeCliEMgSjDWQ",
    authDomain: "users-list-d39f2.firebaseapp.com",
    databaseURL: "https://users-list-d39f2.firebaseio.com",
    projectId: "users-list-d39f2",
    storageBucket: "users-list-d39f2.appspot.com",
    messagingSenderId: "605348435391",
    appId: "1:605348435391:web:9a34251a871ebbc4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Database Reference: The First line of the code below has a reference to the main root of the Firebase database. The second line has a reference to the users key root of the database.
//If we want to get all the values of the users, we simply use users root.
const dbRef = firebase.database().ref();

//Get User List using Child_Added() method:
const usersRef = dbRef.child('users');

//userListUI: Get a DOM element reference for userList
const userListUI = document.getElementById("userList");

//child_added: Attach a child_added event to the userRef database reference object. It is a Firebase event similar to click event in JavaScript and it typically
//retrieves a list of items from the Firebase database.
//userListUI: Get a DOM element reference for userList
  //  child_added: Attach a child_added event to the userRef database reference object. It is a Firebase event similar to click event in JavaScript and it typically retrieves a list of items from the Firebase database.
    //callback: This event takes TWO arguments,  a string “child_added” and the callback which will run on each interaction.
  //  snap: In each interaction snap object, which is a parameter of the callback,  will hold information about a single user item that we can have access to.
//    snap.key: This will hold an index number of each user item as we store them in an array in our Firebase Database JSON tree structure.
//    snap.val(): val() function will return user object so that we can access any item in that object using dot notation.
//    snap: Assign each user object to a variable user, at this point I would just need only one value out of the user object which is .name.
//    li.innerHTML: Create li element and set the name of the user using user.name value.
//    child-key: Set an attribute called child-key to li which will have the key of each li.
//    child-key: Set an attribute called child-key to li which will have the key of each li.
//    userClicked: Attach click event to li so that if any user clicks on the left we can show more information on the right.
//    append: This will add li to ul on every iteration.

usersRef.on("child_added", snap => {

	let user = snap.val();

	let $li = document.createElement("li");
	$li.innerHTML = user.name;
	$li.setAttribute("child-key", snap.key);
	$li.addEventListener("click", userClicked)
	userListUI.append($li);

});
// Show User Detail on li click:
//
//    userID: get the child-key attribute on clicking the username (li)
//    userRef: This time the root is “users/” +  userID. which will give us a specific user object when we use child_added event.
//    child_added:  get the snap object on each iteration which will have all the key-value pairs of a user object.
//    Finally, add each key and value into p element then append them into userDetailUI DOM element.

function userClicked(e) {

	var userID = e.target.getAttribute("child-key");

	const userRef = dbRef.child('users/' + userID);
	const userDetailUI = document.getElementById("userDetail");

	userDetailUI.innerHTML = ""

	userRef.on("child_added", snap => {


		var $p = document.createElement("p");
		$p.innerHTML = snap.key  + " - " +  snap.val()
		userDetailUI.append($p);


	});

}
