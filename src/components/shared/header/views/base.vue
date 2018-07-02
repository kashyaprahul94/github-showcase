<template>
    <header>
        <nav class="navbar is-dark is-fixed-top">
            <div class="navbar-start">
                <slot></slot>
                <div class="navbar-brand">
                    <a class="navbar-item" v-on:click="onBrandPressed">
                        <span>{{ title || defaultTitle }}</span>
                    </a>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>

	export default {

		name: "app-header",

		props: {
            title: String
		},

		components: {

		},

		data: () => {
			return {
				defaultTitle: "GitHub Showcase"
			};
		},

        methods: {
			onBrandPressed: function () {
                // this.$router.push({
                //     name: "home"
                // });
            }
        }
	}
</script>

<style scoped lang="scss" src="../styles/header.scss"></style>
