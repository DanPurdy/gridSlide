function gridSlide( container, nav, grid ) {
	$('head').append('<link rel="stylesheet" href="gridslide.css" type="text/css" />');

	this.slider = container;
	$(this.slider).css('overflow', 'hidden');
	this.nav = nav.show();

	var self = this;

	this.list = this.slider.find('ul');

	this.imgs      = [];
	this.imgWidth  = [];
	this.imgHeight = [];
	this.imgsLen   = [];
	this.current   = [0,0];


	for(i=0; i<this.list.length; i++){
		
		this.imgs[i]      = $(this.list[i]).find('img');
		this.imgWidth[i]  = this.imgs[i][0].width;
		this.imgHeight[i] = this.imgs[i][0].height;
		this.imgsLen[i]   = this.imgs[i].length;
		$(this.list[i]).width(this.imgWidth[i]*this.imgsLen[i]);

	}


	if (grid){

		this.gridText ='<div class="grid"><div class="grid-nav">';

		for(i=0; i <this.list.length; i++){

			this.gridText += '<ul class="grid-nav-layer">';
			for(j=0; j< this.imgs[i].length; j++){
				this.gridText += '<li class="grid-nav-icon" data-x="'+ j +'" data-y="' + i +'" ><img src="'+ $(this.imgs[i][j]).attr('src')+'" alt="image" width="40px" height="20px"></li>';
			}
			this.gridText += '</ul>';
		}

		this.gridText += '</div></div>';
		this.nav.append(this.gridText);

	}else{

		this.navText = '<div class="nav-buttons"><a class="horizontal" data-dir="prev">Prev</a><a class="horizontal" data-dir="next">Next</a>';
		this.navText += '<a class="vertical" data-dir="up">Up</a><a class="vertical" data-dir="down">Down</a></div>';
		this.nav.append(this.navText);
	}

	
	//click handler for the grid nav
	$('.grid-nav-icon').on('click', function(){

		self.transition($(this).data('x'), $(this).data('y'));
		
		if (self.activeGridEl) $(self.activeGridEl).removeClass('grid-active');
		self.activeGridEl = $(this).addClass('grid-active');
	});

	//click handler for the navigation links
	$('.nav-buttons').find('a').on('click', function() {
		self.setCurrent( $(this).data('dir') );
		self.transition();
	});


	return this;
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


