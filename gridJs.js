(function($){

	var grid = {
		init: function(options, elem){

			var self = this;
				self.elem = elem;
				self.$elem = $(elem);

			if(options) self.options = $.extend({}, $.fn.gridSlide.options, options);
			
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

			if ($.fn.gridSlide.options.gridNav){

				self.gridText ='<div class="grid"><div class="grid-nav">';

				for(i=0; i <self.list.length; i++){

					self.gridText += '<ul class="grid-nav-layer">';
					for(j=0; j< self.imgs[i].length; j++){
						if(i===0 && j===0) {
							self.gridText += '<li class="grid-nav-icon grid-active" data-x="'+ j +'" data-y="' + i +'" >X</li>';
							
						}else{
							self.gridText += '<li class="grid-nav-icon" data-x="'+ j +'" data-y="' + i +'" >X</li>';
						}
					}
					self.gridText += '</ul>';
				}

				self.gridText += '</div></div>';
				$.fn.gridSlide.options.nav.show().append(self.gridText);
				self.$activeGridEl = $('.grid-active');

			}else{

				self.navText = '<div class="nav-buttons"><a class="horizontal" data-dir="prev">Prev</a><a class="horizontal" data-dir="next">Next</a>';
				self.navText += '<a class="vertical" data-dir="up">Up</a><a class="vertical" data-dir="down">Down</a></div>';
				$.fn.gridSlide.options.nav.show().append(self.navText);
			}


			//click handler for the grid nav
	$('.grid-nav-icon').on('click', function(){

		self.transition($(this).data('x'), $(this).data('y'));
		
		self.$activeGridEl.removeClass('grid-active');
		self.$activeGridEl = $(this).addClass('grid-active');
	});

		},

		setCurrent: function(dir){

	
			if (dir === 'next' || dir === 'prev'){

				var pos = this.current[0];

				pos += ( ~~( dir === 'next' ) || -1 );

				self.current[0] = ( pos < 0 ) ? self.imgsLen[self.current[1]] - 1 : pos % self.imgsLen[self.current[1]];

				return pos;

			}else {
				var level = self.current[1];

				level += ( ~~(dir === 'down') || -1);

				self.current[1] = (level < 0) ? self.list.length -1 : level % self.list.length;


				if(self.current[0] > self.imgsLen[self.current[1]] -1){
					self.current[0] = self.imgsLen[self.current[1]] -1;
				}


				return level;

			}
		},

		transition: function( x, y ) {

			var self = this;

			if(x>=0)self.current[0]=x;
			if(y>=0)self.current[1]=y;

			self.list.stop().animate({
				'margin-left': -( self.current[0] * self.imgWidth[self.current[1]]),
				'top': -( self.current[1] * self.imgHeight[self.current[1]])

			});


		}
	};

	$.fn.gridSlide = function(options){

		$('head').append('<link rel="stylesheet" href="gridslide.css" type="text/css" />');

		return this.each(function(){
			

			var gridObj = Object.create(grid);

			gridObj.init(options, this);
			gridObj.transition(1, 5);

		});
		
	};

	$.fn.gridSlide.options = {
		nav: $('#slider-nav'),
		gridNav: true
			
	};


})(jQuery); 