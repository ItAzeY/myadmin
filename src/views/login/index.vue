<template>
  <div class="login-container">
    <a-form :form="form" @submit="handleSubmit" class="login-form">
      <div class="title-container">
        <h3 class="title">Heelo Word!</h3>
      </div>
      <a-form-item>
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <a-input
          tabindex="1"
          type="text"
          autocomplete="off"
          placeholder="Username"
          v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your usename!' }]}
        ]"
        ></a-input>
      </a-form-item>
      <a-tooltip placement="right" v-model="capsTooltip">
        <template slot="title">
          <span>大写键已开启</span>
        </template>
        <a-form-item>
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
          <a-input
            autocomplete="off"
            ref="password"
            placeholder="Password"
            :type="typePwd"
            tabindex="2"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleSubmit"
            v-decorator="[
          'password',
          {rules: [{ required: true, max: 12, min: 6, message:'Please enter a 6 to 12 digit password'}]}
        ]"
          ></a-input>
          <span class="svg-container" @click="showPwd">
            <svg-icon :icon-class="typePwd === 'password' ? 'eye' : 'eye-open'"/>
          </span>
        </a-form-item>
      </a-tooltip>

      <div class="button-container">
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          @keyup.native.prevent="handleSubmit"
        >Login</a-button>
      </div>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      form: this.$form.createForm(this),
      typePwd: 'password',
      capsTooltip: false
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      console.log(shiftKey, key)
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= 'a' && key <= 'z')) ||
          (!shiftKey && (key >= 'A' && key <= 'Z'))
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$store.dispatch('user/login', values)
        }
      })
    },
    showPwd() {
      if (this.typePwd === 'password') {
        this.typePwd = ''
      } else {
        this.typePwd = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.login-container {
  width: 100%;
  min-height: 100%;
  background-color: #2d3a4b;
  overflow: hidden;

  .login-form {
    position: relative;
    max-width: 100%;
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title {
    font-size: 26px;
    color: #eee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  /deep/.ant-form-item-children {
    display: block;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .ant-input {
      width: 85%;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #fff;
      height: 47px;
      caret-color: #fff;
      outline: none !important;
    }

    .ant-input:focus {
      box-shadow: none;
    }
  }

  .button-container button {
    width: 100%;
  }
}
</style>
