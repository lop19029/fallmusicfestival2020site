
var FORM_FILLED = false;
function validateForm() {
    var solo, duet, concerto, first_name, last_name, student_id, skill, instrument, location, room, time_slot;
    solo = document.getElementById("solo");
    duet = document.getElementById("duet");
    concerto = document.getElementById("concerto");
    first_name = document.getElementById("first_name").value;
    last_name = document.getElementById("last_name").value;
    student_id = document.getElementById("student_id").value;
    location = document.getElementById("location").value;
    room = document.getElementById("room").value;
    time_slot = document.getElementById("time_slot").value;

    if(!(solo.checked | duet.checked | concerto.checked)){
        document.getElementById("solo").focus();
        document.getElementById("formAlert").innerHTML = "*You must fill all the fields"
       
    }
    else if(first_name.length === 0) {
        document.getElementById("formAlert").innerHTML = "*You must fill all the fields"
        document.getElementById("first_name").focus();
        
    }
    else if(last_name.length === 0) {
        document.getElementById("formAlert").innerHTML = "*You must fill all the fields"
        document.getElementById("last_name").focus();
        
    }
    else if(student_id.length === 0) {
        document.getElementById("formAlert").innerHTML = "*You must fill all the fields"
        document.getElementById("student_id").focus();
        
    }
    else if(location.length === 0) {
        document.getElementById("formAlert").innerHTML = "*You must fill all the fields"
        document.getElementById("location").focus();
        
    }
    else if(room.length === 0) {
        document.getElementById("formAlert").innerHTML = "*You must fill all the fields"
        document.getElementById("room").focus();
        
    }
    else if(time_slot.length === 0) {
        document.getElementById("formAlert").innerHTML = "*You must fill all the fields"
        document.getElementById("time_slot").focus();
        
    }
    else {
        if (duet.checked){
            verifyDuet();
        }
        else {
            document.getElementById("formAlert").innerHTML = "";
            return FORM_FILLED = true;
        }
    }
    return FORM_FILLED;
        
}
    
function verifyDuet(){
    var first_name_2, last_name_2, student_id_2;
        first_name_2 = document.getElementById("first_name_2").value;
        last_name_2 = document.getElementById("last_name_2").value;
        student_id_2 = document.getElementById("student_id_2").value;

        if(first_name_2.length === 0) {
            document.getElementById("formAlert").innerHTML = "*You must fill all the fields";
            document.getElementById("first_name_2").focus();
        }
        else if(last_name_2.length === 0) {
            document.getElementById("formAlert").innerHTML = "*You must fill all the fields";
            document.getElementById("last_name_2").focus();
        }
        else if(student_id_2.length === 0) {
            document.getElementById("formAlert").innerHTML = "*You must fill all the fields";
            document.getElementById("student_id_2").focus();
        }
        else{
            document.getElementById("formAlert").innerHTML = "";
            return FORM_FILLED = true;
        }
}
function checkForDuet() {
    var duet,html;
    duet = document.getElementById("duet");
    html = ""

    if(duet.checked) {
        html += "<p>Student 2</p><input type=\"text\" id=\"first_name_2\" name = \"first_name_2\""+ 
        "placeholder=\"First Name\" onchange=\"verifyDuet()\"><br><input type=\"text\" id=\"last_name_2\" name=\"last_name_2\""+
        " placeholder=\"Last Name\" onchange=\"verifyDuet()\"><br><input type=\"text\" id=\"student_id_2\" name=\"student_id_2\" maxlength=\"4\""+ 
        "placeholder=\"Student ID\" onchange=\"verifyDuet()\"><br>"
    }
    document.getElementById("duetoForm").innerHTML = html;
}

//Skill bar listener
function measureSkills(){
    var slider = document.getElementById("skill");
    var output = document.getElementById("skillLevel");
    
    if(slider.value == 4) {
        output.innerHTML = "Advanced"
    }
    else if(slider.value == 3) {
        output.innerHTML = "Pre-advanced"
    }
    else if(slider.value == 2) {
        output.innerHTML = "Intermediate"
    }
    else if(slider.value == 1) {
        output.innerHTML = "Beginner"
    }
}
/*Try to use this for async JavaScript call of PHP file
function submitForm() {
    var performance, first_name, last_name, student_id, skill, instrument, location, room, time_slot;
    performance = document.getElementById("performance").value;
    first_name = document.getElementById("first_name").value;
    last_name = document.getElementById("last_name").value;
    student_id = document.getElementById("student_id").value;
    
    skill = document.getElementById("skill").value;
    instrument = document.getElementById("instrument").value;
    location = document.getElementById("location").value;
    room = document.getElementById("room").value;
    time_slot = document.getElementById("time_slot").value;
    if(performance == "duet") {
        var first_name_2, last_name_2, student_id_2;
        first_name_2 = document.getElementById("first_name_2").value;
        last_name_2 = document.getElementById("last_name_2").value;
        student_id_2 = document.getElementById("student_id_2").value;

        $.ajax({
            type: "POST",
            url: "assign13.php",
            data: {
                performance = performance,
                first_name = first_name,
                last_name = last_name,
                student_id = student_id,
                first_name_2 = first_name_2,
                last_name_2 = last_name_2,
                student_id_2 = student_id_2,
                skill = skill,
                instrument = instrument,
                location = location,
                room = room,
                time_slot = time_slot
            },
            success: displayRegistration()})
    }
    else {
        $.ajax({
        type: "POST",
        url: "assign13.php",
        data: {
            performance = performance,
            first_name = first_name,
            last_name = last_name,
            student_id = student_id,
            skill = skill,
            instrument = instrument,
            location = location,
            room = room,
            time_slot = time_slot
        },
        success: displayRegistration()})
    }
    return false;

}
*/
function sendRequest(){
    console.log("this method was called");
    var request;
    request = new XMLHttpRequest(); 
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            displayRegistration(data);
        }
    };
    request.open("GET", "../data/data.json");
    request.send();
}

function displayRegistration(data) {
    var table = "<tr><th>REGISTRED STUDENTS</th></tr><tr><th>NAME</th><th>PERFORMANCE</th>"+
    "<th>SKILL LEVEL</th><th>INSTRUMENT</th><th>LOCATION</th><th>TIME</th></tr>";

    for(i = 0; i < data.length; i++) {
       if(!(data[i].performance == null)) {
            table += "<tr><td>"+data[i].first_name + " " + data[i].last_name +
            " ("+ data[i].student_id + ")"
            
            //Check for duet 
            if(data[i].performance == "duet") {
                table+= ", and " + data[i].first_name_2 + " " + data[i].last_name_2 + " (" + data[i].student_id_2 +
                ")</td>"
            }
            else{
                table+="</td>"
            }
            table+= "<td>" + data[i].performance + "</td><td>" + data[i].skill + "</td><td>" + data[i].instrument +
            "</td><td>" + data[i].location + ", room #" + data[i].room + "</td><td>" + data[i].time_slot + "</td></tr>";
        }
    }
    document.getElementById("displayTable").innerHTML = table;
}

//Event listener
 function goHome() {
    location.href = "assign13.html";
};