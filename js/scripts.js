var _app = {};

(function (ns){

    ns.helloWorld = function() {
        console.log("Dia dhuit ar domhain!");
    };

})(_app);




(function(ns) { // ns ~ namespace

    function init() {

        ns.helloWorld(); // _helloWorld.js

    }

    init();

})(_app);
