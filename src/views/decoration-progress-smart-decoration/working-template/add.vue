<template>
  <div class="container no-padding is-footer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ id ? '编辑模板' : '新建模板' }}</span>
      </div>
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="200px" class="form-con">
        <el-row :gutter="20">
          <el-col :md="12">
            <el-form-item label="模板名称" prop="name">
              <el-input v-model="formData.name" class="form-input" placeholder="请输入模板名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="12">
            <el-form-item label="模板分类" prop="cateogry">
              <SelectArg v-model="formData.cateogry" arg-group="templateCategory" clearable></SelectArg>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="12">
            <el-form-item label="备注">
              <el-input
                v-model="formData.remark"
                class="form-input"
                type="textarea"
                :rows="4"
                placeholder="请输入备注信息"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <div class="footer-btn">
      <el-button size="lg" @click="goBack()">返回</el-button>
      <el-button type="primary" :loading="isLoading" size="lg" @click="save()">保存并提交</el-button>
    </div>
  </div>
</template>

<script>
/*
 * @Author: 耿为刚 创建
 * @Date: 2020-03-31
 * @Last Modified by: gengweigang
 */
/**
  任务名称：task#2867 【智慧工地2.0-前端】工序进度模块功能开发
  开发人员：耿为刚
  日期：2020-04-02
  任务类型：全新代码
**/
import { processProgressApi } from '../api/process-progress'
export default {
  name: 'DecorationProgressAddTemplateSmartDecoration',
  components: {},
  data() {
    // 这里存放数据
    return {
      id: this.$route.query.id || '',
      formData: {
        cateogry: '',
        id: this.$route.query.id || '',
        name: '',
        projectId: this.$store.state.project.projectId,
        remark: ''
      },
      formRules: {
        name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
        cateogry: [{ required: true, message: '请选择模板分类', trigger: 'change' }]
      },
      isLoading: false
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getDetailsTemplateWorking()
  },
  // 方法集合
  methods: {
    // 工序模板详情
    async getDetailsTemplateWorking() {
      if (!this.id) {
        return
      }
      const result = await processProgressApi.getDetailsTemplateWorking(this.id)
      const datas = result.data
      datas.cateogry = datas.cateogry + ''
      this.formData = Object.assign({}, datas)
    },
    // 保存并提交
    save() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.saveSuccess()
        } else {
          this.$message({
            type: 'error',
            message: '请完善表单!'
          })
          return false
        }
      })
    },
    // 保存 - 异步
    async saveSuccess() {
      try {
        this.isLoading = true
        if (this.id) {
          await processProgressApi.updateTemplateWorking(this.formData)
        } else {
          await processProgressApi.addTemplateWorking(this.formData)
        }
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.goBack()
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    },
    // 返回
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.form-con {
  padding-right: 15%;
}
.form-input {
  width: 100%;
  /deep/.el-input__inner {
    text-align: left;
  }
}
.inline-input {
  width: 30%;
  display: inline-block;
}
</style>
