
var ref = new Firebase("https://linksoup.firebaseio.com");

function UserData(data){
    this.userData = data;
}
UserData.prototype.getUserName = function() {
    return this.userData;
}

document.addEventListener('DOMContentLoaded', function() {
    var login = document.getElementById('login');
    // onClick's logic below:
    login.addEventListener('click', function() {
        // login();
        ref.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                userData = authData;
            }
    });        
    });
});

function login(){
    ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
        console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            UserData(authData);
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

document.addEventListener('DOMContentLoaded', function() {
    var addLink = document.getElementById('addLink');
    // onClick's logic below:
    addLink.addEventListener('click', function() {
        submitLink(window.location);
    });
});

function submitLink(currentUrl){
    var userNameSpace = userData.facebook.displayName;
    var userName = userNameSpace.replace(' ', '');
    var userRef = ref.child("users/" + userName + "/links");
    userRef.push({link: currentUrl.href});
}

// Get a database reference to our posts
var userLinks = new Firebase("https://linksoup.firebaseio.com/users/EricStroczynski/links");//need to replace EricStroczynski with userName somehow

document.addEventListener('DOMContentLoaded', function(){
    userLinks.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          childSnapshot.forEach(function(childChildSnapshot){
            var childKey = childChildSnapshot.key();
            var childData = childChildSnapshot.val();
            var linkDiv = "<div name='link-div'><a href='" + childData + "'>" + childData + "</a><hr></div>";
            document.getElementById('links').innerHTML += linkDiv;
          });
       });
   });
});




















