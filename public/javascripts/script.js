//On Loading Of Page Set Current Date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1
var yyyy = today.getFullYear();
var activeDate;
var activeTimes = [];

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
    return new Date( 2000+(year%2000), month, 0 ).getDate()
}
function indexOfSmallest(a) {
    var lowest = 0;
    for (var i = 1; i < a.length; i++) {
        if (a[i][2] < a[lowest][2]) lowest = i;
    }
    return lowest;
}
function adjustDay(y,m,d) {
    if(d>daysInMonth(m,y)) { m++; d=1; }
    if(d<=0){ m--; d=daysInMonth(m,y); }
    return [y,m,d];
}
function ordinalSuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}
function tConvert(time) {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { 
        time = time.slice(1);
        time[5] = +time[0] < 12 ? ' AM' :  ' PM';
        time[0] = +time[0] % 12 || 12;
    }
    return time.join('');
}
function createBtn(div,list,style) {
    var i = 0;
    while (i < list.length) {
        var row = document.createElement("row");
        row.className = "row";
        for (var y = 0; y < list.length; y++) {
            var btnWrapper = document.createElement("buttonWrapper");
            btnWrapper.className = "buttonWrapper";
            var btn = document.createElement("button");
            btn.className = style;
            btn.id = div.id + '-b' + i;
            var t = document.createTextNode(tConvert(list[i]));
            btn.appendChild(t);
            btnWrapper.appendChild(btn);
            row.appendChild(btnWrapper);
            i++;
        }
        div.appendChild(row);
    }
}
function intAppointment() {
    var div = document.getElementById("appointment");
    const startTime = 500;
    const endTime = 2300;
    activeTimes = ["6:00 AM","7:00 AM"];
    
    var listTime = [];
    for ( var y=0; y <= (endTime-startTime)/100; y++) {
        var num = String(startTime + y*100);
        num = String("0".repeat(4-num.length)).concat(num)
        listTime.push(num.slice(0, 2) + ":" + num.slice(2));
    }
    createBtn(div,listTime,"button");

    var btns = div.getElementsByClassName("button");
    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        //Config Active Elements From Table
        if(activeTimes.includes(btns[i].innerHTML)) {btns[i].className += " active";}
        btns[i].addEventListener("click", function() {
            if(hasClass(this,"active")){
                this.className = this.className.replace(" active", "");
                var index = activeTimes.indexOf(this.innerHTML);
                activeTimes.splice(index, 1);
            } else {
                this.className += " active";
                activeTimes.push(this.innerHTML);
            }
        });
    }
}
function intDate() {
    var div = document.getElementById("header");
    activeDate = ordinalSuffix(dd);
    createBtn(div,Array(4).join(".").split("."),"label");
    showDates(0);
    
    var btns = div.getElementsByClassName("label");
    var header = div.lastChild.childNodes;
    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        //if(btns[i].parentElement.childElementCount > 1) { console.log(btns[i].parentElement.firstChild.innerHTML); }
        btns[i].addEventListener("click", function() {
            activeDate = this.innerHTML;
            showDates(0);
        });
    }
}
function updateDates(a) {
    var div = document.getElementById("header");
    var btns = div.getElementsByClassName("label");
    const min = indexOfSmallest(a);
    for (var i = 0; i < btns.length; i++) {
        var parent = btns[i].parentElement;
        //Display Month Above Closest related to Left
        if(parent.childElementCount>1){parent.removeChild(parent.firstChild);}
        if(i<=0 && min!=i) {
            var dateE = document.createElement("txt");
            dateE.className = "buttonHeading";
            var date = document.createTextNode(monthNames[a[i][1]-1]);
            dateE.appendChild(date);
            parent.insertBefore(dateE, parent.firstChild);
        } else if(min==i) {
            var dateE = document.createElement("txt");
            dateE.className = "buttonHeading";
            var date = document.createTextNode(monthNames[a[i][1]-1]);
            dateE.appendChild(date);
            parent.insertBefore(dateE, parent.firstChild);
        }
        //Set the new list info
        btns[i].innerHTML=ordinalSuffix(a[i][2]);
        btns[i].className = btns[i].className.replace(" active", "");
        if(btns[i].innerHTML == activeDate) { btns[i].className += " active"; }
    }
}
function showDates(i) {
    dd += i;
    let date = adjustDay(yyyy,mm,dd);
    yyyy = date[0];
    mm = date[1];
    dd = date[2];

    var listDate = [];
    listDate.push([yyyy,mm,dd]);
    var ty=yyyy;
    var tm=mm;
    var td=dd;
    for ( var y=0; y<=2; y++) {
        td++;
        date = adjustDay(ty,tm,td);
        ty = date[0];
        tm = date[1];
        td = date[2];
        listDate.push([ty,tm,td]);
    }
    updateDates(listDate);
}
function add() {
    console.log(activeDate);
    console.log(activeTimes);
}
window.onload = (event) => {
    intDate();
    intAppointment();
};