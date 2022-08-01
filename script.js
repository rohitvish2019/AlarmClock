let alarmList = [];
let globalId = 1;

function displayTime(){
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s =  new Date().getSeconds();
    let hs;
    if(s < 10){
        hs = "0"+s.toString();
    }
    else{
        hs = s.toString();
    }
    let temp = convertTo12Hours(h,m);
    const timeToSet = temp.slice(0,6)+":"+hs+" "+temp.slice(6,8);
    document.getElementById('display').innerText = timeToSet;
    
}



function setAlarm(time){
    /*
    Set alarm shold be called like below, string length should be 5;
    Example : setAlarm("14:25");
    */
    let Alarmtime = time;
    let h = parseInt(new Date().getHours());
    let m = parseInt(new Date().getMinutes());
    let hAlarm = parseInt(Alarmtime.slice(0,2));
    let mAlarm = parseInt(Alarmtime.slice(3,5));
    let remHours;
    let remMins;
    if(m < mAlarm){
        remHours = hAlarm - h;
        remMins = mAlarm-m;
    }
    else{
        remHours = hAlarm - h -1;
        remMins = 60 - m + mAlarm;
    }
    if(remHours < 0){
        remHours = 24 + remHours;
    }
    let sec = new Date().getSeconds();
    const timeRemaining = ((remHours*60)+remMins)*60 -sec;
    console.log("Alarm will run after "+remHours+" hours and "+remMins+" minutes");
    let alTime = convertTo12Hours(hAlarm,mAlarm);
    setAlarmToDOM(alTime,timeRemaining);
}




function setAlarmToDOM(alTime,timeRemaining){
    let localId = globalId;
    let alarm = document.createElement('div');
    let intvId = setTimeout(function(){
        window.alert("Alarm!!!!");
        deleteMe(alarm.id);
    }, timeRemaining*1000);
    alarm.innerHTML=`
        <div class="alarm-time">
            ${alTime}
        </div>
        <div id=${localId} class="delete-button">
            Delete
        </div>
    `;
    alarm.classList.add("alarm-details");
    alarm.id = localId;
    console.log("Alarm id is "+alarm.id);
    document.getElementById('backToPopup').appendChild(alarm);
    var alarmEle = {
        "time":alTime,
        "id" : localId,
        "IntervalId": intvId
    };
    alarmList.push(alarmEle);
    
    console.log("Interval Id is = "+intvId);
    globalId++;
}



function convertTo12Hours(h,m){
    let t = "AM";
    let hs;
    let ms;
    if(h > 11){
        t = "PM";
        if(h > 12){
            h = h-12
        }
    }
    else if(h == 0){
        h = 12;
    }
    if(h < 10){
        hs = "0"+h.toString()
    }
    else{
        hs = h.toString();
    }
    
    if(m < 10){
        ms = "0"+m.toString()
    }
    else{
        ms = m.toString();
    }
    let ans = hs+":"+ms+" "+t;
    return ans;

}


function deleteMe(elementId){
    let d = document.getElementById(elementId);
    d.remove();
    let newList=[];
    for(let i=0;i<alarmList.length;i++){
        if(alarmList[i].id != elementId){
            newList.push(alarmList[i]);
        }
    }
    alarmList = newList;
}

function openPopup(){
    const back = document.getElementById("backToPopup");
    const val = document.getElementById('popupBox');
    if(val.style.display != 'flex'){
        val.style.display = 'flex';
        back.style.display='none'
    }
    else{
        val.style.display='none';
        back.style.display='block'
    }
}

function clickHandler(target){
    if(target.id == 'openPopup'){
        openPopup();
    }
    else if(target.id == 'setNow'){
        openPopup();
        const alarmTime = document.getElementById('timeInput');
        if(alarmTime.value == ''){
            window.alert("Invalid time");
            return;
        }
        setAlarm(alarmTime.value);
        alarmTime.value='';
    }

    else if(target.className == 'delete-button'){
        let myId = target.id;
        let clId;
        clickHandler;
        for(let i=0;i<alarmList.length;i++){
            if(alarmList[i].id == myId){
                clId = alarmList[i].IntervalId;
            }
        }
        console.log("clearing Alarm for Interval id "+clId);
        clearTimeout(clId);
        deleteMe(myId);

    }

    
    //deleteMe(target.id);
}



document.addEventListener('click',function(e){clickHandler(e.target)});

setInterval(displayTime,1000);
