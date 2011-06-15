var timeoutObject,
    sendPostMessage = function(msg){
      postMessage(msg);
    },
    changeTimeString = function(now, createdTimestamp){
      var second = Math.round((now-createdTimestamp)/1000);
      if(second <= 5){
        return 'now';
      }else if(second <= 60){
        return second+' seconds ago';
      }else if(second < (60*60)){
        return Math.floor(second / 60)+' minute'+((Math.floor(second / 60) !== 1)?'s':'')+' ago';
      }else if(second < (24*60*60)){
        return Math.floor(second / (60*60))+' hour'+((Math.floor(second / (60*60)) !== 1)?'s':'')+' ago';
      }else{
        var dateArrs = new Date(createdTimestamp).toGMTString().split(" ");
        return dateArrs[1]+" "+dateArrs[2];
      }
    };
    
onmessage = function (e) {
  if(timeoutObject){
    clearTimeout(timeoutObject);
  }
  
  if(e.data.length > 0){
    var timeStrings = [],
        now = (+new Date)+ 10000,
        i;
    for(i = 0; i <  e.data.length; i++){
      e.data[i] = changeTimeString(now,e.data[i]);
    }
  }
  timeoutObject = setTimeout(function(){sendPostMessage(e.data);},10000);
};