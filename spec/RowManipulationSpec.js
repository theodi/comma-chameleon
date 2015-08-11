///**
// * Created by stephenfortune on 11/08/15.
// */
//require('../bower_components/handsontable/dist/handsontable.js');

describe("deadwood tests already covered by the hands on table specs", function(){

    beforeEach(function () {
        this.$container = $('<div id="' + id + '"></div>').appendTo('body');
    });

    afterEach(function () {
        if (this.$container) {
            destroy();
            this.$container.remove();
        }
    });

    it("can use helper functions", function(){
        expect(spec());
    });

    it('should not show row headers by default', function () {
        var that = this;
        handsontable();

        expect(that.$container.find('tbody th').length).toEqual(0);
    })

});

//describe("row manipulation", function(){
//    // test assertions here
//
//    beforeEach();
//
//    afterEach();
//
//    // tests
//
//    describe("when 'new-row' entered, a new row is created", function(){
//
//        it("more specific assertion", function(){
//            when(selectAll());
//            when(insertRow())
//
//        });
//
//    });
//
//    describe("when a carriage return is entered, a new row is created", function(){
//
//        it("more specific assertion", function(){
//
//        });
//
//    });
//});