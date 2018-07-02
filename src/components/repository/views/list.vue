<template>
    <section id="repositories" class="wrapper full-height">
        <app-header v-bind:title="title">
            <a class="navbar-item" v-on:click="onBackPressed">
                <img src="@/assets/images/back.svg" class="icon-back" />
            </a>
        </app-header>
        <div class="columns is-vcentered is-centered full-height">
            <div class="column is-6-fullhd">
                <h1 class="is-size-3">
                    <span>Projects</span>
                </h1>
                <div class="field">
                    <div class="control">
                        <div class="select is-primary full-width">
                            <select title="Select Repository" class="full-width" v-model="selectedRepo" v-on:change="onRepoSelected">
                                <option value="" hidden>Select Repository</option>
                                <option  v-for="( repo, index ) in repos" v-bind:value="repo.name">
                                    {{repo.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

	import { GitHubAPI } from "@/components/shared/services";

	import { Header } from "@/components/shared";

	export default {

		name: "repository",

		components: {
			AppHeader: Header
		},

		created () {

			this.gitHubClient = new GitHubAPI();
		},

		data: function () {

			return {

				repos: [],
                selectedRepo: ""
			};
		},

		computed: {
            username: function () {
            	return this.$route.params[ "username" ];
            },
            title: function () {
            	return `${ this.username } GitHub`;
            }
		},

		methods: {

			getUsername: function () {
				return this.username;
			},

			getSelectedRepo: function () {
				return this.selectedRepo;
			},

            setRepos: function ( repos ) {
				this.repos = repos;
            },

            getUserRepos: function ( username ) {
				return this.gitHubClient.getUserRepos( username )
                    .catch( () => {

                    })
                    .then( response => {
                        return response.map( repo => {
                            return {
                                name: repo.name
                            }
                        });
                    })
                    .then( this.setRepos )
                ;
            },

			onRepoSelected: function () {
				this.$router.push({
					name: "repo",
                    params: {
                        owner: this.getUsername(),
                        repo: this.getSelectedRepo()
                    }
				});
			},

			onBackPressed: function () {
				this.$router.push({
                    name: "home"
                });
			},
		},

        mounted: function () {
			this.getUserRepos( this.getUsername() );
        }
	}
</script>

<style scoped lang="scss" src="../styles/repository.scss"></style>
