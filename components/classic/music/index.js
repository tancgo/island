import classicBehavior from '../classic-behavior';
const ba = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  attached(event) {
    // 跳转页面 当前 切换
    this._recoverStatus()
    this._monitorSwitch()
  },

  detached(event) {
    // wx:if hidden区别
    // ba.stop()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function () {
      const { src, title } = this.properties
      // 播放按钮图片、播放状态切换
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        ba.src = src
        ba.title = title
      } else {
        this.setData({
          playing: false
        })
        ba.pause()
      }
    },

    _recoverStatus: function () {
      // 全局没有任何音乐在播放
      if (ba.paused) {
        this.setData({
          playing: false
        })
        return
      }
      // 全局音乐播放src和当前组件的src相等
      if (ba.src === this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function () {
      ba.onPlay(() => {
        this._recoverStatus()
      }),
        ba.onPause(() => {
          this._recoverStatus()
        }),
        ba.onStop(() => {
          this._recoverStatus()
        }),
        ba.onEnded(() => {
          this._recoverStatus()
        })
    }
  }
})