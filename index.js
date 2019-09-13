var cdate = null;
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#date_id").value = today;
 
function onloadPage(newOne,newOneRaw) {
    if(!cdate)
    {
        cdate = new Date(document.querySelector("#date_id").value);
    }
    if((newOne==undefined||newOne=="")||(newOneRaw==undefined||newOneRaw=="")){
        var select_date = document.getElementById('date_id').value;
        var res = select_date.replace(/-/g, "/");//1990/02/02
    }
    else{
        var select_date = newOneRaw;
        var res = newOne;
    }
    document.getElementById('calender_area_id').style.display="block";
   
   
    if (select_date !=undefined && select_date !="") {
        var xhttp =new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
               
                var data = JSON.parse(xhttp.responseText);
                let var_1 = document.getElementById("date_large_id1");
                document.getElementById("card-title_id1").innerText = data.celebrations[0].title;
                var_1.innerText = data.date;
                if(data.celebrations[0].colour=="white"){
                    var_1.style.borderColor ="blue"
                }
                else
                var_1.style.borderColor = data.celebrations[0].colour;
                var day = new Date(select_date);
 
                var nextDay = new Date(day);
                var lastDay = new Date(day);
                lastDay.setDate(day.getDate()-1);
                nextDay.setDate(day.getDate()+1);
                var formatted_nextDay =nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + nextDay.getDate()
                var formatted_lastDay =lastDay.getFullYear() + "-" + (lastDay.getMonth() + 1) + "-" + lastDay.getDate()
               
               
                document.getElementById("date_large_id0").innerHTML=formatted_lastDay;
                document.getElementById("date_large_id2").innerHTML=formatted_nextDay;
                document.getElementById("date_large_id0").style.borderColor=data.celebrations[0].colour;
                document.getElementById("date_large_id2").style.borderColor=data.celebrations[0].colour;
                document.getElementById("card-title_id0").innerText = data.celebrations[0].title;
                document.getElementById("card-title_id2").innerText = data.celebrations[0].title;              
              }
        }
        xhttp.open("GET", "http://calapi.inadiutorium.cz/api/v0/en/calendars/default/"+res, true);
        xhttp.send();
    }
     else {
        var index = ["yesterday", "today", "tomorrow"];
        var request = new XMLHttpRequest();
        (function loop(i, length) {
            if (i >= length) {
                return;
            }
            var url = "http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/" + index[i];
 
            request.open("GET", url);
            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    var data = JSON.parse(request.responseText);
                   
                    loop(i + 1, length);
                    let var_1 = document.getElementById("date_large_id" + i);
                    document.getElementById("card-title_id" + i).innerText = data.celebrations[0].title;
                    var_1.innerText = data.date;
                    var_1.style.borderColor = data.celebrations[0].colour;
 
                   
                   
                }
            }
            request.send();
        })(0, index.length);
    }
   
}
function nextDate(){
   
    var select_date = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate();
    cdate.setDate(cdate.getDate()+1);
    var res = select_date.replace(/-/g, "/");//1990/02/02
    if (select_date == "" || select_date == undefined) {
        var day = new Date();
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        var formatted_nextDay = nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + nextDay.getDate()
        var res = formatted_nextDay.replace(/-/g, "/");
       
        onloadPage(res, formatted_nextDay)
    } else {
        var day = new Date(select_date);
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        var formatted_nextDay = nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + nextDay.getDate();
        var res = formatted_nextDay.replace(/-/g, "/");
       
        onloadPage(res, formatted_nextDay)
    }
    var day = new Date(select_date);
       
 
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        var formatted_nextDay = nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + nextDay.getDate()        
       
}
function pastDate(){
    var select_date = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate();
    cdate.setDate(cdate.getDate()-1);
    var res = select_date.replace(/-/g, "/");//1990/02/02
    if (select_date == "" || select_date == undefined) {
        var day = new Date();
       
 
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() - 1);
        var formatted_nextDay = nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + nextDay.getDate()
        var res = formatted_nextDay.replace(/-/g, "/");
       
        onloadPage(res, formatted_nextDay)
    } else {
        var day = new Date(select_date);
       
 
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() - 1);
        var formatted_nextDay = nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + nextDay.getDate()
        var res = formatted_nextDay.replace(/-/g, "/");
       
        onloadPage(res, formatted_nextDay)
    }  
}
