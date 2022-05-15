<template>
  <div class="login flex center">
    <div class="content flex main_end">
      <div class="login_card cross_center flex flex_col main_around">
        <div class="login_title fs28">登录</div>
        <el-form
          label-width="0px"
          ref="ruleForm"
          :model="loginForm"
          :rules="rules"
          style="max-width: 460px"
        >
          <el-form-item prop="name">
            <el-input
              @keyup.enter="login(ruleForm)"
              placeholder="请输入用户名"
              v-model.trim="loginForm.name"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              @keyup.enter="login(ruleForm)"
              type="password"
              placeholder="请输入密码"
              v-model.trim="loginForm.password"
            />
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input
              placeholder="验证码"
              @keyup.enter="login(ruleForm)"
              style="width: 140px"
              v-model.trim="loginForm.captcha"
            ></el-input>
            <img
              v-debounce="{
                type: 'click',
                delay: 200,
                fn: getCaptcha
              }"
              class="captcha_img"
              :src="captchaSrc"
              alt=""
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginForm.remember">记住我，以后自动登录</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="login(ruleForm)"
              class="login_btn"
              :loading="btnLoading"
              round
              type="primary"
              >登录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="fs14 fc_link pointer">忘记密码？</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, type FormInstance } from 'element-plus'
import localCache from '@/utils/localCache'
import { getCaptchaAPI } from '@/api/common/common'
import { loginAPI } from '@/api/login/login'

const router = useRouter()
//表单数据
const loginForm = reactive({
  name: '',
  password: '',
  captcha: '',
  remember: false
})

//验证码图片地址
const captchaSrc = ref('')

//表单验证规则
const rules = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 8,
      message: '密码最少8位',
      trigger: 'blur'
    }
  ],
  captcha: [{ required: true, message: '请输入右侧图片上的文字', trigger: 'blur' }]
}

const btnLoading = ref(false)

const ruleForm = ref<FormInstance>()

onMounted(() => {
  console.log(123)
  getCaptcha()
})

//获取验证码
const getCaptcha = async function () {
  try {
    const res = (await getCaptchaAPI())?.data
    captchaSrc.value = res.src
  } catch (e) {
    console.log(e)
  }
}

const login = function (formEl: FormInstance | undefined) {
  formEl?.validate((valid) => {
    if (!valid) return
    btnLoading.value = true
    loginAPI(loginForm)
      .then(() => {
        btnLoading.value = false
        localCache.set('token', '321')
        ElMessage({
          message: '登录成功',
          type: 'success'
        })
        router.replace('/main')
      })
      .catch(() => {
        btnLoading.value = false
      })
  })
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/images/login-bg.png');
}

.content {
  width: 825px;
  height: 480px;
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.login_card {
  height: 100%;
  width: 335px;
  background-color: #fff;
}

.login_btn {
  width: 100%;
  height: 38px;
  background: linear-gradient(to right, #2e9fff, #3e79ff);
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.5);
}

.captcha_img {
  width: 100px;
  height: 36px;
  vertical-align: middle;
  cursor: pointer;
}

:deep(.el-input__wrapper) {
  height: 36px;
  border-radius: 18px;
  background-color: #f7f5fb;
  border-color: #f7f5fb;
}
</style>
