# gridSlide
===========

A multi-directional jQuery image slider.

Useful for displaying multiple albums on one page or diorama style photo arrays(house cutouts showing individual rooms etc).

Developed with jQuery 1.10.2 (included with the download) though it will work on many previous versions.

To use just include the plugin file and jquery in the head of your document and initialise the plugin on your slider div within a window.load event as shown below.

```JavaScript
$(window).load(function() {
		$('.slider').gridSlide();
	});

```

The window.load event is necessary to make sure all images are loaded before the plugin messes with things.

A small set of options are available the defaults of which are shown below

```JavaScript
		nav: '#slider-nav',
		menu: 'grid',
		title: false,
		imgGrid: false,
		speed: 300
```

nav: is the default element for the div you wish your navigation options to appear in. Pass a different element as the nav option when you initialise the plugin to change this. For example:

```JavaScript
$('.slider').gridslide({
	nav: '.another-div'
});
```

menu: This option can be set to either 'grid' or 'nav'. Grid sets the navigation style to grid navigation Nav provides you with 4 elements that are set to be up,down,left and right controls for the slider. Both can obviously be styled however you like.

title: This option allows you to specify a title for each row of images when using the grid menu option, again this can be seen in the demo files included. Basically you just include a data attribute named title to each of the ul elements that make up your image rows and the plugin will add this to a h3 tag at the beginning of each row in the navigation.

imgGrid: imgGrid further extends the grid menu option by making the grid feature the images that you've included in the slider.

speed: as you would expect this affects the speed of the slider using standard time settings available to jquery. Slow, Fast or a millisecond value etc.

This is the first release and one of my first jQuery plugins so feature requests will be welcomed, currently I'm looking to possibly add the ability to display user defined captions with each image and also the possibility of providing callback functionality.

The plugin homepage is currently www.dpurdy.me/plugins/gridslide which includes demos of some of the different ways to use gridslide. 

The plugin is free to use by anyone and everyone, including the assets i've included with the download (if placeholder images are your thing!) I just politely ask that you leave the credit section in the gridslide.js file intact.

My contact details can be found on my portfolio which is the site listed with my github profile. Throw us a tweet or something!

Enjoy!

