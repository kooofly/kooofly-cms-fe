<style scoped>
  .header{ background: #fff; }
  .header .logo{ width: 100px; height: 40px; background: #eee; display: block; }
  .header nav{ font-family: "Microsoft YaHei", sans-serif; font-size: 0; }
  .header nav a{ font-size: 14px; margin: 3px 10px; display: inline-block; padding: 6px 20px; background: #7799bb; color: #fff; border-radius: 34px; }
  .header nav a:hover{ opacity: .9 }
  .header nav a.v-link-active{ background: #d9534f; box-shadow: #d0534e 0 0 3px 3px inset; opacity: 1 }
  .header nav a.active{ background: #d9534f; box-shadow: #d0534e 0 0 3px 3px inset; opacity: 1 }
</style>
<template>
  <header class="header media">
    <div class="media-left wrapper"><a class="logo" v-link="'/'"></a></div>
    <div class="media-body">
      <nav class="media-body wrapper an-group-moveFromRightFade">
        <a v-for="item in nav" class="anitem" :class="active === item.alias && 'active'" v-link="{ path: '/admin/' + item.alias }">{{item.name}}</a>
      </nav>
      <div class="media-right wrapper">
        user info
      </div>
    </div>
  </header>
</template>
<script>

  export default {
    props: ['nav', 'active'],
    data() {

    },
    ready() {
      console.log('header', this)
    },
    methods: {
      logout: function() {
        console.log(this);
        var http = this.$resource('logout.json');
        http.get({id: 1}, function(res, status, request) {
          this.$parent.$set('auth', res.data.auth);
          this.$parent.$set('isAdmin', true);
          this.$parent.$set('name', res.data.name);
          console.log(this);
        }).error(function(data, status, request) {
          router.go('/500');
        })
        console.log(res);
      }
    }

  }
</script>