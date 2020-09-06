
var stop = true
var answer = 0 
var ex = document.getElementById("ex")

var list_1 = []
var count = function() {
	var c = prompt("자료 수")
	while (isNaN(Number(c))){
		c = prompt("숫자가 아닙니다.")
	}
	c = Number(c)
	for(var i = 1; i <= c; i++){
		list_1.push(Number(prompt(i+"번째 자리 자료")))
		console.log(list_1)
	}
}

var dispersion = function(){
	var add = 0
	for (var i in list_1){
		add += list_1[i]
		console.log("합"+add);
	}
	aver = add / list_1.length
	console.log("평균"+aver)
	add =0
	for (var i of list_1){
		add += (i - aver) *(i-aver)
		console.log("편차" + (i-aver))
		console.log("편차의제곱의합=>"+add)
	}
	answer= add/list_1.length
	ex.innerHTML= `자료: ${list_1}   평균: ${aver}   분산: ${answer}`
	console.log("분산=>"+ answer)
	alert("평균=>"+aver+ "   분산=>"+answer)
	list_1 = []
	aver = 0
	add = 0
	answer = 0
}

var re = function() {
	while (true){
		var more = prompt("다시 사용 안할거면=> enter만누르기   다시사용 할거면=>아무거나 쓰기")
		if (more == ""){
			break
		} else {
			count()
			dispersion()
		}
	}
}

var t = document.getElementById('dispersion')
var check1 = document.getElementById('check1')

t.addEventListener('click', function(){
	ex.innerHTML= ""
	count()
	dispersion()
	if(check1.checked){
		re()
	} else {
	}
})