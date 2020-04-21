<template>
  <div class="home" style="top: 100px; position: relative;">
      <h1 id="headlineText" class="mb-4 mt-2">We Serve Best Groceries in Town</h1><br>
      <div class="categoryBig d-flex align-items-center justify-content-center flex-wrap mb-4" style="position: relative;">
        <div id="imgCont1" class="imageContainer">
          <button class="btnImage btn-light form-control mb-5" style="width: 150px; position: relative;">Shop Fruits</button>
        </div>
        <div id="imgCont2" class="imageContainer">
          <button class="btnImage btn-light form-control mb-5" style="width: 150px; position: relative;">Shop Vegetables</button>
        </div>
        <div id="imgCont3" class="imageContainer">
          <button class="btnImage btn-light form-control mb-5" style="width: 150px; position: relative;">Shop Herbs</button>
        </div>
      </div>
      <div id="benefit" class="d-flex flex-wrap align-items-center justify-content-center">
        <CardBenefit :icon="card.icon" v-for="card in cardBnft" :key="card.title" :title="card.title" :text="card.text"></CardBenefit>
      </div>
    <div class="border" style="position: relative;"></div>
    <h1 id="ourProduct" class="mt-4 mb-4" style="color: #CFC08A; font-family: 'Elsie', cursive; font-size: 52px;">Our Products</h1><br>
    <div class="btn-group mb-5" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary">Fruits</button>
      <button type="button" class="btn btn-secondary">Vegetables</button>
      <button type="button" class="btn btn-secondary">Herbs</button>
    </div>
    <ContainerProduct></ContainerProduct>
  </div>
</template>

<script>
import CardBenefit from '../components/CardHomeBenefit'
import ContainerProduct from '../components/ContainerProduct'
export default {
  name: 'Home',
  data () {
    return {
      cardBnft: [
        {
          title: 'Healthy',
          text: 'Our product is complied WHO healthy standard',
          icon: 'fas fa-heartbeat'
        },
        {
          title: 'Support Local Farmer',
          text: 'All product harvested from over 100+ local farmer',
          icon: 'fas fa-seedling'
        },
        {
          title: 'Fresh',
          text: 'Always selected product we serve to you',
          icon: 'fas fa-carrot'
        }
      ]
    }
  },
  components: {
    CardBenefit,
    ContainerProduct
  }
}
</script>

<style>
.border {
  width: 70vw;
  height: 1px;
  margin-top: 20px;
  background-color: black;
}
#benefit {
  font-family: 'Baloo Paaji 2', cursive ! important;
  width: 100vw;
  position: relative;
}

.home {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#headlineText {
  font-family: 'Elsie', cursive;
  font-size: 60px;
  color: #CFC08A;
}

.categoryBig {
  width: 100vw;
}

.btnInside {
  width: 150px;
}

.imageContainer {
  width: 33vw;
  height: 450px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: 1px;
  font-family: 'Baloo Paaji 2', cursive ! important;
  display: flex;
  justify-content: center;
  align-items: end;
}

.btnImage {
  border-radius: 0;
}

.imageContainer:hover {
  -webkit-box-shadow: inset 0px 0px 35px 200px rgba(5,5,5,0.05);
-moz-box-shadow: inset 0px 0px 35px 200px rgba(5,5,5,0.05);
box-shadow: inset 0px 0px 35px 200px rgba(5,5,5,0.05);
}

#imgCont1 {
  background-image: url('../assets/fruits.jpg');

}
#imgCont2 {
  background-image: url('../assets/vegetables.jpg');
}
#imgCont3 {
  background-image: url('../assets/herbs2.jpg');
}
</style>
