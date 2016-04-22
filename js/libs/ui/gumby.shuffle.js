/**
* Gumby Shuffle
*/
!function() {

	'use strict';

	function Shuffle($el) {

		Gumby.debug('Initializing Checkbox', $el);

		this.$el = $el;

		this.$children = [];
		this.children = [];
		this.shuffles = [];
		this.def = '';
		this.current = '';

		var scope = this;

		// set up module based on attribute options
		this.setup();

		// handle tests now and on resize
		$(window).on('load resize', function() {
			scope.handleTests();
		});

		// handle tests on gumby.shuffle
		this.$el.on('gumby.shuffle', function() {
			Gumby.debug('Shuffle event triggered', scope.$el);
			scope.handleTests();

		// allow re-initialisation on gumby.initialize
		}).on('gumby.initialize', function() {
			Gumby.debug('Re-initializing shuffle module', scope.$el);
			scope.setup();
		});
	}

	// set up module based on attributes
	Shuffle.prototype.setup = function() {
		// jQuery object of children
		this.$children = this.$el.children(Gumby.selectAttr.apply(this.$el, ['children']));
		// array of children
		this.children = $.makeArray(this.$children);
		// parse shuffle attribute into array of test:sequence objects
		this.shuffles = this.parseAttrValue(Gumby.selectAttr.apply(this.$el, ['shuffle']));
		// default sequence
		this.def = this.defaultSequence(this.$children.length);
		this.current = 'default';
	};

	// loop round each test
	// if matchMedia passes then shuffle with that sequence
	Shuffle.prototype.handleTests = function() {
		var scope = this, 
			success = false;

		// test each media query
		if(window.matchMedia) {
			$(this.shuffles).each(function(key, val) {
				if(window.matchMedia(val.test).matches) {

					// if matching media query has changed then shuffle
					if(scope.current !== val.test) {
						scope.current = val.test;
						scope.shuffle(val.sequence);
					}
					
					// mark as media query passed and end loop
					success = true;
					return false;
				}
			});
		}

		// return to default if nothing matched
		if(!success && this.current !== 'default') {
			this.current = 'default';
			scope.shuffle(this.def);
		}
	};

	// shuffle children into supplied sequence
	// sequence in format 1-2-3-4-5
	Shuffle.prototype.shuffle = function(sequence) {
		var scope = this,
			seq = [],
			newArr = [];

		// if sequence passed then fill newArr up with reordered children
		if(sequence) {
			seq = sequence.split('-');
			$(seq).each(function(index) {
				newArr.push($(scope.children[Number(seq[index])]));
			});

		// otherwise newArr is just the children array
		} else {
			newArr = this.children;
		}

		// remove children from DOM and loop round newArr appending each
		this.$children.remove();
		$(newArr).each(function() {
			scope.$el.append($(this));
		});

		// pass jQuery array to event handler
		Gumby.debug('Children shuffled', newArr, scope.$el);
		Gumby.debug('Triggering onShuffle event', this.$el);
		this.$el.trigger('gumby.onShuffle', [$(newArr)]);
	};

	// return default sequence 0-1-2 etc depending on number of children
	Shuffle.prototype.defaultSequence = function(length) {
		var str = '', i = 0;
		for(i; i < length; i++) {
			str += i+'-';
		}
		return str.substr(0, str.length - 1);
	};

	// return array of test:sequence objects
	Shuffle.prototype.parseAttrValue = function(str) {
		var supp = str.split(','),
			res = [], splt = [];

		// multiple can be supplied so loop round and create object 
		$(supp).each(function(key, val) {
			splt = val.split('|');
			if(splt.length !== 2) {
				return true;
			}

			// object containing Modernizr test or media query and dash separated sequence
			res.push({
				'test' : splt[0],
				'sequence' : splt[1]
			});
		});

		return res;
	};

	// add initialisation
	Gumby.addInitalisation('shuffle', function(all) {
		$('[data-shuffle],[gumby-shuffle],[shuffle]').each(function() {
			var $this = $(this);

			// this element has already been initialized
			// and we're only initializing new modules
			if($this.data('isShuffle') && !all) {
				return true;

			// this element has already been initialized
			// and we need to reinitialize it
			} else if($this.data('isShuffle') && all) {
				$this.trigger('gumby.initialize');
				return true;
			}

			// mark element as initialized
			$this.data('isShuffle', true);
			new Shuffle($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'shuffle',
		events: ['onShuffle', 'shuffle'],
		init: function() {
			Gumby.initialize('shuffle');
		}
	});
}();
