/**
* Gumby Framework
*************************************************************/
Gumby.ready(function () {
  Gumby.log('Gumby is ready to go...', Gumby.dump())

	// placeholder polyfil
  if (Gumby.isOldie || Gumby.$dom.find('html').hasClass('ie9')) {
    $('input, textarea').placeholder()
  }

// Oldie document loaded
}).oldie(function () {
  Gumby.warn('This is an oldie browser...')

// Touch devices loaded
}).touch(function () {
  Gumby.log('This is a touch enabled device...')
})
/**
* / END Gumby Framework / *
*************************************************************/

/**
* Scroll Animation Module
*************************************************************/

var ScrollAnimations = (function () {
	// dont do anything if touch is supported (as scroll event wont fire properly)
  if (Modernizr.touch) return

  var s // private alias to settings
  return {

    settings: {
        	$scrollElements: $('.animate-on-scroll'),
        	initClass: 'scroll-animation-init',
        	dataAnimation: 'scrollanimation'
    },

    init: function () {
      s = this.settings
      s.$scrollElements.addClass(s.initClass)
      this.bindUIActions()
    },

    bindUIActions: function () {
        	s.$scrollElements.waypoint(function (direction) {
          switch (direction) {
            case 'down':
              ScrollAnimations.doDownAnim($(this), $(this).data(s.dataAnimation))
              break
          }
        	}, { offset: '83%' })
    },

    doDownAnim: function (element, animClass) {
      element.addClass(animClass)
    }

  }
})()

/**
* / END Scroll Animation Module / *
*************************************************************/

/**
* Initialise plugins and scroll animations on document ready
*************************************************************/
$(function () {
	// skip link and toggle on one element
	// when the skip link completes, trigger the switch
  $('#skip-switch').on('gumby.onComplete', function () {
    $(this).trigger('gumby.trigger')
  })

	// initialise validation plugin for top form
  $('.header-signup').validation({
	  // pass an array of required field objects
	  required: [
	    {
	      name: 'email',
	      // pass a function to the validate property for complex custom validations
	      // the function will receive the jQuery element itself, return true or false depending on validation
	      validate: function ($el) {
	        return $el.val().match('@') !== null
	      }
	    }
	  ],
	  // callback for failed validaiton on form submit
	  fail: function () {
	    Gumby.error('Form validation failed')
	    $('.hs-disclaimer').addClass('catch-errors-top danger alert').html('Please enter a valid email address!')
	  },
	  // callback for successful validation on form submit
	  // if omited, form will submit normally
	  submit: function (data) {
	  	// PUT YOUR SUCCESS CODE HERE, OR REMOVE SUBMIT FUNCTION FOR DEFAULT VALUE.
	    // $.ajax({
	    //   url: 'do/something/with/data',
	    //   data: data,
	    //   success: function() {alert("Submitted");}
	    // });
	  }
  })

	// initialise validation plugin for bottom form
  $('.signup-form').validation({
	  // pass an array of required field objects
	  required: [
	    {
	      name: 'email',
	      // pass a function to the validate property for complex custom validations
	      // the function will receive the jQuery element itself, return true or false depending on validation
	      validate: function ($el) {
	        return $el.val().match('@') !== null
	      }
	    }
	  ],
	  // callback for failed validaiton on form submit
	  fail: function () {
	    Gumby.error('Form validation failed')
	    $('.catch-errors-bot').addClass('danger alert').html('Please enter a valid email address!')
	  },
	  // callback for successful validation on form submit
	  // if omited, form will submit normally
	  submit: function (data) {
	  	// PUT YOUR SUCCESS CODE HERE, OR REMOVE SUBMIT FUNCTION FOR DEFAULT VALUE.
	    // $.ajax({
	    //   url: 'do/something/with/data',
	    //   data: data,
	    //   success: function() {alert("Submitted");}
	    // });
	  }
  })

	// initialise scroll animations
  ScrollAnimations.init()
})
