<template>
  <el-select :value="value" @change="val => $emit('input', val)">
    <template v-if="hasAll">
      <el-option :value="null" label="全部"> </el-option>
    </template>
    <el-option v-for="item in contractType" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  </el-select>
</template>

<script>
import contractType from '@/lib/contractType'
export default {
  name: 'ContractTypeSelect',
  props: {
    hasAll: {
      type: Boolean,
      default: true
    },
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      contractType: contractType
    }
  },
  created() {}
}
</script>
<style lang="less" scoped>
.vue-treeselect {
  display: inline-block;
  width: 215px;
  font-size: unset;
}
</style>
