
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
var isNewUser = true;
ref.onAuth(function(authData) {
  if (authData && isNewUser) {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: getName(authData)
    });
  }
});
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

function submitLink(currentUrl){
    var userNameSpace = userData.facebook.displayName;
    var userName = userNameSpace.replace(' ', '');
    var userRef = ref.child("users/" + userName + "/links");
    userRef.update({link: currentUrl.href});
}