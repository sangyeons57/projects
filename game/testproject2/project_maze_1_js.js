class TileType {
	constructor() {
		this.wall = 1
		this.noWall = 0
		this.shadow = 7
	}
}

const tile = new TileType()

class Gamesetting{
	constructor(){
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = 210
		this.canvas.height = 210

		//  지도 배열
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

//		this.map_size_width=500 / this.blocksize
//		this.map_size_height=500 / this.blocksize	//map 전체 사이즈 

//		this.height_margin = this.map_size_height - this.block_gray_height + 1
//		this.width_margin = this.map_size_width - this.block_gray_width + 1

		this.half_width = Math.floor(this.canvas.width/this.blocksize/2)
		this.half_height = Math.floor(this.canvas.height/this.blocksize/2)

		this.end = "false"

		this.CM="off"


		this.level = 0
	}


	start(){
		this.level+=1

		if(this.level===1){
			this.makemap(10,10)
		} else if(this.level===2){
			this.makemap(15,10)
		}else{
		}

		this.map_function()

		setTimeout(() => {
			this.enter()
			this.input_user_draw()
		}, 100);

	}

	makemap(width,height){		//맵만들기
//		for(let i = 0; i <this.map_size_width; i++){
//			let place_line = []
//			for(let li = 0; li<this.map_size_height; li++){
//				if(li%2===0){
//					place_line.push("#04B404")
//				} else {
//					place_line.push("#088A08")
//
//				}
//			}
//			this.place.push(place_line)
//
//		}
		width=width+(this.block_gray_width*2)
		height=height+(this.block_gray_height*2)
		for(let i=0; i<height;i++){
			let place_line=[]
			for(let li=0; li<width;li++){
				if(i%2===0){
					place_line.push("#04B404")
				}else{
					place_line.push("#088A08")
				}
			}
			this.place.push(place_line)
		}
		console.log(this.place.length,this.place[0].length)

		this.bulid_map(width,height)

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

	bulid_map(width,height){
		//for(let i=0;i<this.map_size_width;i++){	//위쪽
		//	for(let li=0;li<this.block_gray_height;li++){
		//		this.place[i][li] = "gray"
		//	}
		//}
		//this.place.filter((row, index) => (index>=0 && index < this.map_size_width)).fill("gray", 0, this.block_gray_height)
		//this.place.map((column, index) => index>=0 && index<this.map_size_width && column.fill("gray", 0, this.block_gray_height))
		for(let i=0;i<this.block_gray_height;i++){	//위쪽
			this.place[i].fill("gray", 0, width)
		}
		for(let i=this.block_gray_height;i<height-this.block_gray_height+1;i++){	//왼쪽
			this.place[i].fill("gray", 0, this.block_gray_width)
		}
		for(let i=this.block_gray_height; i<height-this.block_gray_height; i++){  //오른쪽
			this.place[i].fill("gray", width-this.block_gray_width, width)
		}
		for(let i=height-this.block_gray_height; i<height; i++){  //아레쪽
			this.place[i].fill("gray", 0,width)
		}
	}

	//그림자 지도 canvas크기 만큼
	make_shadow_map(){
		//this.place_shadow = []
		for(let i = 1; i<this.canvas.width/this.blocksize; i++){
			let place_line =[]
			for(let li = 1; li<this.canvas.height/this.blocksize; li++){
				place_line.push(tile.shadow)
			}
			this.place_shadow.push(place_line)
		}
	}


	//벽 지도 canvas크기 만큼
	make_wall_map(){
		for(var i in this.place_wall){
			for(var li in this.place_wall[i]){
				if(this.place[this.screen_y+Number(li)][this.screen_x+Number(i)]==="gray"){
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

		let see =0
		if(this.level===1){
			see=1
		}
		for(let i =Math.floor(this.canvas.width/this.blocksize/2)-see; i<=Math.floor(this.canvas.width/this.blocksize/2)+see; i++){
			for(let li =Math.floor(this.canvas.height/this.blocksize/2)-see; li<=Math.floor(this.canvas.height/this.blocksize/2)+see; li++){
				this.place_shadow[i][li]=0
			}
		}
		const ctx = this.ctx
		ctx.fillStyle = "black"
		for(let i in this.place_shadow){			//찍기
			for(let li in this.place_shadow[i]){
				//if(this.place_wall[i][li]===7){
				if(this.place_shadow[Number(li)][Number(i)]===7){
					ctx.fillStyle = "black"
					ctx.fillRect(Number(li)*this.blocksize,Number(i)*this.blocksize,this.blocksize,this.blocksize)
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

		this.place_shadow.map((column)=> column.fill(tile.shadow,0,column.length))


		//오른쪽 
		let x = this.half_width;
		let y = this.half_height;

		let up = 0
		let down = this.place_shadow[1].length

		while (true) {

			for(let i =this.half_height; i<down; i++){
				this.place_shadow[i][x]= tile.noWall
				if (1===this.place_wall[i][x]){
					down = i+1
					break
				}
			}

			for(let i =this.half_height; i>up; i--){
				this.place_shadow[i][x]= tile.noWall
				if (1===this.place_wall[i][x]){
					up = i-1
					break
				}
			}

			x+=1
			if(x<this.canvas.width/this.blocksize-1){
				this.place_shadow[y][x] = tile.noWall
			} else{
				break
			}


			if(1 === this.place_wall[y][x]){
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
				this.place_shadow[i][x]= tile.noWall
				if (1===this.place_wall[i][x]){
					up = i-1
					break
				}
			}
			for(let i =this.half_height; i<down; i++){
				this.place_shadow[i][x]= tile.noWall
				if (1===this.place_wall[i][x]){
					down = i+1
					break
				}
			}

			x-=1
			if(x>0){
				this.place_shadow[y][x] = tile.noWall
			} else{
				break
			}


			if(1 === this.place_wall[y][x]){
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
				this.place_shadow[y][i]=tile.noWall
				if (1===this.place_wall[y][i]){
					left = i-1
					break
				}
			}

			for(let i = this.half_width; i<right; i++){
				this.place_shadow[y][i]=tile.noWall
				if (1===this.place_wall[y][i]){
					right = i+1
					break
				}
			}


			y-=1
			if(y>0){
				this.place_shadow[y][x] = tile.noWall
			} else {
				break
			}

			if(1 === this.place_wall[y][x]){
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
				this.place_shadow[y][i]=tile.wall
				if (1===this.place_wall[y][i]){
					left = i-1
					break
				}
			}

			for(let i = this.half_width; i<right; i++){
				this.place_shadow[y][i]=tile.wall
				if (1===this.place_wall[y][i]){
					right = i+1
					break
				}
			}


			y+=1
			if(y<this.canvas.height/this.blocksize-1){
				this.place_shadow[y][x] = tile.wall
			} else {
				break
			}

			if(1 === this.place_wall[y][x]){
				break
			}
		}


	}




	map_function(){
		// map_list[y][x]형식
		let map_list=[
			
		   //1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0
		[
			[0,1,0,0,0,0,0,0,0,0],//1
			[0,1,0,1,1,0,1,0,1,0],//2
			[0,0,0,1,0,0,1,0,1,0],//3
			[1,1,0,1,0,1,0,0,1,0],//4
			[0,0,0,1,0,0,1,0,1,0],//5
			[0,1,1,0,1,1,0,1,0,0],//6
			[0,0,0,0,1,0,1,0,1,1],//7
			[0,1,1,1,0,0,0,0,0,0],//8
			[0,1,0,0,0,1,0,1,1,0],//9
			[0,0,0,1,0,1,0,0,1,0]//10

		] ,
		[
			[0,1,0,0,0,0,1,0,0,0,0,0,0,0,0],
			[0,1,0,1,1,0,0,0,1,1,1,1,1,1,0],
			[0,0,0,1,0,0,1,0,0,0,0,0,0,1,0],
			[0,1,0,0,1,1,0,1,0,1,1,1,0,1,0],
			[0,0,1,0,0,0,0,1,1,0,0,0,1,0,0],
			[1,0,1,1,1,1,0,0,0,0,1,0,0,0,1],
			[0,0,0,0,0,0,1,0,1,0,0,1,1,1,0],
			[0,1,1,1,1,0,0,1,0,0,1,1,0,0,0],
			[0,1,0,0,0,1,0,0,1,0,0,0,0,1,0],
			[0,0,0,1,0,1,1,0,1,0,1,1,1,1,0]
		] ,

		[
			[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//1
			[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//2
			[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//3
			[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//4
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//5
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//6
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//7
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//8
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//9
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//10
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//11
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//12
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//13
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//14
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//15
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//16
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//17
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//18
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//19
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//20
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//21
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//22
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//23
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//24
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//25
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//26
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//27
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//28
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//29
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]//30
		]
		]


			
		for(let i in map_list[this.level-1]){
			for(let li in map_list[this.level-1][0]){
				if(map_list[this.level-1][Number(i)][Number(li)]===1){
					this.place[this.block_gray_height+Number(i)][this.block_gray_width+Number(li)] = "gray"
				}
			}
		}
	}

	//게임 끝나는것 세팅
	gameend(){
		const is_game_end = setInterval(() => {
			if(this.level===1){
				this.place[19][19] = "yellow"
					if(this.player_x===19&&this.player_y===19){
						//this.end="true"
						this.CM="on"
						setTimeout(() => {
							this.place=[]
							this.start()
							this.screen_x=0
							this.screen_y=0
							this.player_x=10
							this.player_y=10
							this.CM="off"
						}, 500);
					}
			}else if(this.level===2){
				this.place[19][24] = "yellow"
				const is_game_end = setInterval(() => {
					if(this.player_x===24&&this.player_y===19){
						//this.end="true"
						this.CM="on"
						setTimeout(() => {
							this.place=[]
							this.start()
							clearInterval(is_game_end)
							this.screen_x=0
							this.screen_y=0
							this.player_x=10
							this.player_y=10
							this.CM="off"
						}, 500);
					}
				}, 1000);
			}
		}, 1000);
	}




//	/**
//	 * 벽그리는 도구 
//	 */
//	bulid_wall_tool(start_x,start_y,end_x,end_y){
//		for(let i = start_x;i<=end_x;i++){
//			for(let li = start_y; li<=end_y; li++){
//				this.place[i][li]="gray"
//			}
//		}
//		for(let i = start_x;i>=end_x;i--){
//			for(let li = start_y; li>=end_y; li--){
//				this.place[i][li]="gray"
//			}
//		}
//		for(let i = start_x;i>=end_x;i--){
//			for(let li = start_y; li<=end_y; li++){
//				this.place[i][li]="gray"
//			}
//		}
//		for(let i = start_x;i<=end_x;i++){
//			for(let li = start_y; li>=end_y; li--){
//				this.place[i][li]="gray"
//			}
//		}
//	}
//
//
//	build_wall_tool_x(start_x,start_y,length){
//		for (let i = start_x; i<start_x+length; i++){
//			this.place[i][start_y]="gray"
//		}
//	}
//	build_wall_tool_y(start_x,start_y,length){
//		for (let i = start_y; i<start_y+length; i++){
//			this.place[start_x][i]="gray"
//		}
//
//	}
//	//----여기까지---
//
//	//그리는놈
//	build_wall(){
//		this.bulid_wall_tool(11,10,11,12)
//this.bulid_wall_tool(10,14,12,14)
//this.bulid_wall_tool(13,12,14,12)
//this.bulid_wall_tool(14,13,14,15)
//this.bulid_wall_tool(13,11,13,11)
//this.bulid_wall_tool(16,10,16,12)
//this.bulid_wall_tool(11,16,14,16)
//this.bulid_wall_tool(11,18,16,18)
//this.bulid_wall_tool(16,17,16,14)
//this.bulid_wall_tool(15,14,15,14)
//this.bulid_wall_tool(18,11,18,15)
//this.bulid_wall_tool(10,20,13,20)
//this.bulid_wall_tool(15,21,15,20)
//this.bulid_wall_tool(17,17,18,17)
//this.bulid_wall_tool(18,18,18,20)
//this.bulid_wall_tool(16,20,17,20)
//this.bulid_wall_tool(11,22,11,24)
//this.bulid_wall_tool(11,22,11,24)
//this.bulid_wall_tool(13,22,14,22)
//this.bulid_wall_tool(13,22,14,22)
//this.bulid_wall_tool(12,24,16,24)
//this.bulid_wall_tool(12,24,16,24)
//this.bulid_wall_tool(16,23,17,23)
//this.bulid_wall_tool(16,23,17,23)
//this.bulid_wall_tool(17,22,19,22)
//this.bulid_wall_tool(17,22,19,22)
//this.bulid_wall_tool(19,12,21,12)
//this.bulid_wall_tool(19,12,21,12)
//this.bulid_wall_tool(20,10,20,10)
//this.bulid_wall_tool(20,10,20,10)
//this.bulid_wall_tool(22,10,22,12)
//this.bulid_wall_tool(22,10,22,12)
//this.bulid_wall_tool(19,20,20,20)
//this.bulid_wall_tool(19,20,20,20)
//this.bulid_wall_tool(20,18,22,18)
//this.bulid_wall_tool(20,18,22,18)
//this.bulid_wall_tool(22,19,22,22)
//this.bulid_wall_tool(22,19,22,22)
//this.bulid_wall_tool(21,22,21,24)
//this.bulid_wall_tool(21,22,21,24)
//this.bulid_wall_tool(20,17,20,14)
//this.bulid_wall_tool(20,17,20,14)
//this.bulid_wall_tool(21,14,24,14)
//this.bulid_wall_tool(21,14,24,14)
//this.bulid_wall_tool(24,12,24,11)
//this.bulid_wall_tool(24,12,24,11)
//this.bulid_wall_tool(10,26,12,26)
//this.bulid_wall_tool(14,26,18,26)
//this.bulid_wall_tool(18,25,18,25)
//this.bulid_wall_tool(19,24,19,24)
//this.bulid_wall_tool(19,26,23,26)
//this.bulid_wall_tool(14,27,14,29)
//this.bulid_wall_tool(14,31,11,31)
//this.bulid_wall_tool(12,28,12,29)
//this.bulid_wall_tool(11,28,11,30)
//this.bulid_wall_tool(12,32,12,33)
//this.bulid_wall_tool(13,33,16,33)
//this.bulid_wall_tool(16,32,16,28)
//this.bulid_wall_tool(18,28,18,34)
//this.bulid_wall_tool(10,33,10,33)
//this.bulid_wall_tool(12,34,12,36)
//this.bulid_wall_tool(11,38,13,38)
//this.bulid_wall_tool(11,39,11,39)
//this.bulid_wall_tool(13,40,15,40)
//this.bulid_wall_tool(11,35,11,36)
//this.bulid_wall_tool(14,38,14,35)
//this.bulid_wall_tool(15,35,18,35)
//this.bulid_wall_tool(20,27,20,30)
//this.bulid_wall_tool(20,32,22,32)
//this.bulid_wall_tool(22,31,22,29)
//this.bulid_wall_tool(24,29,24,26)
//this.bulid_wall_tool(20,33,20,36)
//this.bulid_wall_tool(17,39,17,37)
//this.bulid_wall_tool(18,39,21,39)
//this.bulid_wall_tool(24,24,24,17)
//this.bulid_wall_tool(22,16,23,16)
//this.bulid_wall_tool(22,37,22,34)
//this.bulid_wall_tool(23,31,26,31)
//this.bulid_wall_tool(26,30,26,24)
//this.bulid_wall_tool(25,24,25,24)
//this.bulid_wall_tool(25,14,27,14)
//this.bulid_wall_tool(26,15,26,22)
//this.bulid_wall_tool(25,11,29,11)
//this.bulid_wall_tool(31,11,34,11)
//this.bulid_wall_tool(37,10,37,12)
//this.bulid_wall_tool(34,12,34,14)
//this.bulid_wall_tool(35,14,38,14)
//this.bulid_wall_tool(39,13,39,11)
//this.bulid_wall_tool(39,16,32,16)
//this.bulid_wall_tool(32,13,32,15)
//this.bulid_wall_tool(31,12,31,12)
//this.bulid_wall_tool(30,13,30,13)
//this.bulid_wall_tool(30,15,28,15)
//this.bulid_wall_tool(40,18,34,18)
//this.bulid_wall_tool(32,17,32,19)
//this.bulid_wall_tool(30,17,28,17)
//this.bulid_wall_tool(33,20,35,20)
//this.bulid_wall_tool(37,20,39,20)
//this.bulid_wall_tool(37,21,37,23)
//this.bulid_wall_tool(35,22,34,23)
//this.bulid_wall_tool(22,39,26,39)
//this.bulid_wall_tool(23,34,26,34)
//this.bulid_wall_tool(23,36,27,36)
//this.bulid_wall_tool(28,35,28,35)
//this.bulid_wall_tool(29,34,29,29)
//this.bulid_wall_tool(27,31,27,31)
//this.bulid_wall_tool(27,22,27,22)
//this.bulid_wall_tool(28,23,28,26)
//this.bulid_wall_tool(27,27,27,27)
//this.bulid_wall_tool(19,36,19,36)
//this.bulid_wall_tool(30,18,30,21)
//this.bulid_wall_tool(27,19,28,19)
//this.bulid_wall_tool(31,22,33,22)
//this.bulid_wall_tool(35,21,35,21)
//this.bulid_wall_tool(30,24,32,24)
//this.bulid_wall_tool(29,26,35,26)
//this.bulid_wall_tool(35,24,35,25)
//this.bulid_wall_tool(33,24,33,24)
//this.bulid_wall_tool(27,39,31,39)
//this.bulid_wall_tool(33,39,36,39)
//this.bulid_wall_tool(33,39,36,39)
//this.bulid_wall_tool(25,38,28,38)
//this.bulid_wall_tool(25,38,28,38)
//this.bulid_wall_tool(29,36,29,36)
//this.bulid_wall_tool(29,36,29,36)
//this.bulid_wall_tool(30,37,30,37)
//this.bulid_wall_tool(30,37,30,37)
//this.bulid_wall_tool(31,38,31,38)
//this.bulid_wall_tool(31,38,31,38)
//this.bulid_wall_tool(33,38,33,37)
//this.bulid_wall_tool(33,38,33,37)
//this.bulid_wall_tool(32,36,32,35)
//this.bulid_wall_tool(32,36,32,35)
//this.bulid_wall_tool(31,35,31,33)
//this.bulid_wall_tool(31,35,31,33)
//this.bulid_wall_tool(30,31,34,31)
//this.bulid_wall_tool(30,31,34,31)
//this.bulid_wall_tool(33,33,33,33)
//this.bulid_wall_tool(34,34,34,34)
//this.bulid_wall_tool(35,35,35,37)
//this.bulid_wall_tool(35,34,35,34)
//this.bulid_wall_tool(35,34,35,34)
//this.bulid_wall_tool(30,28,30,28)
//this.bulid_wall_tool(30,28,30,28)
//this.bulid_wall_tool(39,29,39,29)
//this.bulid_wall_tool(39,29,39,29)
//this.bulid_wall_tool(36,28,38,28)
//this.bulid_wall_tool(36,28,38,28)
//this.bulid_wall_tool(40,23,40,23)
//this.bulid_wall_tool(40,23,40,23)
//this.bulid_wall_tool(39,24,39,24)
//this.bulid_wall_tool(37,24,37,26)
//this.bulid_wall_tool(38,26,39,26)
//this.bulid_wall_tool(40,27,40,27)
//this.bulid_wall_tool(40,32,40,34)
//this.bulid_wall_tool(37,39,37,39)
//this.bulid_wall_tool(31,40,31,40)
//this.bulid_wall_tool(38,39,40,39)
//this.bulid_wall_tool(37,38,37,36)
//this.bulid_wall_tool(36,29,36,29)
//	}
//
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
			if(this.place[this.player_y][this.player_x]==="gray"){
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

		//처음으로 손댄곳 위치가저오기
		document.getElementById("html").addEventListener('touchstart',(e)=>{
			clientx_1 = Math.round(e.touches[0].clientX)
			clienty_1 = Math.round(e.touches[0].clientY)
			clientx_2 = Math.round(e.touches[0].clientX)
			clienty_2 = Math.round(e.touches[0].clientY)
		})

		//움직인곳 가지고오기
		document.getElementById("html").addEventListener('touchmove', (e)=>{
			clientx_2 = Math.round(e.touches[0].clientX)
			clienty_2 = Math.round(e.touches[0].clientY)
		})

		//첫번째 위치값과 두번째 위치값을 비교해서움직이기

		//대각선움직임가능할때
		let m_move=setInterval(() => {
			if(Math.abs(clientx_1-clientx_2)<15){
			} else if(clientx_1<clientx_2){
				this.screen_x += 1
				this.player_x += 1
				if (this.place[this.player_y][this.player_x]==="gray"){
					this.player_x -= 1
					this.screen_x-=1
				}
			} else if(clientx_1>clientx_2) {
				this.screen_x -= 1
				this.player_x -= 1
				if (this.place[this.player_y][this.player_x]==="gray"){
					this.player_x += 1
					this.screen_x += 1
				}
			} else {}

			if(Math.abs(clienty_1-clienty_2)<15){
			} else if(clienty_1<clienty_2){
				this.screen_y += 1
				this.player_y += 1
				if (this.place[this.player_y][this.player_x]==="gray"){
					this.player_y -= 1
					this.screen_y -= 1
				}
			} else if(clienty_1>clienty_2) {
				this.screen_y -= 1
				this.player_y -= 1
				if (this.place[this.player_y][this.player_x]==="gray"){
					this.player_y += 1
					this.screen_y += 1
				}
			} else {}
		}, 230);

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


	input_user_draw(){
		document.addEventListener('keydown',(event)=>{
			this.enter()
		});
	}
	
	enter(){		//그리기
		const ctx = this.ctx
		for (var x=1; x<this.canvas.height/this.blocksize-1; x++){
			for (var y=1; y<this.canvas.width/this.blocksize-1; y++){
				ctx.fillStyle = this.place[this.screen_y+y][this.screen_x+x]
				ctx.fillRect(x*this.blocksize,y*this.blocksize,this.blocksize,this.blocksize)
			}
		}
		ctx.fillStyle = "blue"
		ctx.fillRect(this.half_width*this.blocksize,this.half_height*this.blocksize,this.blocksize,this.blocksize)
		this.make_shadow()
	}


	//input 받기
	user_input(){
	}

	//사용자가 위치를 계속찍어주는열할
	usermode(){
		const um=document.getElementById("usermode")
		setInterval(() => {
			um.innerHTML=`현재위치:${this.player_x},${this.player_y}`
			um.innerText+="\n 목표:40,40"
		}, 100);
	}

	//계발자모드로바꾸기<=>사용자모드로바꾸기
	commandmode(judgment){
		if(judgment==="on"){
			this.CM="on"
			this.commandmode_changer()
		}else if(judgment==="off"){
			this.CM="off"
			this.usermode()
			this.usermode_changer()
		}
		this.enter()
	}

	//벽을 인식가능하게 다시 바꾸기
	usermode_changer(){
		for(let i=this.block_gray_width; i<=this.place.length-this.block_gray_width; i++){
			for(let li = this.block_gray_height; li<=this.place[0].length-this.block_gray_height; li++){
				if(this.place[i][li]==="Gray"){
					this.place[i][li]="gray"
				}
			}
		}
	}

	//벽을 인식하지 못하게바꾸기
	commandmode_changer(){
		for(let i=this.block_gray_width; i<this.place.length-this.block_gray_width; i++){
			for(let li = this.block_gray_height; li<this.place[0].length-this.block_gray_height; li++){
				if(this.place[i][li]=== "gray"){
					this.place[i][li]= "Gray"
				}
			}
		}
	}

//	//벽만드는것을 도와주는놈 1번째 스페이스 와 2번째 스페이스 위치값을 가지고와서 벽을 생성해주고 명령어를 만드는놈
//	commandmode_maker(){
//		const cws=document.getElementById("command_wallmaker_supporter")
//		const cws1=document.getElementById("command_wallmaker_supporter_1")
//		let storage=[]
//		let s_storage=[]
//		let step = 0
//		document.addEventListener('keydown',(e)=>{
//			if(e.code==="Space"){
//				if(step === 0){
//					storage.push(this.player_x,this.player_y)
//					cws.innerText=`(${this.player_x},${this.player_y})`
//					step=1
//				} else if(step === 1){
//					storage.push(this.player_x,this.player_y)
//
//					s_storage=storage
//					s_storage.push(cws1)
//
//					cws.innerText+=`(${this.player_x},${this.player_y})`
//					cws1.innerText+=`this.bulid_wall_tool(${storage[0]},${storage[1]},${storage[2]},${storage[3]})\n`
//
//					for(let i = storage[0];i<=storage[2];i++){
//						for(let li = storage[1]; li<=storage[3]; li++){
//							this.place[i][li]="#FF0000"
//						}
//					}
//
//					for(let i = storage[2];i>=storage[0];i--){
//						for(let li = storage[3]; li>=storage[1]; li--){
//							this.place[i][li]="#FF0000"
//						}
//					}
//					for(let i = storage[2];i>=storage[0];i--){
//						for(let li = storage[3]; li<=storage[1]; li++){
//							this.place[i][li]="#FF0000"
//						}
//					}
//					for(let i = storage[2];i<=storage[0];i++){
//						for(let li = storage[3]; li>=storage[1]; li--){
//							this.place[i][li]="#FF0000"
//						}
//					}
//
//					storage=[]
//					step=0
//				}
//			}
//		})
//	}


	//타이머 만들기
	time_counter(){
		let judgment=0
		const timer_on=setInterval(() => {
			document.addEventListener("keydown",(event)=>{
				judgment=1
				clearInterval(timer_on)
			})
		}, 1000);
		const timer_on_m=setInterval(() => {
			document.getElementById("html").addEventListener('touchstart',(e)=>{
				judgment=1
				clearInterval(timer_on_m)
			})
		}, 1000); 

		let min=0
		let sec=0

		const timer=document.getElementById("timer")

		const timer_writer = setInterval(() => {
			if(judgment===1){
				sec+=1
				if(sec>60){
					sec=0
					min+=1
				}
			}
			timer.innerText=`${min<10 ? "0"+min : min} : ${sec<10 ? "0"+sec : sec}`
			if(this.end==="true"){
				clearInterval(timer_writer)
			}
		}, 1000);
	}
}
// 해야하는것
// x y 값을 만들고 움직일때마다 1씩  빼고 더하고
//	!함수 : 해당 위차의 색 받기
const gamesetting = new Gamesetting
function main(){
	gamesetting.start()
//	gamesetting.makemap()
//	gamesetting.make_wall_map()

//	gamesetting.build_wall()


	gamesetting.bulid_map()
	gamesetting.make_shadow_map()

	gamesetting.gameend()

	gamesetting.m_move_direction()
	gamesetting.move_direction()

	gamesetting.draw_backgroud()

	gamesetting.user_input()
	gamesetting.time_counter()
}

main()

let cm = "off"
gamesetting.commandmode(cm)
document.getElementById("command").addEventListener("click",()=>{
	if(cm ==="off"){
		cm="on"
		gamesetting.commandmode(cm)
	} else if(cm === "on"){
		cm="off"
		gamesetting.commandmode(cm)
	}
})


