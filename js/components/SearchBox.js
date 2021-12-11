import SuperParent from '../lib/SuperParent.js';
import MyCustomEle from './MyCustomEle.js';

export default class SearchBox extends SuperParent {
  constructor(tsp) {
    super(tsp);
    this.tsp.SearchBox = this;
    this.parent_element = '#app';
  }
  set_action_map() {
    let self = this;
    self.action_map = {

      sample_action_func: () => {
        console.log(self.cache_elems.search_box_1.val());
      },


    };
  }

  before_render() {
    /*use this function for service calls*/
    this.data = 'test-data';
    return $.Deferred().resolve();
  }

  render() {
    let self = this;
    return `<div>
              <input selector='search_box_1' value='${this.data}' 
              type='textbox'/>
              <my-custom-ele attr_1="some-value"></my-custom-ele>
            </div>`;
  }

  after_render() {
    this.init_nested_ele('my-custom-ele', MyCustomEle);
  }

  set_event_map() {
    let self = this;
    self.event_map = {

      on_type: () => {
        self.cache_elems.search_box_1.on('keyup', () => {
          self.action_map.sample_action_func();
        });
      },

    };
  }
}
