(function($){

	var grid = {
		init: function(options, elem){
			
			var self = this;
				self.elem = elem;
				self.$elem = $(elem).css({'overflow': 'hidden'});

			self.options = $.extend({}, $.fn.gridSlide.options, options);
			
			self.list = self.$elem.find('ul');

			self.imgs=[];
			self.imgWidth = [];
			self.imgHeight = [];
			self.imgsLen = [];
			self.current = [0,0];
			for(i=0; i<self.list.length; i++){
				
				self.imgs[i] = $(self.list[i]).find('img');
				self.imgWidth[i] = self.imgs[i][0].width;
				self.imgHeight[i] = self.imgs[i][0].height;
				self.imgsLen[i] = self.imgs[i].length;
				$(self.list[i]).width(self.imgWidth[i]*self.imgsLen[i]);

			}


			if (self.options.menu === 'grid'){

				this.buildGridNav(self.options.imgGrid);
				
			}else if(self.options.menu ==='nav'){

				this.buildNav();

			}else if(self.options.menu ==='img'){
				
				this.buildImgNav();
			
			}

			this.attachHandlers();
			
		},

		buildGridNav: function(imgGrid){

			this.gridText ='<div class="grid"><div class="grid-nav">';

				for(i=0; i <this.list.length; i++){

					this.gridText += '<ul class="grid-nav-layer">';
					for(j=0; j< this.imgs[i].length; j++){
						if(i===0 && j===0) {

							this.gridText += '<li class="grid-nav-icon grid-active" data-x="'+ j +'" data-y="' + i +'" >';

							if(imgGrid){
							
								this.gridText += '<img src="' + $(this.imgs[i][j]).attr('src') + '" alt="' + $(this.imgs[i][j]).attr('alt') + '" >';
							
							}
							
							this.gridText += '</li>';
							
						}else{
							this.gridText += '<li class="grid-nav-icon" data-x="'+ j +'" data-y="' + i +'" >';
							
							if(imgGrid){
								
								this.gridText += '<img src="'+ $(this.imgs[i][j]).attr('src')+'" alt="' + $(this.imgs[i][j]).attr('alt') + '" >';
							
							}

							this.gridText += '</li>';
						}
					}
					this.gridText += '</ul>';
				}

				this.gridText += '</div></div>';
				this.options.nav.show().append(this.gridText);
				this.$activeGridEl = $('.grid-active');
		},

		buildNav: function(){
			
			this.navText = '<div class="nav-buttons"><a class="horizontal prev" data-dir="prev">Prev</a><a class="horizontal next" data-dir="next">Next</a>';
			this.navText += '<a class="vertical up" data-dir="up">Up</a><a class="vertical down" data-dir="down">Down</a></div>';
			$.fn.gridSlide.options.nav.show().append(this.navText);
		},

		attachHandlers: function(){
			var self=this;
			//click handler for the grid nav
			$('.grid-nav-icon').on('click', function(){
				self.transition($(this).data('x'), $(this).data('y'));
				self.$activeGridEl.removeClass('grid-active');
				self.$activeGridEl = $(this).addClass('grid-active');
			});

			$('.nav-buttons').find('a').on('click', function() {
				self.setCurrent( $(this).data('dir'));
				self.transition();
			});
		},

		setCurrent: function(dir){

			if (dir === 'next' || dir === 'prev'){
				var pos = this.current[0];

				pos += ( ~~( dir === 'next' ) || -1 );
				this.current[0] = ( pos < 0 ) ? this.imgsLen[this.current[1]] - 1 : pos % this.imgsLen[this.current[1]];
			}else {
				var level = this.current[1];
				level += ( ~~(dir === 'down') || -1);

				this.current[1] = (level < 0) ? this.list.length -1 : level % this.list.length;


				if(this.current[0] > this.imgsLen[this.current[1]] -1){
					this.current[0] = this.imgsLen[this.current[1]] -1;
				}


			}
			console.log(this.current);
		},

		transition: function( x, y ) {

			var self = this;

			if(x>=0)self.current[0]=x;
			if(y>=0)self.current[1]=y;

			self.list.stop().animate({
				'margin-left': -( self.current[0] * self.imgWidth[self.current[1]]),
				'top': -( self.current[1] * self.imgHeight[self.current[1]])

			},this.options.speed);


		}

	};

	$.fn.gridSlide = function(options){

		$('head').append('<link rel="stylesheet" href="gridslide.css" type="text/css" />');

		return this.each(function(){
			

			var gridObj = Object.create(grid);

			gridObj.init(options, this);


		});
		
	};

	$.fn.gridSlide.options = {
		nav: $('#slider-nav'),
		menu: 'grid',
		imgGrid: false,
		speed: 1000
			
	};

})(jQuery);