
import SearchBox from './components/SearchBox.js';

class Tsp {
    constructor() {}
}

$(document).ready(function() {
    var tsp = new Tsp();
    let class_list = [
      SearchBox
    ];
    let len = class_list.length;







    function recursive_dom_builder(index, tsp) {
        if (index >= len)
            return null;
        (new class_list[index](tsp)).init().then(function(tsp) {
            return recursive_dom_builder(index + 1, tsp);
        });
    }
    recursive_dom_builder(0, tsp);

});