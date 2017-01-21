"use strict"
class Updater{

//------------------------------------------------------------------------------
  constructor(){
    this.objects = [];
    this.frameID = 0;
    this.renderFunction = function(){
      console.error('no render function specified');
      this.Stop();
    };
  }
//------------------------------------------------------------------------------
  Start(){
    this.Update();
  }
//------------------------------------------------------------------------------
  Stop(){
    cancelAnimationFrame(this.frameID);
  }
//------------------------------------------------------------------------------
  Clear(){
    this.objects.length = 0;
  }
//------------------------------------------------------------------------------
  SetRenderFunction(func){
    if(typeof(func) === 'function')
      this.renderFunction = func;
  }
//------------------------------------------------------------------------------
  /**
   * Adds an object to the update queue.
   * All objects are called in the order they were added and only after is the
   *     scene rendered.
   * Each object MUST have an function called 'Update' or it will not be added.
   *
   * @param {Object} obj object to add to the update queue
   */
  Add(obj){    
    // does obj exist and have an Update?
    if (obj === undefined || typeof(obj.Update) !== 'function')
      return;

    // is it already in the updater?
    if (this.ReturnIndex(obj) !== false)
      return;

    // finally add it
    obj.updaterIndex = this.objects.length;
    this.objects.push(obj);
  }
//------------------------------------------------------------------------------
  /**
   * Removes a handler from the update queue.
   *
   * @param {Object} handler object to remove from the update queue
   */
  Remove(obj) {
    let index = this.ReturnIndex(obj);

    if (index !== false)
      this.objects.splice(index, 1);
  }
//------------------------------------------------------------------------------
  /**
   * Returns the passed object's index in the internal update queue.
   * Will return 'false' if object is not in the update queue.
   *
   * @param {Object} obj objects whose index is searched for
   */
  ReturnIndex(obj) {
    let index = this.objects.indexOf(obj);

    if (index > -1)
      return index;
    else
      return false;
  }
//------------------------------------------------------------------------------
  /**
   * All parameters are expressed in milliseconds.
   *
   * @param {number} delta the ratio of passed time to one second. multiply
   *     updated values by this number to a guaranteed per second update.
   * @param {number} elapsed elapsed time since rendering last frame
   * @param {number} total total time passes since app start
   */
  Update(){
    this.frameID = requestAnimationFrame(this.Update.bind(this));

    this.objects.forEach(function(obj) {
      obj.Update();
    });

    this.renderFunction();
  }
//------------------------------------------------------------------------------
  Invoke(func, ms){

  }
//------------------------------------------------------------------------------

}

module.exports = new Updater();