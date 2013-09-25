function gridSlide( container, nav, grid ) {
	this.slider = container;
	this.nav = nav.show();

	var self = this;

	$('head').append('<link rel="stylesheet" href="gridslide.css" type="text/css" />');

	this.navText = '<div class="nav-buttons"><button class="horizontal" data-dir="prev">'+ 'Prev' + '</button><button class="horizontal" data-dir="next">' + 'Next' + '</button>';
	this.navText += '<button class="vertical" data-dir="up">'+ 'Up' + '</button><button class="vertical" data-dir="down">' + 'Down' + '</button></div>';
	this.nav.append(this.navText);

	this.list = this.slider.find('ul');

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

	if (grid){

		this.gridText ='<div class="grid-nav">';

		for(i=0; i <this.list.length; i++){

			this.gridText += '<div class="grid-nav-layer">';
			for(j=0; j< this.imgs[i].length; j++){
				this.gridText += '<span class="grid-nav-icon" data-x="'+ j +'" data-y="' + i +'" >X</span>';
			}
			this.gridText += '</div>';
		}

		this.nav.append(this.gridText);
	}

	$('.grid-nav-icon').on('click', function(){

		self.transition($(this).data('x'), $(this).data('y'));
	});

	$('.nav-buttons').find('button').on('click', function() {
		self.setCurrent( $(this).data('dir') );
		self.transition();
	});


	
}

gridSlide.prototype.transition = function( x, y ) {

	if(x>=0){this.current[0]=x;}
	if(y>=0){this.current[1]=y;}

	this.list.stop().animate({
		'margin-left': -( this.current[0] * this.imgWidth[this.current[1]]),
		'top': -( this.current[1] * this.imgHeight[this.current[1]])

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

	}
};


