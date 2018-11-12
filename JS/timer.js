var sec = document.getElementById("seconds");
var min = document.getElementById("minutes");
var totalSeconds = 0;
var timerPause  = false;
//------------------------------------------------------------------
function stopTimer(timerPause){
	dd(timerPause, 'iam timerPause', 'vd');
    setTime(timerPause);
}
//---------------------------------------------------------------
function setTime(timerPause = false) {
  ++totalSeconds;
  if(!timerPause){
  	sec.innerHTML = pad(totalSeconds % 60);
  	min.innerHTML = pad(parseInt(totalSeconds / 60));
  }
}// end of setTime
//----------------------------------------------------------------
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}// end of Pad

