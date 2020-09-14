class Gamesetting{

	canvas
	ctx

	place

	place_judgment_wall
	place_judgment_shadow

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
	constructor(){
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.place = [];

		this.place_judgment_wall=[];
		this.place_judgment_shadow=[];

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
			this.place_judgment_wall.push(place_line)
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
	//	for(let i=0;i<this.map_size_width;i++){	//위쪽
	//		this.place[i].fill("gray", 0, this.block_gray_height)
	//	}
		//this.place.filter((row, index) => (index>=0 && index < this.map_size_width)).fill("gray", 0, this.block_gray_height)
		this.place.map((column, index) => index>=0 && index<this.map_size_width && column.fill("gray", 0, this.block_gray_height))
		for(let i=0;i<this.block_gray_width;i++){	//왼쪽
			//for(let li=this.block_gray_height;li<this.map_size_height-this.block_gray_height + 1;li++){
			//	this.place[i][li] = "gray"
			//}
			this.place[i].fill("gray", this.block_gray_height, this.height_margin)
		}
		for(let i=this.map_size_width-this.block_gray_width + 1; i<this.map_size_width; i++){  //오른쪽
			//for(let li=this.block_gray_height;li<this.map_size_height-this.block_gray_height + 1;li++){
			//	this.place[i][li] = "gray"
			//}
			this.place[i].fill("gray", this.block_gray_height, this.height_margin)
		}
		for(let i=0; i<this.map_size_width; i++){  //아레쪽
			//for(let li=this.map_size_height-this.block_gray_height + 1;li<this.map_size_height;li++){
			//	this.place[i][li] = "gray"
			//}
			this.place[i].fill("gray", this.height_margin, this.map_size_height)
		}
	}

	make_shadow_map(){
		this.place_judgment_shadow = []
		for(let i = 1; i<this.canvas.width/this.blocksize; i++){
			let place_line =[]
			for(let li = 1; li<this.canvas.height/this.blocksize; li++){
				place_line.push(7)
			}
		this.place_judgment_shadow.push(place_line)
		}
	}

	make_wall_map(){
		for(var i in this.place_judgment_wall){
			for(var li in this.place_judgment_wall[i]){
				if(this.place[this.screen_x+Number(i)][this.screen_y+Number(li)]==="gray"){
					this.place_judgment_wall[i][li] = 1
				}else{
					this.place_judgment_wall[i][li] = 0
				}
			}
		}
	}

	make_shadow(){
		const onoff = document.getElementById("shadowOnOff")
		if(onoff.value==="off"){
			this.make_shadow_on()
		} else if(onoff.value==="on"){
			this.make_shadow_off()
		}


		const ctx = this.ctx
		ctx.fillStyle = "black"
		for(let i in this.place_judgment_shadow){			//찍기
			for(let li in this.place_judgment_shadow[i]){
				//if(this.place_judgment_wall[i][li]===7){
				if(this.place_judgment_shadow[Number(i)][Number(li)]===7){
					ctx.fillStyle = "black"
					ctx.fillRect(Number(i)*this.blocksize,Number(li)*this.blocksize,this.blocksize,this.blocksize)
				}
			}
		}

	}

	make_shadow_off(){
		for(let i in this.place_judgment_wall){
			for(let li in this.place_judgment_wall[Number(i)]){
				//this.place_judgment_wall[i][li] = 0
				this.place_judgment_shadow[i][li] = 0
			}
		}
	}


	make_shadow_on(){
	//	this.make_shadow_map()
	//	for(let i in this.place_judgment_wall){
	//		for(let li in this.place_judgment_wall[i]){
	//			if(this.place_judgment_wall[i][li]===1){ //회색블럭확인

	//				if(this.half_height === Number(li)){  //가로확인
	//					if(Number(i)<this.half_width){  //왼쪽인지
	//						//ctx.fillRect(0,li*this.blocksize,Number(i)*this.blocksize,this.blocksize)
	//						for(let oli=0; oli<Number(i); oli++){
	//							this.place_judgment_wall[oli][li]=7
	//						}
	//					}else if(Number(i)>this.half_width){  //오른쪽인지 
	//						//ctx.fillRect((Number(i)+1)*this.blocksize,li*this.blocksize,this.half_width*this.blocksize,this.blocksize)
	//						for(let oli=Number(i)+1; oli<this.place_judgment_wall.length; oli++){
	//							this.place_judgment_wall[oli][li]=7
	//						}
	//					}
	//				}

	//				if(this.half_width === Number(i)){  //세로확인
	//					if(Number(li)<this.half_height){ //위인지
	//						for(let oli=0; oli<Number(li);oli++){
	//							this.place_judgment_wall[i][oli]=7
	//						}
	//					}
	//					if(Number(li)>this.half_height){ //아래인지
	//						for(let oli=Number(li)+1; oli<this.place_judgment_wall[i].length;oli++){
	//							this.place_judgment_wall[i][oli]=7
	//						}
	//					}
	//				}

	//			}
	//		}
	//	}


//		this.make_wall_map()
//		for(let i in this.place_judgment_wall){
//			for(let li in this.place_judgment_wall[i]){
//				if(this.place_judgment_wall[i][li]===1){
//					if(i<Math.floor(this.place_judgment_wall.length/2)){
//						for (let oli = 0; oli<i; oli++){
//							this.place_judgment_wall[oli][li] = 7
//						}
//					} else if(i>Math.floor(this.place_judgment_wall.length/2)) {
//		 				for(let oli = Number(i)+1; oli<this.canvas.width/this.blocksize-1;oli++){
//		 					this.place_judgment_wall[oli][Number(li)]=7
//		 				}
//					} else{
//					}
//					if(li<Math.floor(this.place_judgment_wall[i].length/2)){
//						for (let oli = 0; oli<li;oli++){
//							this.place_judgment_wall[i][oli] = 7
//						}
//					} else if(li>Math.floor(this.place_judgment_wall[i].length/2)){
//						for (let oli = Number(li)+1; oli<Number(this.canvas.height)/this.blocksize-1;oli++){
//							this.place_judgment_wall[i][oli] = 7
//						}
//					} else {
//
//					}
//				}
//				//if(Number(i)===(this.canvas.width-(2*this.blocksize))/this.blocksize/2){
//					//console.log("1")
//					//for(let ol in this.place_judgment_wall[i]){
//						//if(this.place_judgment_wall[i][ol]===1){
//							//for(let oli =0; oli<ol; oli++){
//								//this.place_judgment_wall[i][oli]=0
//							//}
//
//						//}
//					//}
//				//}
//
//			}
//		}


		this.make_shadow_map()
		for(let i = Math.ceil(this.canvas.height/this.blocksize/2); i>0; i--){
			console.log(Math.ceil(this.canvas.width/this.blocksize/2))
			console.log(i)
			if(this.place_judgment_wall[Math.ceil(this.canvas.width/this.blocksize/2)][i]===1){
				for(let li = 0; li<i-1; li++){
					this.place_judgment_shadow[Math.ceil(this.canvas.width/this.blocksize/2)][li] = 0
				}
				break
			}
		}
	}

	bulid_wall_tool(start_x,start_y,end_x,end_y){
		for(let i = start_x+10;i<end_x+10;i++){
			for(let li = start_y+10; li<end_y+10; li++){
				this.place[i][li]="gray"
			}
		}
	}


	build_wall_tool_x(start_x,start_y,length){
		for (let i = start_x+10; i<start_x+length+10; i++){
			this.place[i][start_y+10]="gray"
		}
	}
	build_wall_tool_y(start_x,start_y,length){
		for (let i = start_y+10; i<start_y+length+10; i++){
			this.place[start_x+10][i]="gray"
		}

	}

	build_wall(){
		this.build_wall_tool_y(1,0,3)
		this.build_wall_tool_x(0,6,3)
		this.build_wall_tool_x(1,3,3)
		this.build_wall_tool_x(4,5,3)
		this.build_wall_tool_y(2,5,3)
	}

	move_direction(){				//방향키중 뭘눌렀는지 확인
		document.addEventListener('keydown',(event)=>{
			const code = {38:"up", 40:"down", 39:"right",37:"left"}
			let direction = code[event.keyCode]
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


	m_move_direction(){
		document.getElementById("canvas").addEventListener('touchstart',(e)=>{
			let clientx =Math.round(e.touches[0].clientX)
			let clienty =Math.round(e.touches[0].clientY)

			if (clientx>160){
				let judgment = 0
				setInterval(() => {
					document.getElementById("canvas").addEventListener('touchend',(e)=>{
						judgment = 1
					})
					if (judgment ===0){
						this.screen_x += 1
						this.player_x += 1
						if (this.place[this.player_x][this.player_y]==="gray"){
							this.player_x -= 1
							this.screen_x-=1
						}
					}
				}, 100);
			} else if(clientx<70){
				let judgment = 0
				setInterval(() => {
					document.getElementById("canvas").addEventListener('touchend',(e)=>{
						judgment = 1
					})
					if (judgment ===0){
						this.screen_x -= 1
						this.player_x -= 1
						if (this.place[this.player_x][this.player_y]==="gray"){
							this.screen_x+=1
							this.player_x += 1
						}
					}
				}, 100);
			} else if(clienty>160){
				let judgment = 0
				setInterval(() => {
					document.getElementById("canvas").addEventListener('touchend',(e)=>{
						judgment = 1
					})
					if (judgment ===0){
						this.screen_y += 1
						this.player_y += 1
						if (this.place[this.player_x][this.player_y]==="gray"){
							this.screen_y-=1
							this.player_y-=1
						}
					}
				}, 100);
			} else if(clienty<70){
				let judgment = 0
				setInterval(() => {
					document.getElementById("canvas").addEventListener('touchend',(e)=>{
						judgment = 1
					})
					if (judgment ===0){
						this.screen_y -= 1
						this.player_y-=1
						if (this.place[this.player_x][this.player_y]==="gray"){
							this.screen_y+=1
							this.player_y+=1
						}
					}
				}, 100);
			}
		})
	}

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
			ctx.fillRect(10*this.blocksize,10*this.blocksize,this.blocksize,this.blocksize)
			this.make_shadow()

		}, 100);
	}

	color(x,y){
		const ctx = this.ctx
		ctx.fillStyle = this.place[this.screen_x+x][this.screen_y+y]

	//	console.log(this.now_screen_x,this.now_screen_y)
	}

	user_input(){
		const onoff=document.getElementById("shadowOnOff")
		onoff.addEventListener("mouseup",(e)=>{
			console.log(onoff.value)
			if(onoff.value === "on"){
				onoff.value = "off"
			}else if(onoff.value === "off"){
				onoff.value = "on"
			}
		})

	}
}
// 해야하는것
// x y 값을 만들고 움직일때마다 1씩  빼고 더하고
//	!함수 : 해당 위차의 색 받기
const gamesetting = new Gamesetting
function main(){
	gamesetting.makemap()


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

