function dd(obj , string = "your target", type = 'p'){
    switch (type){
    case 'p':
            var out= '';
              for (var i in obj){
              out += i + ": " + obj[i] + "\n";
              }// for
            alert(string + ':'+ out);
        break;
    case 'vd':
          console.log(string);
          console.log(obj);
        break;
    }
}
//----------------------------------------------------------


/// function to handle owesomeAlert logic -------------------------------------------------
function owesomeAlert(titleToBind, textToShow ,typeToBind, confirmbtnText = null, cbtnText = null , confirmStyle = null){
    swal({
      title: titleToBind,
      text: textToShow,
      type: typeToBind,
      showCancelButton: cbtnText ? true : false,
      // showCancelButton: true, ATH [DONE flip dependency 2:40 pm 2018-01-17]
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmbtnText,
      cancelButtonText: cbtnText,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swal({
          title: 'Reloading' ,
          text:  'have fun todd.',
          type : 'success',
          timer : 2500
        })//swal
        setTimeout(function(){// submit from confirmOwesomeAlert has no time ATH
            window.location.reload();
        }, 2000);// setTimeOut
      // result.dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      } else if (result.dismiss === 'cancel') {
        swal({
          title: 'Pausing',
          text: 'Refresh the page to play again',
          type: 'info',
          animation: false,
          customClass: 'animated tada',
          timer: 1000
        })//swal
      }//fi
    })

}// function  owesomeAlert