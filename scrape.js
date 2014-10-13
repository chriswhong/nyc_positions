var lineReader = require('line-reader');
var args = process.argv.slice(2); 

var agencyId,
		agencyName,
		uoaId,
		uoaName,
		rowCount=0;

lineReader.eachLine(args[0], function(line, last) {
  // do whatever you want with line...
  //Keep track of Agency and Unit of Appropriation...

  parseLine(line, parsePositions);




  if(last){
    // or check if it's the last one
  }
});



function parseLine(line, callback) {
	var lineString = String(line);
	m = lineString.search("AGENCY:");

	if(m>-1){ 
			var tempAgencyId = String(lineString.match(/[0-9]{3}/));
			var s = lineString.indexOf(tempAgencyId);
			var tempAgencyName = lineString.substr(s+3,80).trim().toTitleCase();
			//console.log(tempAgencyId  + " " + tempAgencyId.length + " " + typeof(tempAgencyId));
			//console.log(tempAgencyName + " " + tempAgencyName.length);
			
			//compare to current value
			if(agencyId != tempAgencyId) {
				agencyId = tempAgencyId;
				agencyName = tempAgencyName;

				//clear all subordinate variables
				uoaId = "";

				console.log("Agency: " + agencyId + " " + agencyName)
			};
	}

	//Check for Unit of Appropriation
	m = lineString.search("UNIT OF APPROPRIATION:");
	if(m>-1){
		var tempUoaId = String(lineString.match(/[0-9]{3}/));
		var s = lineString.indexOf(tempUoaId);
		var tempUoaName = lineString.substr(s+3,100).trim().toTitleCase();;

		if(uoaId != tempUoaId) {
			uoaId = tempUoaId;
			uoaName = tempUoaName;

			console.log("UOA: " + uoaId + " " + uoaName)
		};

	};
	//get first 5 characters of line
	m = lineString.substring(0,5);
	//search for 4 digits followed by a space (a line in a position schedule)
	m = m.search(/[0-9]{4}\ /)
	if(m>-1){
		rowCount++;
		//console.log("----" + lineString + " " + rowCount);

		//split the line into its parts and write to csv (log for now)

	var line = lineString.substring(0,4);

	//find a single Char surrounded by spaces.  Necessary because the fixed-width isn't quite right.
	var d = lineString.match(/\ [A-Z]\ /);

	var description = lineString.substring(5,d.index).toTitleCase().trim();

	var payBank = lineString.substring(d.index+1,d.index+6);

	var titleCode = lineString.substring(d.index+7,d.index+12);

	var minMaxRate = lineString.substring(d.index+13,d.index+30).trim();

	var numPositions = lineString.substring(80,95).trim();

	var annualRate = parseFloat(lineString.substring(92,108).trim().replace(",",""));


	console.log(lineString);
	console.log(line + "," + description + "," + payBank + "," + titleCode + "," + minMaxRate + "," + numPositions + "," + annualRate);

	}
}


function parsePositions(lineString) {
	console.log(lineString);
}

//from http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
String.prototype.toTitleCase = function() {
  var i, j, str, lowers, uppers;
  str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless 
  // they are the first or last words in the string
  lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
  'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
      function(txt) {
        return txt.toLowerCase();
      });

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Ps', 'Otps'];
  for (i = 0, j = uppers.length; i < j; i++)
     str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
       uppers[i].toUpperCase());

  return str;
}