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

document.addEventListener('DOMContentLoaded', function() {
  var addPageButton = document.getElementById('addPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      var d = document;

      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    });
  }, false);
}, false);
