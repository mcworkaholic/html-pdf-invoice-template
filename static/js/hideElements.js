$(document).ready(function() {
    var urlToJsonFile = "static/json/clients.json";

    $.getJSON(urlToJsonFile, function(data) {
        hideElements(data);
    });

    function hideElements(data) {
        let allSocialMediaNotRequired = true;  
        let allPaymentNotRequired = true;  
        for (let key in data["clientInfo"]) {
            // Check if the property is an object and has a "handles" property
            if (data["clientInfo"][key].hasOwnProperty('handles')) {
                // Iterate over each handle within the "handles" object
                for (let subKey in data["clientInfo"][key]["handles"]) {
                    if (data["clientInfo"][key]["handles"][subKey]["required"] == false) {
                        $('#' + data["clientInfo"][key]["handles"][subKey]["id"]).addClass("hide-element");
                        $('label[for="' + data["clientInfo"][key]["handles"][subKey]["id"] + '"]').addClass("hide-element");
                        $('label[for="' + data["clientInfo"][key]["handles"][subKey]["id"] + '"]').next('br').addClass("hide-element");
                    } else {
                        if(key === "socialMediaHandles") {
                            allSocialMediaNotRequired = false; 
                        } else if(key === "paymentHandles") {
                            allPaymentNotRequired = false; 
                        }
                    }
                }
            // If the property does not have a "handles" property
            } else if (data["clientInfo"][key]["required"] == false) {
                $('#' + data["clientInfo"][key]["id"]).addClass("hide-element");
                $('label[for="' + data["clientInfo"][key]["id"] + '"]').addClass("hide-element");
                $('label[for="' + data["clientInfo"][key]["id"] + '"]').next('br').addClass("hide-element");
            }
        }
        // If all social media handles are not required, hide the social media label and following <br> tags
        if (allSocialMediaNotRequired) {
            $('label[for="socials"]').addClass("hide-element");
            $('label[for="socials"]').nextAll('br').slice(0, 2).addClass("hide-element");
        }
        // If all payment handles are not required, hide the payment label and following <br> tags
        if (allPaymentNotRequired) {
            $('label[for="payments"]').addClass("hide-element");
            $('label[for="payments"]').nextAll('br').slice(0, 2).addClass("hide-element");
        }
    }
});
