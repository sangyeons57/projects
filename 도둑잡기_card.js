
class Member {
	people
	computer
	constructor() {
		this.people = Number(prompt("사람수"))
		this.computer = Number(prompt("컴퓨터수"))
	}
}

class Deck {
	deck    // 전체카드 
	number
	unnumber
	players			//  선수들
	constructor() {
		this.number = ["A","2","3","4","5","6","7","8","9","10","K","Q","J"]
		this.unnumber = ["스페이드","하트","다이아몬드","클로바"]
		this.deck = []
		this.players = []
	}

	makecard() {
		for (var i of this.unnumber){
			for(var li of this.number){
				this.deck.push(i+li);
			}
		}
		this.deck.push("조커")
		console.log(this.deck)
	}

	suffle() {
		var x='';
		var y=0;
		for(var i in this.deck){
			x = this.deck[i]
			y = Math.floor(Math.random()*this.deck.length)
			this.deck[i] = this.deck[y]
			this.deck[y] = x;
		}
		console.log(this.deck);
	}

	distribution(){
		const members = new Member()
		if (Number.isInteger(members.people)||Number.isInteger(members.computer)){
			// 선수들 전체수 결정, players 에 선수명수만큼 array 집어넣음
			const playerNum = members.people + members.computer

			//for(var o = 0; o < playerNum; o++) {
			//	this.players.push([])
			//	console.log(this.players)
			//}
			// 위코드를 아레코드로 줄임
			this.players = Array.from({length: playerNum}, () => [])

			while (this.deck.length) {
				for(let player of this.players) {
					let curCard = this.deck.pop()
					if (curCard) player.push(curCard) 
					else break
				}
			}
			console.table(this.players)

		} else {
			alert("자연수아닙니다")
			this.distribution()
		}
		return members
	}
}


class Game {
	players_name
	constructor(members){
		this.deck = new Deck()
		this.players_name = []
		this.members = members
	}

//	sequence(){
//		this.players_name = Array.from({length: this.members.people}, (undefined, i) => prompt(`플레이어 ${i+1} 의 이름`))
//		const computer_name = Array.from({length: this.members.computer}, (undefined, i) => `com${i+1}`)
//		console.table(this.players_name)
//		console.table(computer_name)
//		this.players_name = this.players_name.concat(computer_name)
//		console.table(this.players_name)
//
//		console.log(`참가자: ${this.players_name}`)
//	}
	sequence(){
		for (var i = 1; i<=this.members.people; i++){this.players_name.push(`p${i}`)}
		for (var i = 1; i<=this.members.computer; i++){this.players_name.push(`com${i}`)}
		console.log(this.players_name);
	}
}




function main() {
	const deck = new Deck()
	deck.makecard();
	deck.suffle();
	const members = deck.distribution();
	const game = new Game(members)
	game.sequence();
}

main();