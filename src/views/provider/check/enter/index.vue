<!--
 * @Description: 分包商进场审核
 * @Version:
 * @Autor:
 * @Date: 2020-02-08 15:46:40
 * @LastEditTime: 2020-03-25 09:49:29
 -->
<template>
  <div>
    <Title title="分包商进场审核" />
    <el-form ref="pageQuery" :model="pageQuery">
      <el-row :gutter="10">
        <el-col :xl="11" :lg="11" :md="12">
          <el-form-item prop="keyWord" label-width="0">
            <el-input
              v-model="pageQuery.keyWord"
              suffix-icon="el-icon-search"
              placeholder="供应商名称/所在地/劳务人数数量/机械设备数量/进场负责人/创建人"
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
        <el-col :xl="24" :lg="24" :md="12">
          <div class="tooltips end">
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            <el-button icon="el-icon-refresh-right" @click="reset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
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
import PageMixin from '@/mixins/pageMixin'
import supplierType from '@/lib/supplier/supplierType'
import supplierState from '@/lib/supplier/supplierState'
import api from '@/api/provider/enter.js'
export default {
  name: 'SubContractorEnterCheck',
  mixins: [PageMixin],
  data() {
    return {
      noDraft: true,
      // 供应商类型
      supplierType: supplierType,
      // 状态列表
      stateList: supplierState.filter(item => item.label !== '草稿'),
      request: api.getSubContractorEnterList,
      pageQuery: {
        projectId: localStorage.getItem('projectId')
      },
      // 表格表头
      tableColumn: [
        { type: 'index', title: '序号', width: 50 },
        {
          field: 'supplierName',
          title: '供应商名称',
          width: 100
        },
        {
          field: 'enterTime',
          title: '进场日期',
          width: 100
        },
        {
          field: 'estimatedLeaveTime',
          title: '计划退场日期',
          minWidth: 100
        },
        {
          field: 'location',
          title: '所在地',
          minWidth: 100
        },
        {
          field: 'employeeNum',
          title: '劳务人数数量',
          minWidth: 100
        },
        {
          field: 'equipmentNum',
          title: '机械设备数量',
          minWidth: 100
        },
        {
          field: 'principalName',
          title: '进场负责人',
          minWidth: 100
        },
        {
          prop: 'creatorName',
          label: '创建人',
          width: 100
        },
        {
          prop: 'createTime',
          label: '创建日期',
          width: 100,
          showOverflow: false
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
              // 已通过+已驳回
              let btnWatch = (
                <el-button type="text" onClick={() => this.toDetail(row.id, row)}>
                  查看
                </el-button>
              )
              let btnCheck = (
                <el-button type="text" onClick={() => this.check(row.id)}>
                  审核
                </el-button>
              )

              return [row.status === 2 || row.status === 3 ? btnWatch : '', row.status === 1 ? btnCheck : '']
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
    toDetail(id) {
      this.$router.push({ name: 'SubContractorEnterCheckDetails', query: { id, isCheck: false } })
    },
    check(id) {
      this.$router.push({ name: 'SubContractorEnterCheckDetails', query: { id, type: 'check', isCheck: true } })
    }
  }
}
</script>

<style lang="scss" scoped></style>
