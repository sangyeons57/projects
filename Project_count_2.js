
var list_1 = [];   //자료 값 리스트
var list_1_1 = []; // 자료값의 개수 
var list_2 = [];   // 차수 
var list_2_1 = [];     // 차수 제곱 * 변량
var aver = 0       // 평균
var answer = 0;    // 분산

// 자료개수 세기
function datum (){
	var d = Number(prompt("자료게수"));
	if (isNaN(d)){
		alert("실수가 아닙니다.")
		datum()
	} else {
		for (var i = 1; i < d+1; i++){
			var input = Number(prompt(i+"번째 자료값"))
			if (isNaN(input)){
				i = i-1;
				alert("실수가아닙니다.")
			} else {
				list_1.push(input);
				var input_1 = Number(prompt(i+"번째 자료값의 개수"))	
				if (isNaN(input_1)){
					i = i-1;;
					alert("실수가 아닙니다.")
				} else {
					list_1_1.push(input_1);
				}
			}
		}
	}
}


Calculation = {
	//평균
	average: function() {
		var ad = 0
		for (var i of list_1){
			ad += i;
		}
		aver = ad / list_1.length
	},

	//차수
	subtract: function () {
		var li = 0;
		for (var i of list_1){
			list_2.push(i - aver);   //차수
			list_2_1.push((i-aver)*(i-aver)*(list_1_1[li]))    //  차수제곱 * 그 자료값의 개수
			li += 1
		}
	},

	Dispersion: function () {
		var ad = 0;
		for (var i of list_2_1){
			ad += i;
		}
		answer = ad/list_1.length
	}
}

var re = function() {
	while (true){
		var more = prompt("다시 사용할거면=> enter만누르기   다시사용 안할거면=>아무거나 쓰기")
		if (more == ""){
			break
		} else {
			count()
			dispersion()
		}
	}
}



var ex = document.getElementById("ex")

function expression () {
	alert(`자료값: ${list_1}  자료값의 개수: ${list_1_1} 차수: ${list_2} 차수의 제곱 * 변량: ${list_2_1}  평균: ${aver} 분산: ${answer}`)
	ex.innerHTML = `자료값: ${list_1}<br>
	자료값의 개수: ${list_1_1}<br>
	차수: ${list_2} <br>
	차수의 제곱 * 변량: ${list_2_1}<br>
	평균: ${aver}<br>
	분산: ${answer}<br>`
	list_1 = []; list_1_1 = []; list_2 = []; list_2_1 = []; aver = 0; answer=0;
}

var t = document.getElementById("DistributionTable");
t.addEventListener('click', function(){
	ex.innerHTML= ""
	datum()
	Calculation.average()
	Calculation.subtract()
	Calculation.Dispersion()
	expression()
	if(check1.checked){
		re()
	}
})