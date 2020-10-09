class Map {
	constructor() {
		this.wall = 1
		this.noWall = 0
		this.shadow = 7
	}
}

const M = new Map()

class Gamesetting{

	canvas
	ctx

	place

	place_wall
	place_shadow

	blocksize

	screen_x 
	screen_y



	player_x
	player_y

	block_gray_width 
	block_gray_height

	map_size_width
	map_size_height

	half_width
	half_height

	
	CM
	constructor(){

		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.place = [];

		this.place_wall=[];
		this.place_shadow=[];

		this.screen_x = 0
		this.screen_y = 0



		this.player_x = 10
		this.player_y = 10


		this.blocksize = 10;	//한블록크기

		this.block_gray_width = Math.floor(this.canvas.width / this.blocksize / 2)
		this.block_gray_height =Math.floor(this.canvas.height / this.blocksize/ 2)	//회색부분 캔버스크기에따라 그거에 반만큼 

		this.map_size_width=500 / this.blocksize
		this.map_size_height=1000 / this.blocksize	//map 전체 사이즈 

		this.height_margin = this.map_size_height - this.block_gray_height + 1
		this.width_margin = this.map_size_width - this.block_gray_width + 1

		this.half_width = Math.floor(this.canvas.width/this.blocksize/2)
		this.half_height = Math.floor(this.canvas.height/this.blocksize/2)


		this.CM="off"
	}

	makemap(){		//맵만들기
		for(let i = 0; i <this.map_size_width; i++){
			let place_line = []
			for(let li = 0; li<this.map_size_height; li++){
				if(li%2===0){
					place_line.push("#04B404")
				} else {
					place_line.push("#088A08")

				}
			}
			this.place.push(place_line)

		}

		for(let i = 1; i<this.canvas.width/this.blocksize; i++){
			let place_line =[]
			for(let li = 1; li<this.canvas.height/this.blocksize; li++){
				place_line.push(0)
			}
			this.place_wall.push(place_line)
		}

	// list 형태 list[x][y]
	//		0	1	2
	//	  0 l	l	l
	//	=>1 i	i	i
	//	  2 s	s	s
	//	  3 t	t	t
	}

	bulid_map(){
		//for(let i=0;i<this.map_size_width;i++){	//위쪽
		//	for(let li=0;li<this.block_gray_height;li++){
		//		this.place[i][li] = "gray"
		//	}
		//}
		//this.place.filter((row, index) => (index>=0 && index < this.map_size_width)).fill("gray", 0, this.block_gray_height)

		//this.place.map((column, index) => index>=0 && index<this.map_size_width && column.fill("gray", 0, this.block_gray_height))


		for(let i=0;i<this.map_size_width;i++){	//위쪽
			this.place[i].fill("gray", 0, this.block_gray_height)
		}
		for(let i=0;i<this.block_gray_width;i++){	//왼쪽
			this.place[i].fill("gray", this.block_gray_height, this.height_margin)
		}
		for(let i=this.map_size_width-this.block_gray_width + 1; i<this.map_size_width; i++){  //오른쪽
			this.place[i].fill("gray", this.block_gray_height, this.height_margin)
		}
		for(let i=0; i<this.map_size_width; i++){  //아레쪽
			this.place[i].fill("gray", this.height_margin, this.map_size_height)
		}
	}

	//그림자 지도 canvas크기 만큼
	make_shadow_map(){
		//this.place_shadow = []
		for(let i = 1; i<this.canvas.width/this.blocksize; i++){
			let place_line =[]
			for(let li = 1; li<this.canvas.height/this.blocksize; li++){
				place_line.push(M.shadow)
			}
			this.place_shadow.push(place_line)
		}
	}


	//벽 지도 canvas크기 만큼
	make_wall_map(){
		for(var i in this.place_wall){
			for(var li in this.place_wall[i]){
				if(this.place[this.screen_x+Number(i)][this.screen_y+Number(li)]==="gray"){
					this.place_wall[i][li] = 1
				}else{
					this.place_wall[i][li] = 0
				}
			}
		}
	}

	//그림자 그리기
	make_shadow(){
		if(this.CM==="off"){
			this.make_shadow_on()
		} else if(this.CM==="on"){
			this.make_shadow_off()
		}

		const ctx = this.ctx
		ctx.fillStyle = "black"
		for(let i in this.place_shadow){			//찍기
			for(let li in this.place_shadow[i]){
				//if(this.place_wall[i][li]===7){
				if(this.place_shadow[Number(i)][Number(li)]===7){
					ctx.fillStyle = "black"
					ctx.fillRect(Number(i)*this.blocksize,Number(li)*this.blocksize,this.blocksize,this.blocksize)
				}
			}
		}

	}

	//off 일때 0으로 바꾸기
	make_shadow_off(){
		for(let i in this.place_shadow){
			for(let li in this.place_shadow[Number(i)]){
				//this.place_wall[i][li] = 0
				this.place_shadow[i][li] = 0
			}
		}
	}


	/**
	 * 그림자를 만드는놈
	 */
	make_shadow_on(){
		this.make_wall_map()

		this.place_shadow.map((column)=> column.fill(M.shadow,0,column.length))

		let x = this.half_width;
		let y = this.half_height;
		this.place_shadow[x][y]=0

		let up = 0
		let down = this.place_shadow[1].length

		//오른쪽 
		while (true) {

			for(let i =this.half_height; i<down; i++){
				this.place_shadow[x][i]= M.noWall
				if (1===this.place_wall[x][i]){
					down = i+1
					break
				}
			}

			for(let i =this.half_height; i>up; i--){
				this.place_shadow[x][i]= M.noWall
				if (1===this.place_wall[x][i]){
					up = i-1
					break
				}
			}

			x+=1
			if(x<this.canvas.width/this.blocksize-1){
				this.place_shadow[x][y] = M.noWall
			} else{
				break
			}


			if(1 === this.place_wall[x][y]){
				break
			}

		}


		//왼쪽
		x = this.half_width;
		y = this.half_height;
		up = 0
		down = this.place_shadow[1].length
		while(true){

			for(let i =this.half_height; i>up; i--){
				this.place_shadow[x][i]= M.noWall
				if (1===this.place_wall[x][i]){
					up = i-1
					break
				}
			}
			for(let i =this.half_height; i<down; i++){
				this.place_shadow[x][i]= M.noWall
				if (1===this.place_wall[x][i]){
					down = i+1
					break
				}
			}

			x-=1
			if(x>0){
				this.place_shadow[x][y] = M.noWall
			} else{
				break
			}


			if(1 === this.place_wall[x][y]){
				break
			}
		}

		//위쪽 
		x = this.half_width;
		y = this.half_height;
		let left = 0
		let right = this.place_shadow.length
		while(true){

			for(let i = this.half_width; i>left; i--){
				this.place_shadow[i][y]=M.noWall
				if (1===this.place_wall[i][y]){
					left = i-1
					break
				}
			}

			for(let i = this.half_width; i<right; i++){
				this.place_shadow[i][y]=M.noWall
				if (1===this.place_wall[i][y]){
					right = i+1
					break
				}
			}


			y-=1
			if(y>0){
				this.place_shadow[x][y] = M.noWall
			} else {
				break
			}

			if(1 === this.place_wall[x][y]){
				break
			}
		}

		// 아레쪽 
		x = this.half_width;
		y = this.half_height;
		left = 0
		right = this.place_shadow.length
		while(true){

			for(let i = this.half_width; i>left; i--){
				this.place_shadow[i][y]=M.wall
				if (1===this.place_wall[i][y]){
					left = i-1
					break
				}
			}

			for(let i = this.half_width; i<right; i++){
				this.place_shadow[i][y]=M.wall
				if (1===this.place_wall[i][y]){
					right = i+1
					break
				}
			}


			y+=1
			if(y<this.canvas.height/this.blocksize-1){
				this.place_shadow[x][y] = M.wall
			} else {
				break
			}

			if(1 === this.place_wall[x][y]){
				break
			}
		}
	}



	/**
	 * 벽그리는 도구 
	 */
	bulid_wall_tool(start_x,start_y,end_x,end_y){
		for(let i = start_x+this.block_gray_width;i<end_x+this.block_gray_width;i++){
			for(let li = start_y+this.block_gray_height; li<end_y+this.block_gray_height; li++){
				this.place[i][li]="gray"
			}
		}
	}


	build_wall_tool_x(start_x,start_y,length){
		for (let i = start_x+this.block_gray_width; i<start_x+length+this.block_gray_width; i++){
			this.place[i][start_y+this.block_gray_height]="gray"
		}
	}
	build_wall_tool_y(start_x,start_y,length){
		for (let i = start_y+this.block_gray_height; i<start_y+length+this.block_gray_height; i++){
			this.place[start_x+this.block_gray_width][i]="gray"
		}

	}
	//----여기까지---

	//그리는놈
	build_wall(){
		this.build_wall_tool_y(1,0,3)
		this.build_wall_tool_x(0,6,3)
		this.build_wall_tool_x(1,3,3)
		this.build_wall_tool_x(4,5,3)
		this.build_wall_tool_y(2,5,3)
		this.build_wall_tool_x(7,3,4)
		this.build_wall_tool_y(7,9,4)
		this.build_wall_tool_x(11,13,6)
		this.build_wall_tool_y(9,10,2)
		this.build_wall_tool_x(16,12,3)
		this.build_wall_tool_y(4,8,4)
		this.build_wall_tool_y(14,8,4)
		this.build_wall_tool_y(10,5,4)
		this.build_wall_tool_x(9,7,4)
		this.build_wall_tool_x(0,15,13)
	}

	//컴퓨터용 조작
	move_direction(){				//방향키중 뭘눌렀는지 확인
		document.addEventListener('keydown',(event)=>{
			const code = {ArrowUp:"up", ArrowDown:"down", ArrowRight:"right",ArrowLeft:"left"}
			let direction = code[event.key]
			let past_screen_x = this.screen_x
			let past_screen_y = this.screen_y
			let past_player_x = this.player_x
			let past_player_y = this.player_y
			if (direction ==="up"){
				this.screen_y -= 1
				this.player_y -= 1
			} else if (direction ==="down"){
				this.screen_y += 1
				this.player_y+= 1
			} else if (direction ==="right"){
				this.screen_x += 1
				this.player_x += 1
			} else if (direction ==="left"){
				this.screen_x -= 1
				this.player_x -= 1
			}
			if(this.place[this.player_x][this.player_y]==="gray"){
				this.screen_x = past_screen_x
				this.screen_y = past_screen_y
				this.player_x = past_player_x
				this.player_y = past_player_y
			}
			//console.log(this.screen_x,this.screen_y)
		})
	} 

	//핸드폰용 조작
	m_move_direction(){
		let clientx_1 = 0
		let clienty_1 = 0
		let clientx_2 = 0
		let clienty_2 = 0

		document.getElementById("html").addEventListener('touchstart',(e)=>{
			clientx_1 = Math.round(e.touches[0].clientX)
			clienty_1 = Math.round(e.touches[0].clientY)
			clientx_2 = Math.round(e.touches[0].clientX)
			clienty_2 = Math.round(e.touches[0].clientY)
		})

		document.getElementById("html").addEventListener('touchmove', (e)=>{
			clientx_2 = Math.round(e.touches[0].clientX)
			clienty_2 = Math.round(e.touches[0].clientY)
		})

		let m_move=setInterval(() => {
			if(Math.abs(clientx_1-clientx_2)<17){
			} else if(clientx_1<clientx_2){
				this.screen_x += 1
				this.player_x += 1
				if (this.place[this.player_x][this.player_y]==="gray"){
					this.player_x -= 1
					this.screen_x-=1
				}
			} else if(clientx_1>clientx_2) {
				this.screen_x -= 1
				this.player_x -= 1
				if (this.place[this.player_x][this.player_y]==="gray"){
					this.player_x += 1
					this.screen_x += 1
				}
			} else {}

			if(Math.abs(clienty_1-clienty_2)<17){
			} else if(clienty_1<clienty_2){
				this.screen_y += 1
				this.player_y += 1
				if (this.place[this.player_x][this.player_y]==="gray"){
					this.player_y -= 1
					this.screen_y -= 1
				}
			} else if(clienty_1>clienty_2) {
				this.screen_y -= 1
				this.player_y -= 1
				if (this.place[this.player_x][this.player_y]==="gray"){
					this.player_y += 1
					this.screen_y += 1
				}
			} else {}
		}, 100);

		document.getElementById("html").addEventListener('touchend', (e)=>{
			clientx_1 = 0
			clienty_1 = 0
			clientx_2 = 0
			clienty_2 = 0
		})
	//	document.getElementById("canvas").addEventListener('touchstart',(e)=>{
	//		let clientx =Math.round(e.touches[0].clientX)
	//		let clienty =Math.round(e.touches[0].clientY)

	//		if (clientx>160){
	//			let judgment = 0
	//			setInterval(() => {
	//				document.getElementById("canvas").addEventListener('touchend',(e)=>{
	//					judgment = 1
	//				})
	//				if (judgment ===0){
	//					this.screen_x += 1
	//					this.player_x += 1
	//					if (this.place[this.player_x][this.player_y]==="gray"){
	//						this.player_x -= 1
	//						this.screen_x-=1
	//					}
	//				}
	//			}, 100);
	//		} else if(clientx<70){
	//			let judgment = 0
	//			setInterval(() => {
	//				document.getElementById("canvas").addEventListener('touchend',(e)=>{
	//					judgment = 1
	//				})
	//				if (judgment ===0){
	//					this.screen_x -= 1
	//					this.player_x -= 1
	//					if (this.place[this.player_x][this.player_y]==="gray"){
	//						this.screen_x+=1
	//						this.player_x += 1
	//					}
	//				}
	//			}, 100);
	//		} else if(clienty>160){
	//			let judgment = 0
	//			setInterval(() => {
	//				document.getElementById("canvas").addEventListener('touchend',(e)=>{
	//					judgment = 1
	//				})
	//				if (judgment ===0){
	//					this.screen_y += 1
	//					this.player_y += 1
	//					if (this.place[this.player_x][this.player_y]==="gray"){
	//						this.screen_y-=1
	//						this.player_y-=1
	//					}
	//				}
	//			}, 100);
	//		} else if(clienty<70){
	//			let judgment = 0
	//			setInterval(() => {
	//				document.getElementById("canvas").addEventListener('touchend',(e)=>{
	//					judgment = 1
	//				})
	//				if (judgment ===0){
	//					this.screen_y -= 1
	//					this.player_y-=1
	//					if (this.place[this.player_x][this.player_y]==="gray"){
	//						this.screen_y+=1
	//						this.player_y+=1
	//					}
	//				}
	//			}, 100);
	//		}
	//	})
	}

	//태두리 그리기
	draw_backgroud(){
		const blocksize = this.blocksize
		const ctx = this.ctx
		const canvas = document.getElementById("canvas")
			ctx.fillRect(0,0,blocksize,canvas.height)
			ctx.fillRect(0,canvas.height-blocksize,canvas.width,blocksize)
			ctx.fillRect(0,0,canvas.width,blocksize)
			ctx.fillRect(canvas.width-blocksize,0,blocksize,canvas.height)
	}


	enter(){		//그리기
		setInterval(() => {
			const ctx = this.ctx
			for (var x=1; x<this.canvas.width/this.blocksize-1; x++){
				for (var y=1; y<this.canvas.height/this.blocksize-1; y++){
					this.color(x,y)
					ctx.fillRect(x*this.blocksize,y*this.blocksize,this.blocksize,this.blocksize)
				}
			}
			ctx.fillStyle = "blue"
			ctx.fillRect(this.half_width*this.blocksize,this.half_height*this.blocksize,this.blocksize,this.blocksize)
			this.make_shadow()
		}, 100);
	}

	//색값돌려주기
	color(x,y){
		const ctx = this.ctx
		ctx.fillStyle = this.place[this.screen_x+x][this.screen_y+y]

	//	console.log(this.now_screen_x,this.now_screen_y)
	}

	//input 받기
	user_input(){
//		const onoff=document.getElementById("shadowOnOff")
//		onoff.addEventListener("mouseup",(e)=>{
//			console.log(onoff.value)
//			if(onoff.value === "on"){
//				onoff.value = "off"
//			}else if(onoff.value === "off"){
//				onoff.value = "on"
//			}
//		})
//
	}

	commandmode(judgment){
		if(judgment==="on"){
			this.CM="on"
		}else if(judgment==="off"){
			this.CM="off"
		}
	}
}
// 해야하는것
// x y 값을 만들고 움직일때마다 1씩  빼고 더하고
//	!함수 : 해당 위차의 색 받기
const gamesetting = new Gamesetting
function main(){
	gamesetting.makemap()
	gamesetting.make_wall_map()

	gamesetting.build_wall()
	gamesetting.bulid_map()
	gamesetting.make_shadow_map()

	gamesetting.m_move_direction()
	gamesetting.move_direction()

	gamesetting.draw_backgroud()
	gamesetting.enter()

	gamesetting.user_input()
}

main()

setInterval(() => {
	if(document.getElementById("command").value==="1"){
		document.getElementById("command").value=""
		gamesetting.commandmode("on")
	}
	if(document.getElementById("command").value==="0"){
		document.getElementById("command").value=""
		gamesetting.commandmode("off")
	}
}, 100);


