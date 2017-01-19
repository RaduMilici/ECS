/*global angular*/
angular.module('App').factory("updater", ["$log", function($log){
  return {
  /**
   * Array of objects stored internally. 
   * Each is called by the Update function.
   */
    handlers: [],

    renderFunction: undefined,

//------------------------------------------------------------------------------
    /**
     * Adds an object to the update queue.
     * All objects are called in the order they were added and only after is the scene rendered. 
     * Each object MUST have an function called 'Update' or it will not be added.
     * 
     * @param {Object} handler object to add to the update queue
     */
    Add: function (handler){
      if (handler.Update !== undefined)
        handlers.push(handler);
      /*else 
        console.warn(handler, ' not added to updater. missing Update function.');*/
    },
 //------------------------------------------------------------------------------
    /**
     * Removes a handler from the update queue.
     * 
     * @param {Object} handler object to remove from the update queue
     */
    Remove: function(handler){
      var index = handlers.indexOf(handler);

      if (index > -1) 
        handlers.splice(index, 1);
    },
 //------------------------------------------------------------------------------
    ReturnIndex: function(handler){
    /**
     * Returns the passed object's index in the internal update queue.
     * Will return 'false' if object is not in the update queue.
     * 
     * @param {Object} handler objects whose index is searched for 
     */

    var index = handlers.indexOf(handler);

    if(index > -1)
      return index;
    else
      return false;
    },
 //------------------------------------------------------------------------------
  /**
     * Called internally, usually by an instantiation of the Animate class.
     * Is called as often as requestAnimationFrame allows, but can be capped at a ceratin frameratere.
     * Refer to the internal 'fps' variable in Animate.
     * All parameters are expressed in milliseconds.
     * 
     * @param {number} delta the ratio of passed time to one second. multiply updated values by this number to a guaranteed per second update.
     * @param {number} elapsed elapsed time since rendering last frame
     * @param {number} total total time passes since app start 
     */
    this.Update: function (delta, elapsed, total) {
    
      handlers.forEach(function(handler){
        handler.Update(delta, elapsed, total);
      });

    },
 //------------------------------------------------------------------------------
    /**
     * Removes all handlers from the update queue, essentially slearing all updates.
     * 
     */
    ClearAll: function() {

      this.handlers.length = 0;

    }
  };
}]);
