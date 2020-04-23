<template>
  <footer>
    <p>
        Created by:
        Adhiawa Alif Archiafinno. 2020. "For Educational Purposes Only"
    </p>
  </footer>
</template>
<script>
export default {
  name: 'Footer'
}
</script>
<style>
  footer {
      background-color: #222;
      color: #fff;
      font-size: 14px;
      bottom: 0;
      position: fixed;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 999;
  }

  footer p {
      margin: 10px 0;
  }

  footer i {
      color: red;
  }
</style>
