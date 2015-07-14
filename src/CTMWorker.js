importScripts( "libs/lzma.js", "ctm.js");

(function (THREE){


self.onmessage = function( event ) {


	self.getMesh(event.data.url, function(binaryData) {

		var stream = new CTM.Stream(binaryData );
		self.file = new CTM.File( stream );

		self.postMessage( self.file );
		self.close();

	});

};


self.getMesh = function ( url , callback ) {

	var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.overrideMimeType("text/plain; charset=x-user-defined");
  
  var scope = this;
  xhr.onload = function (e) { 

    if (xhr.readyState === 4 && xhr.status === 200) {

        if (xhr.responseText.length == 0) {
          console.error("returned empty mesh file");
          return;
        }

      	callback(xhr.responseText);
    }
	};
  xhr.send();
};


})();