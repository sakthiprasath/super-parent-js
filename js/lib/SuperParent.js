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
      self.event_map[key]();
    }
  }
  init_nested_ele(selector, class_name, props) {
    let self = this;
    self.tsp = new class_name(self.tsp, selector).init(props);
  }

  cache_tree(root) {
    /*Recusive function that takes tree root as argument and stores the   below elems in this.cache_elems
      1. root
      2. All the Child elemtes
      3. All the Child of Child elements
    */
    let self = this;
    let selector_name = root.attr('selector');
    if (selector_name !== undefined) 
    self.cache_elems[selector_name] = root;
    let children = root.children();
    for (let i = 0; i < children.length; i++) {
      let child_ele = $(children[i]);
      self.cache_tree(child_ele);
    }
  }

  HTMLGenerator(html_str) {
    let self = this;
    let root_ele = $(html_str);

    self.cache_tree(root_ele);

    $(self.parent_element).append(root_ele);
  }

  after_render() {}
  include_css(css_content) {
    let style_tag = $('<style></style>');
    style_tag.append(css_content);
    $(this.parent_element).append(style_tag);
  }

  include_css_from_url(url) {
    // $.get(url).then( (css)=>{
    //   console.log(css);
    // });
  }

  init(props) {
    let def = $.Deferred();
    let self = this;
    self.props = props;
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
