/*
Michael Strunk
VFW
0113
*/
//Wait until DOM is ready

window.addEventListener("DOMContentLoaded", function(){

	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	function makeVisited(){
			var formTag = document.getElementsByTagName("form"),
			selectLi = $('dropDown'),
		makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "groups");
		for (var i = 0, j=chooseVisited.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = chooseVisited[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}

		function getSelectedRadio(){
				var radios = document.forms[0].alcoholValue;
				for(var i=0; i<radios.length; i++){
					if (radios[i].checked){
						alcoholValue = radios[i].value;
					}
				}
		}

		function getCheckboxValue(){
			if($('server').checked){
				serverValue = $('server').value;
			}else{
				serverValue = "No";	
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

			function storeData(key){
						if(key){	
							var id	= Math.floor(Math.random()*563948);
						}else{
								id  = key;
						}	
			
					getSelectedRadio();
					getCheckboxValue();
					var item	= {};
						item.visited	=["Visited:", $('groups').value];
						item.lastName	=["Last Restaurant Visited:", $('lastName').value];
						item.favRest	=["What is your Favorite Restaurant:", $('favRest').value];
						item.mostVis	=["Most visited Restaurant:", $('mostVis').value];
						item.alcohol	=["Do you order Alcohol beverages?", alcoholValue];
						item.tip	=["General % tip", $('tip').value];
						item.server	=["Check if food effects server tip.:", serverValue];
						item.fName	=["First Name", $('fName').value];
						item.lName	=["Last Name", $('lName').value];	
						item.quantity	=["Item Quantity:", $('quantity').value];
						item.details	=["Details:", $('details').value];
					//Save data into string
					localStorage.setItem(id, JSON.stringify(item));
					alert("Survay Saved!");
				}

			function getData(){
					toggleControls("on");
					if(localStorage.length === 0){
						alert("No Data in local storage, default data was entered!");
						autoFillData();
					}

					var makeDiv = document.createElement('div');
					makeDiv.setAttribute("id", "items");
					var makeList = document.createElement('ul');
					makeDiv.appendChild(makeList);
					document.body.appendChild(makeDiv);
					$('items').style.display = "block";
					for(var i=0, len=localStorage.length; i<len; i++){
							var makeli = document.createElement('li');
							var linksLi = document.createElement('li');
							makeList.appendChild(makeli);
							var key = localStorage.key(i);
							var value = localStorage.getItem(key);
							var obj = JSON.parse(value);
							var makeSubList = document.createElement('ul');
							makeli.appendChild(makeSubList);
							for(var n in obj){
								var makeSubli = document.createElement('li');
								makeSubList.appendChild(makeSubli);
								var optSubText = obj[n][0]+" "+obj[n][1];
								makeSubli.innerHTML = optSubText;
								makeSubList.appendChild(linksLi);

							}
							makeItemLinks(localStorage.key(i), linksLi);

					}
			}
			
			function autoFillData(){
				for(var n in json){
					var id = Math.floor(Math.random()*563948);
					localStorage.setItem(id, JSON.stringify(json[n]));
				}
			}

			
			function makeItemLinks(key, linksLi){
				var editLink = document.createElement('a');
				editLink.href = "#";
				editLink.key = key;
				var editText = "Edit Item";
				editLink.addEventListener("click", editItem);
				editLink.innerHTML = editText;
				linksLi.appendChild(editLink);

			var breakTag = document.createElement('br');
			linksLi.appendChild(breakTag);

			var deleteLink = document.createElement('a');
			deleteLink.href = "#";
			deleteLink.key = key;
			var deleteText = "Delete Item";
			deleteLink.addEventListener("click", deleteItem);
			deleteLink.innerHTML = deleteText;
			linksLi.appendChild(deleteLink);

			}

			function editItem(){
				var value = localStorage.getItem(this.key);
				var item = JSON.parse(value);
				
				toggleControls("off");

				$('groups').value = item.visited[1];
				$('lastName').value = item.lastName[1];
				$('favRest').value = item.favRest[1];
				$('mostVis').value = item.mostVis[1];
				var radios = document.forms[0].alcohol;
				for(var i=0; i<radios.length; i++){
				if(radios[i].value == "Yes" && item.alcohol[1] == "Yes"){
						radios[i].setAttribute("checked", "checked");
							}else if(radios[i].value == "No" && item.alcohol[1] == "No"){
								radios[i].setAttribute("checked", "checked");
							}
				}
				$('tip').value = item.tip[1];	
				if(item.server[1] == "Yes"){
					$('server').setAttribute("checked", "checked");
				}
				$('fName').value = item.fName[1];
				$('lName').value = item.lName[1];
				$('quantity').value = item.quantity[1];
				$('details').value = item.details[1];

				saveItem.removeEventListener("click", storeData);
				$('saveItem').value = "Edit Item";
				
				var editSubmit = $('saveItem');
				editSubmit.addEventListener("click", validate);
				editSubmit.key = this.key;	
			}

			function deleteItem(){
					var ask = confirm("Are you sure you want to delete this item?");
					if (ask){
						localStorage.removeItem(this.key);
							window.location.reload();
					}else{
							alert("Item was not deleted!");
					}
			}
			function deleteData(){
				var askAll = confirm("This will delete all survays! Press OK to continue.");	
				if(localStorage.length === 0){
					alert("There is no data to clear!");

				}else if(askAll){
						localStorage.clear();
						alert("All survays Have Been Deleted!");
						window.location.reload();
						return false;
						}else{
							alert("Survays were not deleted!");
						}
			}

			function validate(eventData){
				var getGroup = $('groups');
				var getItemName = $('lastName');
				var getfName = $('fName');
				var getlName = $('lName');

				errorMsg.innerHTML = "";
				getGroup.style.border = "1px solid black";
				getItemName.style.border = "1px solid black";
				getfName.style.border = "1px solid black";
				getlName.style.border = "1px solid black";	
				
				
				var messageArray = [];
				if(getGroup.value ==="-- Last Visited--"){
						var groupError = "Please choose last time visited!";
						getGroup.style.border = "2px solid red";
						messageArray.push(groupError);
				}

				if(getlastName.value === ""){
						var lastNameError = "Please enter name of last restaurant visited!";
						getItemName.style.border = "2px solid red";
						messageArray.push(lastNameError);
				}
				
				if(getfName.value === ""){
						var fNameError = "Please enter your first name!";
						getfName.style.border = "2px solid red";
						messageArray.push(fNameError);

				}

				if(getlName.value === ""){
						var lNameError = "Please enter your last name!";
						getlName.style.border = "2px solid red";
						messageArray.push(lNameError);
				}	

				if(messageArray.length >= 1){
					for(var i=0, j=messageArray.length; i < j; i++){
							var txt = document.createElement('li');
							txt.innerHTML = messageArray[i];
							errorMsg.appendChild(txt);	
					}
					eventData.preventDefault();
					return false;
					}else{
					storeData(this.key);
					}


			}

			var chooseVisited = ["--Last Time Visited--", "24 Hours", "1-2 Days", "3-4 Days", "5-7 Days", "Last week", "Last month"],	
			alcoholValue = "No",
			serverValue = "No";	
			errorMsg = $('errors');	

			makeVisited();


			var displayData = $('displayData');
			displayData.addEventListener("click", getData);
			var clearData = $('clearData');
			clearData.addEventListener ("click", deleteData);
			var saveItem = $('saveItem');
			saveItem.addEventListener ("click", validate);










});