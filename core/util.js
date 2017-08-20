class Util {
  constructor(){
    this.id = 0;
    this.blank = function(){};
  }

  uniqueID(){
    return this.id++;
  }

  createInterceptor(scope, pre = this.blank, original = this.blank, post = this.blank){
    if(scope === undefined || typeof original !== 'function') return;

    return function(settings){
      pre.bind(scope)();
      original.bind(scope)(settings);
      post.bind(scope)();
    };
  }

  randomColor(){
    let colors = ['red', 'green', 'blue'];
    return colors[Math.round(Math.random() * (colors.length - 1))];
  }

  randomFloat (min, max) {
    return Math.random() * (max - min) + min;
  }
}

export default new Util();