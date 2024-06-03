$(document).ready(function () {
    let amenities = {};

    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function () {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            amenities[amenityId] = amenityName;
        } else {
            delete amenities[amenityId];
        }

        // Update the h4 tag inside the div Amenities with the list of Amenities checked
        const amenityList = Object.values(amenities).join(', ');
        $('div.amenities h4').text(amenityList);
    });
});
