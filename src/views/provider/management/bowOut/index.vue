<template>
  <div>
    <Title title="分包商退场" />
    <div class="tooltips">
      <el-form ref="pageQuery" :model="pageQuery">
        <el-row :gutter="10">
          <el-col :xl="11" :lg="11" :md="12">
            <el-form-item prop="keyWord" label-width="0">
              <el-input
                v-model="pageQuery.keyWord"
                suffix-icon="el-icon-search"
                placeholder="供应商名称/合同履约情况/事故情况/退场负责人/创建人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="8" :lg="8" :md="12">
            <el-form-item label="创建时间" prop="time" label-width="82px">
              <el-date-picker
                v-model="pageQuery.time"
                end-placeholder="结束日期"
                start-placeholder="开始日期"
                type="datetimerange"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="5" :lg="5" :md="12">
            <el-form-item label="状态" prop="status" label-width="50px">
              <el-select v-model="pageQuery.status" placeholder="请选择" style="width: 100%;">
                <el-option
                  v-for="item in stateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="7" :md="12">
            <el-form-item label="是否发生事故" prop="accidentOccurFlag" label-width="109px">
              <el-select v-model="pageQuery.accidentOccurFlag" placeholder="请选择" style="width: 100%;">
                <el-option
                  v-for="item in conclusions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="17" :lg="17" :md="12">
            <div class="tooltips end">
              <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset">重置</el-button>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="tooltips">
              <el-button
                v-if="$hasPower('SubContractorBowOutAdd')"
                type="primary"
                icon="el-icon-plus"
                @click="toEdit(null)"
                >新建</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <VXTable
        ref="table"
        v-loading="tableLoading"
        :tableData="tableData"
        :pageQuery="pageQuery"
        :total="total"
        rowId="id"
        :columns="tableColumn"
        @selectionChange="selectionChange"
        @getList="getList"
        @pageChange="pageChange"
        @sizeChange="sizeChange"
      />
    </div>
  </div>
</template>

<script>
import supplierType from '@/lib/supplier/supplierType'
import supplierState from '@/lib/supplier/supplierState'
import PageMixin from '@/mixins/pageMixin'
import api from '@/api/provider/bowOut.js'
export default {
  name: 'SubContractorBowOut',
  mixins: [PageMixin],
  data() {
    return {
      // 供应商类型
      supplierType: supplierType,
      // 状态列表
      stateList: supplierState,
      conclusions: [
        {
          label: '全部',
          value: null
        },
        {
          label: '是',
          value: 0
        },
        {
          label: '否',
          value: 1
        }
      ],
      request: api.getList,
      // 合同履约情况
      contractList: [
        {
          label: '已完成合同内容',
          value: 1
        },
        {
          label: '未完成合同内容',
          value: 2
        }
      ],
      pageQuery: {
        projectId: localStorage.getItem('projectId')
      },
      // 表格表头
      tableColumn: [
        { type: 'index', title: '序号', width: 50 },
        {
          field: 'supplierName',
          title: '供应商名称',
          minWidth: 100
        },
        {
          field: 'enterTime',
          title: '进场日期',
          minWidth: 100
        },
        {
          field: 'leaveTime',
          title: '退场日期',
          minWidth: 100
        },
        {
          field: 'contractFulfillmentInfo',
          title: '合同履约情况',
          width: 120
          // formatter: ({ cellValue }) =>
          //   _.get(
          //     this.contractList.find(item => item.value === cellValue),
          //     'label',
          //     '-'
          //   )
        },
        {
          field: 'accidentOccurFlag',
          title: '是否发生事故',
          width: 100,
          formatter: ({ cellValue }) =>
            _.get(
              this.conclusions.find(item => item.value === cellValue),
              'label',
              '-'
            )
        },
        {
          field: 'accidentInfo',
          title: '事故情况',
          minWidth: 100
        },
        {
          field: 'principalName',
          title: '退场负责人',
          minWidth: 100
        },
        {
          prop: 'creatorName',
          label: '创建人',
          width: 80
        },
        {
          prop: 'createTime',
          label: '创建日期',
          width: 100
          // formatter: ({ cellValue }) => moment(cellValue).format('YYYY-MM-DD')
        },
        {
          prop: 'status',
          label: '状态',
          width: 80,
          formatter: ({ cellValue }) =>
            _.get(
              this.stateList.find(item => item.value === cellValue),
              'label',
              '-'
            )
        },
        {
          field: '',
          label: '操作',
          width: 200,
          fixed: 'right',
          slots: {
            default: ({ row }) => {
              let btnWatch = this.$hasPower('SubContractorBowOutDetails') ? (
                <el-button type="text" onClick={() => this.toDetail(row.id, row)}>
                  查看
                </el-button>
              ) : (
                ''
              )
              let btnEdit = this.$hasPower('SubContractorBowOutEdit') ? (
                <el-button type="text" onClick={() => this.toEdit(row.id, row.type)}>
                  编辑
                </el-button>
              ) : (
                ''
              )
              let btnDetele = this.$hasPower('SubContractorBowOutDelete') ? (
                <el-button type="text" onClick={() => this.remove(row)}>
                  删除
                </el-button>
              ) : (
                ''
              )
              // 注意：三元后边不能是null，这是render函数的变异，vxetable会报警告;编辑按钮：草稿+已驳回；删除按钮：草稿状态
              return [btnWatch, row.status === 0 ? btnEdit : '', row.status === 0 ? btnDetele : '']
            }
          }
        }
      ]
    }
  },
  watch: {
    'pageQuery.time': {
      handler: function (n, o) {
        console.log(n)
        if (n[0] !== null) {
          this.pageQuery.startTime = moment(n[0]).format('YYYY-MM-DD HH:MM:SS')
          this.pageQuery.endTime = moment(n[1]).format('YYYY-MM-DD HH:MM:SS')
        } else {
          this.pageQuery.startTime = ''
          this.pageQuery.endTime = ''
        }
      }
    }
  },
  methods: {
    toEdit(id) {
      if (id) {
        this.$router.push({ name: 'SubContractorBowOutEdit', query: { id } })
      } else {
        this.$router.push({ name: 'SubContractorBowOutAdd' })
      }
    },
    toDetail(id) {
      this.$router.push({ name: 'SubContractorBowOutDetails', params: { id } })
    },
    async remove(row) {
      await this.$tipRemove([row])
      let res = await api.delete(row.id)
      this.$message.success('删除成功')
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped></style>
