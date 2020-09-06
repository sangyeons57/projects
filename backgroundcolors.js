
var t = document.getElementById("changecolor")
var t_1 = document.getElementById("co")

var num = 0
var backcolors = ""
var strcolors =""

function changecolors (){
	var change = prompt("<바탕색,글자색> 형식을로 영어로")
	var listchange = change.split(",")
	document.body.style.background = listchange[0]
	document.body.style.color = listchange[1]
}

t.addEventListener("click",function(){
	if (num === 1){
		backcolors = "white"
		strcolors = "black"
		num =0
	} else{
		backcolors = "black"
		strcolors = "white"
		num = 1
	}
	document.body.style.background= backcolors;
	document.body.style.color= strcolors;

})
t_1.addEventListener("click",function(){
	changecolors();
})
