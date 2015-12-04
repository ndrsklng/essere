

/*
if ($("div#preview-toolbox").length) {
*/

$.fn.insertDivForFirefoxPositioning = function() {
    var $el;
    return this.each(function() {
    	$el = $(this);
    	var newDiv = $("<div />", {
    		"class": "innerWrapper",
    		"css"  : {
    			"width"   : "100%",
    			"position": "relative",
    		}
    	});
    	$el.wrapInner(newDiv);
    });
};


$(function() {

	// Make heading below product image clickable
	$("div.gridArticleText").click(function(e) {
		window.location.href = $(this).parent().find("a.gridArticleName").attr("href");
	});

	// Move the login link and logged in information
	$("div.object_login").prependTo("#upperField");

	// Display rea image
	$("div.gridArticleImageContainer").css('vertical-align','bottom');
	$("div.gridArticleImageContainer").insertDivForFirefoxPositioning();
	$("td.gridArticleContainer").each(function(index) {
		var imageContainer = $(this).find("div.gridArticleImageContainer");
		var imageContainerHeight = imageContainer.height();
		var elementToWriteTo = $(this).find("img.gridArticleImage");
		var elementToWriteToHeight = elementToWriteTo.height();
		var innerWrapperHeight = $(this).find("div.innerWrapper").height();

		var validDiscountsArray = new Array(10, 15, 20, 25, 30, 40, 50, 60, 70, 80);
		var regularPrice = $(this).find("span.gridArticlePriceRegular").text();
		var reducedPrice = $(this).find("span.reducedPrice").text();

		var imagePos =innerWrapperHeight - 70;

		if (regularPrice.length != 0) {
			regularPrice = regularPrice.replace(" ", "");
			reducedPrice = reducedPrice.replace(" ", "");
			var regularPriceTrimmed = regularPrice.substring(0,regularPrice.length-2);
			var reducedPriceTrimmed = reducedPrice.substring(0,reducedPrice.length-2);

			// Outlet products have reduced priced element, but always ends with 0
			// => should not have an image
			var lastChar = reducedPriceTrimmed.substr(reducedPriceTrimmed.length - 1);
			if (lastChar != 0) {
				var regularPrice = parseInt(regularPriceTrimmed);
				var reducedPrice = parseInt(reducedPriceTrimmed);
				var discount = (regularPrice - reducedPrice) / regularPrice;
				var discountRounded = discount.toFixed(1) * 100;
				var imageName = 'rea.png';
				if ($.inArray(discountRounded, validDiscountsArray) > -1) {
					imageName = discountRounded + 'percent.png';
				}
				var imgSmallTag = "<img src='http://static-essere.appspot.com/image/sale/" + imageName + "' height='70px' width='70px' style='position: absolute; top: " + imagePos  + "px; left: 0px;'/>";
				$(imgSmallTag).insertAfter(elementToWriteTo);
			} else {
				var imgSmallTag = "<img src='http://static-essere.appspot.com/image/sale/outlet.png' height='70px' width='70px' style='position: absolute; top: " + imagePos  + "px; left: 0px;'/>";
				$(imgSmallTag).insertAfter(elementToWriteTo);
				}
		}
	});

	if($("div.mypages")) {
		var element = $("div.mypages div div.section");
		if (element.text().indexOf("DHL") > -1) {	
			var section = $("div div.section", $(this));
			section.hide();
			var id = getPackageId();
			var htmlString = "<div style='margin-top:30px; margin-bottom:40px;'>";
			htmlString += "<h3>Kollisökning</h3>";
			htmlString += "<p>Kolli-ID: " + id + "</p>";
			htmlString += "<input type='button' onClick='openSchenker()' value='Sök paket via Schenker' />";
			htmlString += "</div>";
			$(htmlString).insertBefore(section);
		}
	}
});

function getPackageId() {
	var kolliIdElement = $("div.mypages div div.section p:first");
	var regexp = /\d+/;	
	var id = regexp.exec(kolliIdElement.html());
	return id;
}

function openSchenker() {
	var id = getPackageId();
	var schenkerUrl = "http://privpakportal.schenker.nu/TrackAndTrace/packagesearch.aspx?PackageId=" + id;
	window.open(schenkerUrl, '_blank','innerWidth=600,innerHeight=600,resizable=yes');
}
