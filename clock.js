

const ex1 = document.getElementById("clock")
const ex2 = document.getElementById("today")
const datlist = ["일","월","화","수","목","금","토"]

function getTime(){
	const date = new Date();

	const year = date.getFullYear();
	const month = date.getMonth()+1;
	const todaydate = date.getDate();
	const day = date.getDay();

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	if(hours>12){
		ex1.innerHTML = `오후 ${(hours -12) < 10 ? `0${hours-12}` : hours-12}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	} else{
		ex1.innerHTML = `오전 ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	}
	ex2.innerHTML = `${year} / ${month} / ${todaydate} (${datlist[day]})`
}

function init(){
	getTime();
	setInterval(getTime,1000);
}
init();
