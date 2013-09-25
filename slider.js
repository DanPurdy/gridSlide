function gridSlide( container, nav ) {
	this.container = container;
	this.nav = nav.show();

	this.list = this.container.find('ul');

	this.imgs=[],
	this.imgWidth = [],
	this.imgHeight = [],
	this.imgsLen = [];
	this.current = [0,0];


	for(i=0; i<this.list.length; i++){
		
		this.imgs[i] = $(this.list[i]).find('img');
		this.imgWidth[i] = this.imgs[i][i].width;
		this.imgHeight[i] = this.imgs[i][i].height;
		this.imgsLen[i] = this.imgs[i].length;
		$(this.list[i]).width(this.imgWidth[i]*this.imgsLen[i]);

	}


	
}

gridSlide.prototype.transition = function( x, y ) {
	this.list.stop().animate({
		'margin-left': x || -( this.current[0] * this.imgWidth[this.current[1]]),
		'top': y || -( this.current[1] * this.imgHeight[this.current[1]])

	});
};

gridSlide.prototype.setCurrent = function( dir ) {
	
	if (dir === 'next' || dir === 'prev'){

		var pos = this.current[0];

		pos += ( ~~( dir === 'next' ) || -1 );

		this.current[0] = ( pos < 0 ) ? this.imgsLen[this.current[1]] - 1 : pos % this.imgsLen[this.current[1]];

		return pos;

	}else {
		var level = this.current[1];

		level += ( ~~(dir === 'down') || -1);

		this.current[1] = (level < 0) ? this.list.length -1 : level % this.list.length;


		if(this.current[0] > this.imgsLen[this.current[1]] -1){
			this.current[0] = this.imgsLen[this.current[1]] -1;
		}


		return level;

	};
};


