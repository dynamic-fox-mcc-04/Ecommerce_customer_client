<template>
  <div class="home">
    <NavbarHome/>
    <div>
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/cat-slider-01.jpg" class="d-block w-100" alt="" />
          </div>
          <div class="carousel-item">
            <img src="../assets/cat-slider-02.jpg" class="d-block w-100" alt="" />
          </div>
          <div class="carousel-item">
            <img src="../assets/cat-slider-03.jpg" class="d-block w-100" alt="" />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <div class="container intro">
        <h1>Start <span>Shopping</span></h1>
        <p>Working and being a cat parent can be a bit tough. Our little furry kids not only demand attention but they have endless needs. Neko Pawrtal provides the best cat supplies online. We offer quality products and accessories for a healthier, happier, fluffier cat. We deliver your products right to your doorstep. Pawsome isn’t it?</p>
      </div>
      <div class="container">
        <div class="row d-flex">
          <img src="../assets/cat-1.jpeg" alt="Accessories">
          <div class="card col-lg-6 col-md-12">
            <h1>Give the right toys for your cat</h1>
            <p>Toys and good equipment will train the intuition and dexterity of your cat.</p>
            <router-link to="/product/accessories">See all products</router-link>
          </div>
        </div>
        <div class="row d-flex">
          <div class="card col-lg-6 col-md-12">
            <h1>Find the right food for your cat</h1>
            <p>Each formula is designed to provide nutrition that is tailored to your cat's health needs regardless of race, age, or lifestyle.</p>
            <router-link to="/product/foods">See all products</router-link>
          </div>
          <img src="../assets/cat-2.jpeg" alt="Foods">
        </div>
        <div class="row d-flex">
          <img src="../assets/cat-3.jpeg" alt="Grooming Aids">
          <div class="card col-lg-6 col-md-12">
            <h1>Find good care for your cat's skin and fur</h1>
            <p>Each cat has a different type of skin and fur, provide the right product to keep the cat's fur and skin healthy and shiny.</p>
            <router-link to="/product/groomingaids">See all products</router-link>
          </div>
        </div>
        <div class="row d-flex">
          <div class="card col-lg-6 col-md-12">
            <h1>Find toilet equipment for your cat here</h1>
            <p>Give your cat equipment and good sand, so that your home and your cat stay clean and healthy.</p>
            <router-link to="/product/toiletries">See all products</router-link>
          </div>
          <img src="../assets/cat-4.jpeg" alt="Toiletries">
        </div>
      </div>
    </div>
    <Footerpage/>
  </div>
</template>

<script>
import NavbarHome from '../components/NavbarHome'
import Footerpage from '../components/Footer'

export default {
  name: 'Home',
  components: {
    NavbarHome,
    Footerpage
  }
}
</script>

<style scoped>
.intro{
  padding: 40px;
  color: #666;
}

.container h1{
  margin-bottom: 20px;
  color: #222;
}

.container h1 span{
  color: #f96816;
}

.container .row{
  justify-content: space-evenly;
  margin-bottom: 35px;
}

.container .row img{
  max-height: 50%;
  max-width: 50%;
}

.container .row .card{
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
}

.card h1{
  color: red;
}

.card p{
  color: #666;
}

.card a{
  color: #f96816;
  cursor: pointer;
}
</style>
