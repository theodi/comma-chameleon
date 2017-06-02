/**
* Gumby Parallax
*/
!function() {

	'use strict';

	// define module class and init only if we're on touch devices
	if(Gumby.gumbyTouch) {
		return;
	}

	function Parallax($el) {

		Gumby.debug('Initializing Parallax', $el);

		this.$el = $el;
		this.$holder = {};
		this.ratio = this.offset = 0;

		var scope = this;

		this.setup();

		// re-initialize module
		this.$el.on('gumby.initialize', function() {
			Gumby.debug('Re-initializing Parallax', scope.$el);
			scope.setup();
		});

		// set starting position of background image
		this.setPosition();

		this.$holder.scroll(function() {
			scope.scroll();
		});

		// this should update windows that load scrolled
		this.scroll();
	}

	Parallax.prototype.setup = function() {
		this.$holder = Gumby.selectAttr.apply(this.$el, ['holder']);
		this.ratio = Number(Gumby.selectAttr.apply(this.$el, ['parallax'])) || 1;
		this.offset = Number(Gumby.selectAttr.apply(this.$el, ['offset'])) || 0;

		// calculate starting bg position
		this.startPos = ((this.$el.offset().top - this.offset) * this.ratio);

		// find holder element
		if(this.$holder) {
			this.$holder = $(this.$holder);
		}

		// no holder element so default to window
		if(!this.$holder || !this.$holder.length) {
			this.$holder = $(window);

		// holder is set and not window so add to offset calc
		} else {
			// calculate starting bg position
			this.startPos -= this.$holder.offset().top;
		}
	};

	// update bg position based on scroll and parallax ratio
	Parallax.prototype.scroll = function() {
		this.setPosition(this.startPos - (this.$holder.scrollTop() * this.ratio));
	};

	// set background y axis position with 50% x axis
	Parallax.prototype.setPosition = function(yPos) {
		this.$el.css('backgroundPosition', '50% '+yPos+'px');
	};

	// add initialisation
	Gumby.addInitalisation('parallax', function() {
		// wait for window to load as this could effect position of element
		$(window).load(function() {
			setTimeout(function() {
				$('.parallax').each(function() {
					var $this = $(this);
					// this element has already been initialized
					if($this.data('isParallax')) {
						return true;
					}
					// mark element as initialized
					$this.data('isParallax', true);
					new Parallax($this);
				});
			}, 200);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'parallax',
		events: [],
		init: function() {
			Gumby.initialize('parallax');
		}
	});
}();
