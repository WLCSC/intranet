function CSVToArray (strData, strDelimiter)
{
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	strDelimiter = (strDelimiter || ",");

	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp (("(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");


	// Create an array to hold our data. Give the array
	// a default empty first row.
	var arrData = [[]];

	// Create an array to hold our individual pattern
	// matching groups.
	var arrMatches = null;

	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arrMatches = objPattern.exec (strData)) {
		// Get the delimiter that was found.
		var strMatchedDelimiter = arrMatches[1];

		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push ([]);
		}


		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[2]) {
			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			var strMatchedValue = arrMatches[2].replace (new RegExp ("\"\"", "g"), "\"");
		} else {
			// We found a non-quoted value.
			var strMatchedValue = arrMatches[3];
		}


		// Now that we have our value string, let's add
		// it to the data array.
		arrData[arrData.length - 1].push (strMatchedValue);
	}

	// Return the parsed data.
	return (arrData);
}

function PopulateAccordionId (idToPopulatify)
{
	// the string to contain all of the elements
	var insertString = "";
	var rawString;

	// new raw request
	var xhr = new XMLHttpRequest ();

	// set the properties, getting reference_material.csv
	xhr.open ("get", "csv/reference_material.csv", false);
	xhr.send (null);

	// if the response status is between 200 and 300 or is 304, good response
	if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
		rawString = xhr.responseText;
	} else {
		// tell about the error for now
		alert ("Request was unsuccessful: " + xhr.status);
	}

	// get the array from the response text
	var fun = CSVToArray (rawString, ",");

	// increment through each row
	for (var i = 0; i < fun.length - 1; i += 1) {
		// check for 'undefined elements, set them to empty strings
		for (var j = 0; j < fun[i].length; j += 1) {
			if (fun[i][j] == undefined)
				fun[i][j] = "";
		}

		// start adding to the text to be inserted
		insertString += "<div class=\"accordion-group\">";

		insertString += "<div class=\"accordion-heading\">";
		insertString += "<a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"theAccordionThing\" href=\"#collapse" + i + "\">" + fun[i][0] + "</a>";
		insertString += "</div>";
		
		insertString += "<div id=\"collapse" + i + "\" class=\"accordion-body collapse\">";
		insertString += "<div class=\"accordion-inner\">";
		
		insertString += "<table class=\"table table-bordered\">";
		
		insertString += "<thead>";
		insertString += "<tr>";
		insertString += "<td>Site</td>";
		insertString += "<td>Username</td>";
		insertString += "<td>Password</td>";
		insertString += "<td>Home Access?</td>";
		insertString += "<td>Notes</td>";
		insertString += "</tr>";
		insertString += "</thead>";
		
		insertString += "<tbody>";
		insertString += "<tr>";
		insertString += "<td>";
		insertString += "<a href=\"" + fun[i][1] + "\">" + fun[i][0] + "</a>";
		insertString += "</td>";
		insertString += "<td" + (fun[i][2] == "n/a" ? " class='disabled-cell'>" : ">") + fun[i][2] + "</td>";
		insertString += "<td" + (fun[i][3] == "n/a" ? " class='disabled-cell'>" : ">") + fun[i][3] + "</td>";
		insertString += "<td" +
			((/^(.*)[Nn][Oo](.*)$/.test (fun[i][4])) ? " class='bad'>" :
			 ((/^(.*)[Nn][Ee][Ee][Dd][Ee][Dd](.*)$/.test (fun[i][4])) ? " class='orangy'>" :
			  ((/^(.*)[Yy][Ee][Ss](.*)$/.test (fun[i][4])) ? " class='good'>" : ">"))) + fun[i][4] + "</td>";
		insertString += "<td>" + fun[i][5] + "</td>";
		insertString += "</tr>";
		insertString += "</tbody>";
		
		insertString += "</table>";
		insertString += "</div>";
		insertString += "</div>";
		insertString += "</div>";
		insertString += "</div>";
	}

	// insert the text to the idToPopulatify-id element
	$("#" + idToPopulatify).html (insertString);
	return fun;
}

function PopulateNotesSectionId (idToPopulatify)
{
	// the string to contain all of the elements
	var insertString = "";
	var rawString;
	
	// new raw request
	var xhr = new XMLHttpRequest ();

	// set the properties, getting notes_section.csv
	xhr.open ("get", "csv/notes_section.csv", false);
	xhr.send (null);

	// if the response status is between 200 and 300 or is 304, good response
	if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
		rawString = xhr.responseText;
	} else {
		// tell about the error for now
		alert ("Request was unsuccessful: " + xhr.status);
	}

	// get the array from the response text
	var fun = CSVToArray (rawString, ",");

	// counter to count spans
	var counter = 0;

	// section header
	insertString += "<div class=\"page-header\"><h1>Notes</h1></div>";
	
	// increment through each row
	for (var i = 0; i < fun.length - 1; i += 1) {
		for (var j = 0 ; j < fun[i].length; j += 1) {
			if (fun[i][j] == undefined)
				fun[i][j] = "";
		}

		if (counter == 0) {
			insertString += "<div class=\"row-fluid\">";
		}

		if (counter + parseInt (fun[i][0]) <= 12) {
			insertString += "<div class=\"span" + fun[i][0] + "\">";
			insertString += "<h2>" + fun[i][1] + "</h2>";
			insertString += "<p>" + fun[i][2] + "</p>";
			if (fun[i][4] != "" && fun[i][3] != "")
				insertString += "<p><a class=\"btn\" href=\"" + fun[i][4] + "\">" + fun[i][3] + "</a></p>"
			insertString += "</div>"
			
			counter += parseInt (fun[i][0]);
		}

		if (counter == 12) {
			insertString += "</div>";
			counter = 0;
		}
	}
	
	$("#" + idToPopulatify).html (insertString);
}

$(document).ready (function () {
	PopulateAccordionId ("theAccordionThing");
	PopulateNotesSectionId ("notes");
});
