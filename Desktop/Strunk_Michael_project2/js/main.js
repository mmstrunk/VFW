//dom
window.addEventListener( "DOMContentLoaded" , function() {

	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	

	
	//create select field element and populate with options
	function eatOut(){
		var formTag = document.getElementsByTagName("form"),
		selectLi = $('dropDown'),
		makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "groups");
		for (var i = 0, j=timeOut.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = timeOut[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
			}
		selectLi.appendChild(makeSelect);
		}
	
	//variable defaults
	var timeOut = ["--Last time you ate out--", "yesterdat", "last week", "last month", "longer"];
	eatOut();	
	
	//Find value of selection radio button
	function getSelectedRadio(){
		var radio = document.forms[0].sex;
		for(var i=0; i<radio.length; i++){
			if(radio[i].checked){
				sexValue = radio[i].value;
			}
		}
	}
	
		function toggleControls(n){
			switch(n){
				case "on":
				$('itemForm').style.display = "none";
				$('clearData').style.display = "inline";
				$('displayData').style.display = "none";
				$('addNew').style.display = "inline";
				break;
				case "off":
				$('itemForm').style.display = "block";
				$('clearData').style.display = "inline";
				$('displayData').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
				default:
				return false;	

			}
		}	
    function storeData(){
        var uniq = Math.floor(Math.random()*90000003);
        // get all form field data and store in object
        //object prop contain array with the form labal and imput value.
        getSelectedRadio()
        var	userType 			= {};
            userType.firstname 	= ["First Name:", $("firstname").value];
            userType.lastname 	= ["Last Name:", $("lastname").value];
            userType.sex 		= ["Sex:", sexValue];
            userType.timeOut 	= ["Last Time Out:", timeOut.value];
            // userType.location 	= ["Last Visited", $("location").value];
            userType.comments 	= ["Comments:" , $("comments").value];
            localStorage.setItem(uniq , JSON.stringify(userType));
            alert("Yummm Thanks!");
            };
            
    // Display Data
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There are no items saved!");
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert string from local storage value back to object using JSON.parse
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				
			}		

		}
	}	

	function deleteData(){
		if(localStorage.length === 0){
			alert("Storage is Empty");

		}else{
			localStorage.clear();
			alert("Everything has been deleted.");
			window.location.reload();
			return false;
			}
	}	


	//set link and click events
	var linkView = $(linkView);
	linkView.addEventLister("click", getData);
	var linkErase = $(clear);
	linkErase.addEventLister("click", clearLocal);
	var save = $("submit");
	save.addEventLister("click", storeData);
	
	
});