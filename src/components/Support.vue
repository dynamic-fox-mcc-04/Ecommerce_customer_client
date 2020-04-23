<template>
  <div class="bungkus">
    <div class="card card-support m-2 mb-3" style="max-width: 20%;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgbb2G_7EfN8pXojt1DeB29PG-4D1H8LUb3nijDbDDRqstcevT&usqp=CAU" class="card-img" alt="">
        </div>
        <div class="col-md-8">
          <div class="card-body body-support">
            <h5 class="card-title">International Quality</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in .</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-support m-2 mb-3" style="max-width: 20%;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="" class="card-img" alt="">
        </div>
        <div class="col-md-8">
          <div class="card-body body-support">
            <h5 class="card-title">International Quality</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in .</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-support m-2 mb-3" style="max-width: 20%;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXCcGw-BtIAGVfupTSQYL8Yx_IP8ORCCabTEsJROlVJv3rC2Na&usqp=CAU" class="card-img" alt="">
        </div>
        <div class="col-md-8">
          <div class="card-body body-support">
            <h5 class="card-title">International Quality</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in .</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Support'
}
</script>
<style>
  .bungkus {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .body-support {
    display: flex;
    flex-direction: column;
  }
  .card-support {
    padding: 10px;
    border: 1px solid lightslategray;
    box-shadow: none;
    align-items: center;
  }
</style>
