<!--
    /**
 任务名称：TASK#2841 【智慧工地2.0-前端】资料管理》集团资料》列表、新增、编辑、详情切图及功能开发
 开发人员：崔洛宜
 日期：2020-04-01
 任务类型：集团资料列表页面(新增)
 **/
-->
<template>
  <div class="container">
    <!-- 工具栏 start -->
    <div class="tooltips">
      <el-form ref="form" inline :model="queryForm">
        <el-form-item label="选择类型" label-width="120px" prop="type">
          <el-select v-model="queryForm.type" clearable placeholder="选择类型">
            <el-option v-for="item in corpCategoryList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传日期" label-width="120px" prop="date">
          <el-date-picker
            v-model="queryForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="请选择"
            end-placeholder="请选择"
            style="width: 400px;"
            value-format="yyyy-MM-dd 00:00:00"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="" label-width="0" prop="keyword" style="margin-right: 20px;">
          <el-input v-model="queryForm.keyword" placeholder="资料名称/资料描述" style="width: 200px;">
            <i slot="suffix" class="el-icon-search"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
            <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
          </el-button-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPower('GroupDataAdd')" type="primary" icon="el-icon-plus" @click="add()">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 工具栏 end -->
    <el-table v-loading="loading" :data="tableData" border stripe size="small">
      <el-table-column type="index" label="序号" />
      <el-table-column prop="name" label="资料名称" />
      <el-table-column prop="desp" label="资料描述" />
      <el-table-column prop="corpCategory" label="类型">
        <template slot-scope="scope">
          {{ $getLabelFromArg('corpCategory', scope.row.corpCategory) }}
        </template>
      </el-table-column>
      <el-table-column prop="fileCount" label="文件数量" />
      <el-table-column prop="createTime" label="上传时间" />
      <el-table-column prop="remark" label="备注信息" />
      <el-table-column label="操作" width="200" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button v-if="$hasPower('GroupDataDetail')" type="text" size="mini" @click="handleDetail(scope.row.id)"
            >查看</el-button
          >
          <el-button v-if="$hasPower('GroupDataEdit')" type="text" size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button v-if="$hasPower('GroupDataListRemove')" type="text" size="mini" @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <p class="total">
        共 {{ total }} 条记录 第 {{ queryForm.page }} / {{ Math.ceil(total / queryForm.rows) || 1 }}
        <el-button type="text primary" class="el-icon-refresh" @click="refresh"></el-button>
      </p>
      <el-pagination
        background
        layout="sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="queryForm.page"
        :page-size="queryForm.rows"
        :page-sizes="$pageConfig.pageSizes"
        @size-change="changePageSize"
        @current-change="changePageNumber"
      />
    </div>
  </div>
</template>

<script>
import Api from '../api/work-bench'
export default {
  // import引入的组件需要注入到对象中才能使用
  name: 'GroupDataList',
  components: {},
  data() {
    // 这里存放数据
    return {
      loading: false,
      // 查询条件
      queryForm: {
        categoryType: 1,
        type: '',
        date: '',
        keyword: '',
        page: 1,
        rows: this.$pageConfig.pageSize
      },
      queryFormBack: {},
      tableData: [],
      total: 0
    }
  },
  computed: {
    corpCategoryList() {
      return this.$getArgList('corpCategory') || []
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    Object.assign(this.queryFormBack, this.queryForm)
    this.refresh(true)
  },
  // 方法集合
  methods: {
    // 查询列表
    async refresh(isFirstPage = true) {
      if (isFirstPage) {
        this.queryForm.page = 1
      }
      this.loading = true
      /**
       任务名称：TASK#2841 【智慧工地2.0-前端】资料管理》集团资料》列表、新增、编辑、详情切图及功能开发
       开发人员：崔洛宜
       日期：2020-04-02
       任务类型：优化细节
       **/
      const res = await Api.getTableList({
        ...this.queryForm,
        startTime: this.queryForm.date[0],
        endTime: this.queryForm.date[1]
      }).finally(() => (this.loading = false))
      this.tableData = res.data.records
      this.total = res.data.total
    },
    // 搜索
    search() {
      this.refresh()
    },
    // 重置
    reset() {
      this.$refs.form.resetFields()
      this.refresh(true)
    },
    // 当前页码改变
    changePageNumber(pageNumber) {
      console.log(pageNumber)
      this.queryForm.page = pageNumber
      this.refresh(false)
    },
    // 每页显示条数改变
    changePageSize(pageSize) {
      this.queryForm.page = 1
      this.queryForm.pageSize = pageSize
      this.refresh()
    },
    // 查看详情
    handleDetail(id) {
      this.$router.push({
        path: `/data-manage/group-data-detail/${id}`
      })
    },
    // 新增监控设备
    add() {
      this.$router.push({
        path: '/data-manage/group-data-add'
      })
    },
    // 编辑
    handleEdit(id) {
      this.$router.push({
        path: `/data-manage/group-data-edit/${id}`
      })
    },
    handleDelete(id) {
      this.$confirm('确认删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Api.deleteData(id).then(res => {
            this.$message.success('删除成功')
            this.refresh()
          })
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
