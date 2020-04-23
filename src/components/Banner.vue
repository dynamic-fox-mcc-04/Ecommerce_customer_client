<template>
    <div id="carousel">
        <Slider
            animation="fade"
            v-model="sliderValue"
            :duration="5000"
            :speed="1000"
            >
            <SliderItem
                v-for="(i, index) in list"
                :key="index"
                @click="changeIndex(1);"
                :style="i"
                >
                <p style="line-height: 280px; font-size: 5rem; text-align: center;"></p>
            </SliderItem>
        </Slider>
    </div>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider'

export default {
  name: 'Banner',
  components: {
    Slider,
    SliderItem
  },
  data () {
    return {
      list: [],
      sliderValue: 2
    }
  },
  methods: {
    changeIndex (index) {
      this.sliderValue = index
    }
  },
  mounted () {
    setTimeout(
      () =>
        (this.list = [
          {
            backgroundImage: `url(${require('../assets/d.jpg')})`,
            width: '100%',
            height: '100%'
          },
          {
            backgroundImage: `url(${require('../assets/E.jpg')})`,
            width: '100%',
            height: '100%'
          },
          {
            backgroundImage: `url(${require('../assets/F.jpg')})`,
            width: '100%',
            height: '100%'
          },
          {
            backgroundImage: `url(${require('../assets/G.jpg')})`,
            width: '100%',
            height: '100%'
          }
        ]),
      800
    )
  }
}
</script>
<style>
#carousel {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 65%;
  margin: 130px auto 0;
  box-shadow: 5px 5px 5px 0 grey;
  padding: 15px;
  border-radius: 20px;
}
p {
  margin: 0;
}
</style>
