import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import { Home } from "./components/home/index";
import { Repository, RepositoryDetails } from "./components/repository";


export default new Router({
	
	mode: "history",
	
	root: "/",
	
	routes: [
		{
			name: "home",
			path: "/",
			components: {
				root: Home
			}
		},
		{
			name: "repos",
			path: "/repos/:username",
			components: {
				root: Repository
			}
		},
		{
			name: "repo",
			path: "/repos/:username/:repo",
			components: {
				root: RepositoryDetails
			}
		},
		{
			path: "*",
			components: {
				root: Home
			}
		}
	]
})
