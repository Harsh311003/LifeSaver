var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 30000,
};

function errors(error) {
  console.log(error);
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("please allow location");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred. try again");
      break;
    default:
      alert("some problem occured try again");
  }
}

export const getCurrentLocation = (cb) => {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(
      (position) => {
        cb(position);
      },
      errors,
      options
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};
