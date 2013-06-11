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
	
	var xhr = new XMLHttpRequest ();

	xhr.open ("get", "table.csv", false);
	xhr.send (null);

	if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
		rawString = xhr.responseText;
	} else {
		alert ("Request was unsuccessful: " + xhr.status);
	}

	var fun = CSVToArray (rawString, ",");
	
	for (var i = 0; i < fun.length - 1; i += 1) {
		for (var j = 0; j < fun[i].length; j += 1) {
			if (fun[i][j] == undefined)
				fun[i][j] = "";
		}

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
	
	console.log (insertString);
	
	$("#" + idToPopulatify).html (insertString);
	return fun;
}

$(document).ready (function () {
	PopulateAccordionId ("theAccordionThing");
});
