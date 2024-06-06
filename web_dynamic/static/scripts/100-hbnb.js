$(document).ready(function () {
  // Check API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').attr('class', 'available');
    } else {
      $('#api_status').attr('class', '');
    }
  });

  const amenities = {};
  const states = {};
  const cities = {};

  // Listen for changes on each amenity checkbox tag
  $('div.amenities input[type="checkbox"]').change(function () {
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

  // Listen for changes on each state checkbox tag
  $('div.locations input[data-name]').change(function () {
    const stateId = $(this).data('id');
    const stateName = $(this).data('name');

    if ($(this).is(':checked')) {
      states[stateId] = stateName;
    } else {
      delete states[stateId];
    }

    // Update the h4 tag inside the div Locations with the list of States and Cities checked
    const locationList = [...Object.values(states), ...Object.values(cities)].join(', ');
    $('div.locations h4').text(locationList);
  });

  // Listen for changes on each city checkbox tag
  $('div.locations ul ul input[data-name]').change(function () {
    const cityId = $(this).data('id');
    const cityName = $(this).data('name');

    if ($(this).is(':checked')) {
      cities[cityId] = cityName;
    } else {
      delete cities[cityId];
    }

    // Update the h4 tag inside the div Locations with the list of States and Cities checked
    const locationList = [...Object.values(states), ...Object.values(cities)].join(', ');
    $('div.locations h4').text(locationList);
  });

  // Load places when the button is clicked
  $('button').click(function () {
    $('.places').empty(); // Clear previous results

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amenities),
        states: Object.keys(states),
        cities: Object.keys(cities)
      }),
      success: function (data) {
        data.forEach(place => {
          $('.places').append(
            `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`
          );
        });
      }
    });
  });
});
