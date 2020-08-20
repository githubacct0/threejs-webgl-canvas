export default class Theme {
	constructor() {
		this.$el = $('.theme-switch');
		this.init();
	}
	init() {

		/*================================================
							Theme
		================================================*/
		if ($(window).width() < 961) {
			window.localStorage.setItem('theme', 'dark');
		}
		var theme = window.localStorage.getItem('theme');
		if (theme === 'dark') {
			$('html').attr('data-theme', 'dark');
			this.$el.attr('data-mode', 'dark');
		}
		if (theme === 'light') {
			$('html').attr('data-theme', 'light');
			this.$el.attr('data-mode', 'light');
		}
		this.$el.click(function(event) {
			var that = $(this);
			var data = that.attr('data-mode');
			var stTheme = window.localStorage.getItem('theme');
			if (data === 'dark' || stTheme === 'dark') {
				$('html').attr('data-theme', 'light');
				that.attr('data-mode', 'light');
				window.localStorage.setItem('theme', 'light')
				// document.cookie = "theme=light; expires=Fri, 31 Dec 9999 23:59:59 GMT";
			}
			if (data === 'light' || stTheme === 'light') {
				$('html').attr('data-theme', 'dark');
				that.attr('data-mode', 'dark');
				window.localStorage.setItem('theme', 'dark')
				// document.cookie = "theme=dark; expires=Fri, 31 Dec 9999 23:59:59 GMT";
			}
		});



		/*================================================
						Cookie Popup
		================================================*/
		var cPop = window.localStorage.getItem('cPop');
		console.log(theme);
		if (cPop === 'hide') {
			$('.cookies-notice').remove();
		}

		$('.cookies-notice__close-btn').click(function(event) {
			$('.cookies-notice').addClass('is-closed');
			setTimeout(function(){
				$('.cookies-notice').remove();
			},700)
			window.localStorage.setItem('cPop', 'hide')
		});


	}
}