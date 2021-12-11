export default class SuperParent {
  constructor(tsp, parent_selector) {
    this.tsp = tsp;
    this.parent_element = parent_selector;
    this.event_map = {};
    this.action_map = {};
    this.cache_elems = {};
  }

  before_render() {
    return $.Deferred().resolve();
  }

  events() {
    let self = this;
    /* initializing eventlistners by calling above event_map in a loop*/
    for (let key in self.event_map) {
      //          console.log(self.event_map[key]);
      self.event_map[key]();
    }
  }

  init_nested_ele(selector, class_name) {
    let self = this;
    self.tsp = new class_name(self.tsp, selector).init();
  }

  HTMLGenerator(html_str) {
    let self = this;
    let generate_ele = $(html_str);
    let children = generate_ele.children();
    for (let i = 0; i < children.length; i++) {
      let child_ele = $(children[i]);
      let selector = child_ele.attr('selector');
      console.log(selector);
      self.cache_elems[selector] = child_ele;
      // self.proper (selector, selector);
      // console.log(children[child]);
    }
    $(self.parent_element).append(generate_ele);
  }

  after_render() {}
  
  include_css(css_content) {
    let style_tag = $('<style></style>');
    style_tag.append(css_content);
    console.log(css_content);
    $(this.parent_element).append(style_tag);
  }

  include_css_from_url(url) {
    $.get(url).then((css) => {
      console.log(css);
    });
  }

  init() {
    let def = $.Deferred();
    let self = this;
    self.set_action_map();
    self.before_render().then(function () {
      let html_str = self.render();
      self.HTMLGenerator(html_str);
      self.after_render();
      self.set_event_map();
      self.events();
      return def.resolve(self.tsp);
    });

    return def.promise();
  }
}
