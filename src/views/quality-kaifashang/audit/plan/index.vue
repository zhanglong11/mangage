<template>
  <div>
    <div class="search-box">
      <el-form ref="pageQuery" :model="pageQuery" inline>
        <el-form-item label="" prop="equipmentName">
          <el-input
            v-model="pageQuery.equipmentName"
            style="width: 220px;"
            placeholder="验收申请编号/自检情况/创建人"
          />
        </el-form-item>
        <el-form-item label="计划验收日期" prop="status">
          <el-date-picker
            v-model="pageQuery.time"
            end-placeholder="结束日期"
            start-placeholder="开始日期"
            type="datetimerange"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="创建时间" prop="status">
          <el-date-picker
            v-model="pageQuery.time"
            end-placeholder="结束日期"
            start-placeholder="开始日期"
            type="datetimerange"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <SelectList v-model="pageQuery.status" type="statusList" />
        </el-form-item>
      </el-form>
      <div class="btn-search">
        <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
        <el-button icon="el-icon-refresh-right" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="btn-add">
      <el-button type="primary" icon="el-icon-plus" @click="toEdit(null)">新建</el-button>
    </div>
    <div>
      <VXTable ref="table" :columns="tableColumn" :tableData="tableList" />
    </div>
  </div>
</template>

<script>
import PageMixin from '@/mixins/pageMixin'

export default {
  name: 'CheckPlan',
  mixins: [PageMixin],
  data() {
    return {
      selectedList: [],
      pageQuery: {
        equipmentName: '',
        status: null,
        time: null
      },
      tableList: [
        {
          id: 1,
          number: 'JC0001',
          name: '2月份检查计划',
          count: '300',
          planTime: '2019-2-30',
          check: '符合设计要求',
          file: '',
          creator: '张佑轩',
          time: '2020/1/11'
        }
      ],
      requestFlag: false,
      // 表格表头
      tableColumn: [
        { type: 'seq', title: '序号', width: 80 },
        {
          field: 'number',
          title: '验收申请编号'
        },
        {
          field: 'name',
          title: '验收类型'
        },
        {
          field: 'count',
          title: '计划验收日期'
        },
        {
          field: 'planTime',
          title: '创建人'
        },
        {
          field: 'time',
          title: '创建时间'
        },
        {
          field: '',
          title: '操作',
          width: 200,
          fixed: 'right',
          slots: {
            default: ({ row }) => {
              return [
                <el-button type="text" onClick={() => this.toEdit(row.id, row)}>
                  编辑
                </el-button>,
                <el-button type="text" onClick={() => this.remove([row])}>
                  删除
                </el-button>,
                <el-button type="text" onClick={() => this.toDetail(row.id, row)}>
                  查看
                </el-button>
              ]
            }
          }
        }
      ]
    }
  },
  methods: {
    toEdit(id) {
      this.$router.push({ path: 'qualityApplyEdit', params: { id } })
    },
    toDetail(id) {
      this.$router.push({ path: 'qualityApplyDetail', params: { id } })
    },
    remove(rows) {
      this.$message.success('删除成功')
      // this.$remove(troubleRepairApi.equipmentRepairDel, rows, 'faultNum', this.getList)
    }
  }
}
</script>

<style scoped></style>
