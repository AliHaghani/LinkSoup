var ref = new Firebase("https://linksoup.firebaseio.com");

function login(){
    ref.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
})
};