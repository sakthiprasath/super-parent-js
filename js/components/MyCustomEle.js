import SuperParent from '../lib/SuperParent.js';

export default class MyCustomEle extends SuperParent {
  constructor(tsp, parent_selector) {
    super(tsp, parent_selector);
    this.tsp.MyCustomEle = this;
    // console.log($(this.parent_element).attr('attr_1'));
  }
  set_action_map() {
    let self = this;
    self.action_map = {
      sample_action_func: () => {
        alert(`${this.data}`);
      },
      get_single_layer: () => {
        let html = '';

        for (let i = 0; i < 100; i++) {
          html = html + `<div class="single-layer"> </div>`;
        }
        return html;
      },
    };
  }

  before_render() {
    /*use this function for service calls*/
    this.data = 'test-data-2';
    this.include_css(`
       
      `);

    return $.Deferred().resolve();
  }

  render() {
    let html = this.action_map.get_single_layer();
    return `
    <ul class="topmenu">
      <li selector="side_nav_accor" >
        <h3>Python Introduction</h3>
        
      
      </li>
    </ul>
    `;
  }

  set_event_map() {
    let self = this;
    self.event_map = {
      on_type: () => {
        self.cache_elems.side_nav_accor.on('click', () => {
          self.action_map.sample_action_func();
        });
      },
    };
  }
}
