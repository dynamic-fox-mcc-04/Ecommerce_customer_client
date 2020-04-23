<template>
    <div class="logged">
    </div>
</template>
<script>
export default {
    name:'logged',
    created (){
        this.$router.push('/')
    }
}
</script>
<style scoped>
.space{
    height: 75px;
}
</style>