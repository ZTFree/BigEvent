$(function () {
  //点击去注册的链接
  $('#linke-reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#linke-login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  var form = layui.form
  var layer = layui.layer
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })
  // 监听表单的注册提交事件
  var layer = layui.layer
  $('#form-reg').on('submit', function (e) {
    e.preventDefault();
    var data = {
      username: $('#form-reg [name=username]').val(),
      password: $('#form-reg [name=password]').val()
    }
    console.log(data);
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录')
      $('#linke-login').click()
    })
  })
  //监听表单的登录提交事件
  $('#form-login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method:'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        
        layer.msg('登录成功')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})