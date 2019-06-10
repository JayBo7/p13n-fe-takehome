
const cols = document.getElementsByClassName("column");

var scroll_position = 0;
var ticking = false;
var viewedCols = {};

window.addEventListener('scroll', (e) => {

  window.requestAnimationFrame(() => {
    for (let i = 0; i < cols.length; i++) {
			checkVisibility(cols[i]);
		}
  });

})

const checkVisibility = col => {

	var visible = false;
	var element = document.querySelector(`#${col.getAttribute('id')}`);
	var top = element.getBoundingClientRect().top + parseFloat(getComputedStyle(element).paddingTop)
	var bottom = element.getBoundingClientRect().bottom - parseFloat(getComputedStyle(element).paddingBottom)
	var height = parseFloat(getComputedStyle(element, ':after').height)

	if (isNaN(height)) {
		return;
	}

	if (checkText(element)) {
		top += parseFloat(getComputedStyle(element).fontSize);
	}

	if (((bottom > 0 && bottom <= window.innerHeight) || (top > 0 && top <= window.innerHeight))) {
		logVisibility(top, bottom, height, element, viewedCols[element.getAttribute('id')]);
	} else {
		viewedCols[element.getAttribute('id')] = 0;
	}

}

const checkText = ele => {
	ele.inner ? true : false;
}

const logVisibility = (top, bottom, height, element, status = 0) => {

  if (status < 1) {
  	console.log(`%cColumn with ${element.getAttribute('id')} started to become visible on the page.`, "color: red");
  	viewedCols[element.getAttribute('id')] = 1;  
  }
  if (((bottom >= Math.floor(height/2) && top + height/2 <= window.innerHeight) && status < 2)) {
  	console.log(`%cColumn with ${element.getAttribute('id')} is now more than 50% visible on the page.`, "color: green");
  	viewedCols[element.getAttribute('id')] = 2;  
  } 
	if ((bottom <= window.innerHeight && bottom >= height) && status < 3){
    console.log(`%cColumn with ${element.getAttribute('id')} is now fully visible on the page.`, "color: blue");
    viewedCols[element.getAttribute('id')] = 3;     
  }
}
