let subMenuItems = document.getElementsByClassName('li_main');
let menuDivItems = document.getElementsByClassName("menuDiv");

for(let i=0; i < subMenuItems.length; i++){
	 subMenuItems[i].addEventListener("mouseenter", showSubMenu, false);
	 subMenuItems[i].addEventListener("mouseleave", hideSubMenu, false);

	 let thirdMenuItems = subMenuItems[i].getElementsByClassName('li_sub');

	 for(let j = 0; j < thirdMenuItems.length; j++){
		 thirdMenuItems[j].addEventListener("mouseenter", showMenuWrap(j), false);
		 thirdMenuItems[j].addEventListener("mouseleave", hideThirdMenu, false);
	}
}

for(let i=0; i < menuDivItems.length; i++){
	 menuDivItems[i].addEventListener("mouseenter", chosenMenuItem, false);
	 menuDivItems[i].addEventListener("mouseleave", hideMenuItem, false);
}

function showSubMenu(e){
	this.children[1].style.position = "absolute";
	this.children[1].style.display = "block";
}

function hideSubMenu(e){
	this.children[1].style.display = "none";
}

function showMenuWrap(i){
	return function(){
		this.children[1].style.position = "absolute";
		this.children[1].style.top = 40 * i + "px";
		this.children[1].style.display = "block";
	}
}

function hideThirdMenu(e){
	this.children[1].style.display = "none";
}

function chosenMenuItem(e){
	this.style.backgroundColor = "grey";
}

function hideMenuItem(e){
	this.style.backgroundColor = "black";
}
