// // Sticky sidebar w/jQuery
// sidebarwidth = $(".sidebar-width").css('width');
// bodypaddingtop = $(".navbar-fixed-top").css('height');
// // sidebarheight = $("body").css('height');
// $('.sidebar-nav-fixed').css('width', sidebarwidth);
// $('.sidebar-nav-fixed').css('height', sidebarheight);
// $('body').css('paddingTop', bodypaddingtop)
// contentmargin = parseInt(sidebarwidth)
// $('.span-fixed-sidebar').css('marginLeft', contentmargin);
// $('.span-fixed-sidebar').css('paddingLeft', 60);
function resizeit() {
	// Sticky sidebar w/jQuery
	sidebarwidth = $(".sidebar-width").css('width');
	bodypaddingtop = $(".navbar-fixed-top").css('height');
	// sidebarheight = $("body").css('height');
	$('.sidebar-nav-fixed').css('width', sidebarwidth);
	$('.sidebar-nav-fixed').css('height', sidebarheight);
	$('body').css('paddingTop', bodypaddingtop)
	contentmargin = parseInt(sidebarwidth)
	$('.span-fixed-sidebar').css('marginLeft', contentmargin);
	$('.span-fixed-sidebar').css('paddingLeft', 60);
}
$(window).resize(function () {
	resizeit();
});
resizeit();
