let animationFrameId;

const update = {
  Start() {
    this.Update();
  },
  Stop() {
    cancelAnimationFrame(animationFrameId);
  },
  Update() {
    animationFrameId = requestAnimationFrame(this.Update.bind(this));
  }
};

export default update;