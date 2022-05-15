<template>
  <el-result title="404" sub-title="生活总归带点荒谬">
    <template #icon>
      <el-image style="width: 120px; height: 120px" :src="img404" />
    </template>
    <template #extra>
      <el-button type="primary">找点乐子吧</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import img404 from '/images/404.svg'
</script>
<style></style>
