<template>
    <section id="repository_details" class="wrapper">
        <app-header v-bind:title="title">
            <a class="navbar-item" v-on:click="onBackPressed">
                <img src="@/assets/images/back.svg" class="icon-back" />
            </a>
        </app-header>
        <div class="columns full-height">
            <div class="column">
               <section class="content html-content">
                   <article v-html="htmlContent"></article>
               </section>
            </div>
        </div>
    </section>
</template>

<script>

    import Showdown from "showdown";

	import { GitHubAPI } from "@/components/shared/services";

	import { Header, BackButton } from "@/components/shared";

	export default {

		name: "repository-details",

		components: {
			AppHeader: Header,
			BackButton: BackButton
		},

		created () {

			this.gitHubClient = new GitHubAPI();
			this.markdownClient = new Showdown.Converter();
		},

		data: function () {

			return {

				content: ""
			};
		},

		computed: {
            username: function () {
            	return this.$route.params[ "username" ];
            },
            repo: function () {
            	return this.$route.params[ "repo" ];
            },
            title: function () {
            	return `${ this.repo }`;
            },
            htmlContent: function () {
            	return this.markdownClient.makeHtml( this.content );
            }
		},

		methods: {

			getOwner: function () {
				return this.username;
			},
			getRepo: function () {
				return this.repo;
			},

			setContent: function ( content ) {
				this.content = content;
            },


            getRepoReadme: function ( owner, repo ) {
				return this.gitHubClient.getRepoReadme( owner, repo )
                    .catch( () => {

                    })
                    .then( response => {
                    	return this.gitHubClient.getMarkupDecoded( response.content );
                    })
                    .then( markup => {
                        this.setContent( markup);
                    })
                ;
            },

			onBackPressed: function () {
				this.$router.push({
                    name: "repos",
                    params: {
                    	username: this.getOwner()
                    }
                });
			},
		},

        mounted: function () {
			this.getRepoReadme( this.getOwner(), this.getRepo() );
        }
	}
</script>

<style scoped lang="scss" src="../styles/repository.scss"></style>
