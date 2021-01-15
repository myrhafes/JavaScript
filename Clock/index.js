//id Display
let display = document.getElementById('Display');
//function ShowTime
function ShowTime(){
    //Date:
    let date = new Date();
    //Hours, Minutes, Seconds:
    let h = date.getHours();// 0-23
    let m = date.getMinutes();//0-59
    let s = date.getSeconds();//0-59
    //HH:MM:SS
    h = (h<10)? "0"+h : h;
    m = (m<10)? "0"+m : m;
    s = (s<10)? "0"+s : s;
    //time:
    let time = h+":"+m+":"+s;
    //display time
    display.innerHTML= time;
}

setInterval(ShowTime,1000);

