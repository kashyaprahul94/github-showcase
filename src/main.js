import Vue from "vue";

import router from "./router";

import { App as AppView } from "./components/app/index";


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h( AppView )
})
	.$mount( "#app" )
;
