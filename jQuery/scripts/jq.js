$(document).ready(function(){
    $("#filters").on("click", ".onsale-filter", function(){
        $(".highlighted").removeClass("highlighted");
        $(".active").removeClass("active");
        $(".vacation").filter(".onsale").addClass("highlighted");
        $(".onsale-filter").addClass("active");
    })

    $("#filters").on("click", ".expiring-filter", function(){
        $(".highlighted").removeClass("highlighted");
        $(".active").removeClass("active");
        $(".vacation").filter(".expiring").addClass("highlighted");
        $(".expiring-filter").addClass("active");
    })


    $(".vacation").on("click", "button", function() {
        let vacation = $(this).closest(".vacation");
        let amount = vacation.data("price");
        let price = $("<p>From $" + amount + "</p>");
        vacation.append(price);
        $(this).remove();
    })
})