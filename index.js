let systems = require('./systems');
let Component = require('./components').Component;
let Entity = require('./entities').Entity;

systems.updater.Start();

module.exports = { Entity, Component, systems };