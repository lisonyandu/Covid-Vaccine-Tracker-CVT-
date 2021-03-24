function processFormSubmission() {
    var first_name = document.getElementById("fname").value;
    var last_name = document.getElementById("surname").value;
    var vaccine_date = document.getElementById("date_v").value;
    var vaccine_type = document.getElementById("type_of_v").value;
    var vaccine_place = document.getElementById("place_of_v").value;

  
    document.getElementById("first_n").innerHTML = first_name;
    document.getElementById("last_n").innerHTML = last_name;
    document.getElementById("date_vac").innerHTML = vaccine_date;
    document.getElementById("vaccine_n").innerHTML = vaccine_type;
    document.getElementById("place_n").innerHTML =  vaccine_place;
  
    // do not submit the form
    return false;
  }
  