<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">spectrum</h1>
      <h2 class="subtitle">My bee&#39;s knees Nuxt.js project</h2>
      <div class="links">
        <button @click="init">Audio</button>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
// import Main from '../assets/js/Main.js'
import FFT from '../assets/js/fft.js'
import mp3 from '../sample.mp3'

export default {
  name: 'Index',
  components: {
    Logo
  },
  methods: {
    init() {
      try {
        // const spectrum = new Main()
        const fft = new FFT(1024 * 8)
        console.log(typeof mp3)
        console.log(fft)
        // const context = new AudioContext()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
