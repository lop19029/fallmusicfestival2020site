<?php 
if(isset ($_POST["register"])) {
    
    $performance = $_POST["performance"];
    if($performance == "duet"){
        $first_name_2 = $_POST["first_name_2"];
        $last_name_2 = $_POST["last_name_2"];
        $student_id_2 = $_POST["student_id_2"];
    }

    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $student_id = $_POST["student_id"];
    switch ($_POST["skill"]) {
        case 1:
            $skill = "Beginner";
            break;
        case 2:
            $skill = "Intermediate";
            break;
        case 3:
            $skill = "Pre-advanced";
            break;
        case 4:
            $skill = "Advanced";
            break; 
    }

    $instrument = $_POST["instrument"];
    $location = $_POST["location"];
    $room = $_POST["room"];
    $time_slot = $_POST["time_slot"];
    $file = "/home/lop19029/public_html/data/data.json";

    if(!file_exists($file)) {
        //Create a file
        $data_file = fopen($file, "x");
        //Create arrays
        $data_array = array();
        $reservation = array();

        //Load data
        $reservation["performance"] = $performance;
        $reservation["first_name"] = $first_name;
        $reservation["last_name"] = $last_name;
        $reservation["student_id"] = $student_id;
        
        //Load second student if duet
        if($performance == "duet"){
            $first_name_2 = $_POST["first_name_2"];
            $last_name_2 = $_POST["last_name_2"];
            $student_id_2 = $_POST["student_id_2"];
            $reservation["first_name_2"] = $first_name_2;
            $reservation["last_name_2"] = $last_name_2;
            $reservation["student_id_2"] = $student_id_2;
        }

        $reservation["skill"] = $skill;
        $reservation["instrument"] = $instrument;
        $reservation["location"] = $location;
        $reservation["room"] = $room;
        $reservation["time_slot"] = $time_slot;
        
        //Add $reservation and enconde
        $data_array[] = $reservation;
        $final_data = json_encode($data_array);
        file_put_contents($file, $final_data);
        fclose($data_file); 
    }
    else {
        //Load current data
        $current_data = file_get_contents($file);
        $data_array = json_decode($current_data, true);

        //Create a new array
        $reservation = array();

        //Load data
        $reservation["performance"] = $performance;
        $reservation["first_name"] = $first_name;
        $reservation["last_name"] = $last_name;
        $reservation["student_id"] = $student_id;
        
        //Load second student if duet
        if($performance == "duet"){
            $first_name_2 = $_POST["first_name_2"];
            $last_name_2 = $_POST["last_name_2"];
            $student_id_2 = $_POST["student_id_2"];
            $reservation["first_name_2"] = $first_name_2;
            $reservation["last_name_2"] = $last_name_2;
            $reservation["student_id_2"] = $student_id_2;
        }

        $reservation["skill"] = $skill;
        $reservation["instrument"] = $instrument;
        $reservation["location"] = $location;
        $reservation["room"] = $room;
        $reservation["time_slot"] = $time_slot;
        
        //Add $reservation and enconde
        $data_array[] = $reservation;
        $final_data = json_encode($data_array);
        file_put_contents($file, $final_data);

    }
}
?>
<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="UFT-8">
        <title>Student's Registration</title>
        <script src="script.js"></script>
        <link rel="stylesheet" type="text/css" href="styles.css">
    </head>
    <body>
    <header>
            <img src="title.png" alt="FALL MUSIC FESTIVAL 2020">
        </header>
        <div id="anouncement">
            <h1>Congratulations, you were registred</h1>
            <p>Press the button and verify your name on the inscriptions list</p>
            <button type="button" id="goBackHome" onclick = "goHome()">Go back to Home page</button>
        </div>
