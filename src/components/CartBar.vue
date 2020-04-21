<template>
      <div class="pos-f-t">
        <div class="collapse" id="navbarToggleExternalContent">
            <div class="bg-dark p-4">
            <h4 class="text-white">Collapsed content Cart</h4>
            <span class="text-muted">Toggleable via the navbar brand.</span>
            </div>
        </div>
        <nav id="cart-bar" class="navbar navbar-light bg-light d-flex justify-content-between align-items-center">
            <button class="navbar-toggler btn-outline-light" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon white-text"></span>
            </button>
            <h4 style="text-align: center; position: relative; top: 5px; color: white;" class="d-flex justify-content-between align-items-center">Cart Bar</h4>
            <div>
                <button class="btn-outline-light form-control">Check Out</button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'CartBar'
}
</script>

<style>
.pos-f-t {
    background-color: #CFC08A ! important;
    position: fixed;
    bottom: 0;
    left: 10vw;
    width: 80vw;
    border-radius: 10px ! important;
    /* opacity: 70% ! important; */
}

#cart-bar {
    background-color: #CFC08A ! important;
    border-radius: 10px 10px 0 0 ! important;

}
</style>
