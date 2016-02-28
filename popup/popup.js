
var ref = new Firebase("https://linksoup.firebaseio.com");

var userData;

function login(){
    ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
        console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            userData = authData;
        }
    });
};



// we would probably save a profile when we register new users on our site
// we could also read the profile to see if it's null
// here we will just simulate this with an isNewUser boolean

// find a suitable name based on the meta info given by each provider
function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
}

var currUserName;

function submitLink(currentUrl){
    var userNameSpace = userData.facebook.displayName;
    var userName = userNameSpace.replace(' ', '');
    var userRef = ref.child("users/" + userName + "/links");
    userRef.push({link: currentUrl.href});
    currUserName = userName;
}

// Get a database reference to our posts
var userLinks = new Firebase("https://linksoup.firebaseio.com/users/EricStroczynski/links");

function getLinks() {
    
    userLinks.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          childSnapshot.forEach(function(childChildSnapshot){
            var childData = childChildSnapshot.val();
            var linkDiv = "<div name='link-div'><hr><a href='" + childData + "'>" + childData + "</a></div>";
            document.getElementById('links').innerHTML += linkDiv;
          });
       });
   });
};





















