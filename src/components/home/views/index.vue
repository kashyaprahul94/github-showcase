<template>
    <section id="home" class="wrapper full-height">
        <app-header v-bind:title="title">
            <!-- -->
        </app-header>
        <div class="columns is-vcentered is-centered full-height">
            <div class="column is-6-fullhd">
                <div class="field">
                    <div class="control is-large has-icons-right" v-bind:class="{ 'is-loading': isLoading }">
                        <input type="text" class="input is-large is-rounded" placeholder="Enter GitHub Username" v-model="username" v-on:keyup.enter="onUsernameEnter" />
                        <a class="icon is-right" v-show="isValidUser">
                            <img src="@/assets/images/okay.svg" class="icon-okay" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

	import _ from "lodash";

	import { GitHubAPI } from "@/components/shared/services";

	import { Header } from "@/components/shared";

	export default {

		name: "home",

		components: {
			AppHeader: Header
		},

		created () {

			this.gitHubClient = new GitHubAPI();
		},

		data: function () {

			return {

				title: "GitHub Demo Project",
				isLoading: false,
				isValidUser: false,

				username: ""
			};
		},

		watch: {
			username: function () {
				this.isValidUser = false;
				this.onUsernameChanged();
			}
		},

		computed: {

		},

		methods: {

			getUsername: function () {
				return this.username;
			},

			shouldSearchForUser: function () {
				return ( this.getUsername() && this.isValidUser );
			},

			onUsernameEnter: function () {
				if ( this.shouldSearchForUser() ) {
					this.$router.push({
						name: "repos",
						params: {
							username: this.getUsername()
                        }
					});
				}
			},



			isUsernameValid: function ( username ) {

				this.isLoading = true;

				this.gitHubClient.userExists( username )
					.then( () => {
						this.isValidUser = true;
					}, () => {
						this.isValidUser = false;
					})
					.catch( () => {
						this.isValidUser = false;
					})
					.finally( () => {
						this.isLoading = false;
					})
				;
			},

			onUsernameChanged: _.debounce( function () {
				this.isUsernameValid( this.username );
			}, 500 )
		}
	}
</script>

<style scoped lang="scss" src="../styles/home.scss"></style>