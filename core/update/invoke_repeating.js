class InvokeRepeating {
  constructor({ func, interval = 1000, times = Infinity }) {
    Object.assign(this, { func, interval, times })
    this.__timesInvoked = 0
  }

  invoke(resolve) {
    setTimeout(() => {
      if (++this.__timesInvoked <= this.times) {
        requestAnimationFrame(this.invoke.bind(this, resolve))
        this.func(this.__timesInvoked)
      } else {
        resolve()
      }
    }, this.interval)
  }
}

export default function(settings) {
  return new Promise(resolve => {
    new InvokeRepeating(settings).invoke(resolve)
  })
}
