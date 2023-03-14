<template>
<div class="layout">
  布局
  {{data}}
</div>
</template>

<script>
import testApi from '../api/test'
export default {
  name: "Layout",
  created() {
    //this.fetchData()
  },
  data() {
    return {
      data:[]
    }
  },
  methods:{
    fetchData(){
      testApi.getList().then(resp => {
        this.data = resp.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
