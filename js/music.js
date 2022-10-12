 window.addEventListener('load',function(){
    // 为了防止第二次创建
 let playState= true
 function testAutoPlay () {
// 返回一个promise以告诉调用者检测结果
 return new Promise(resolve => {
 if(playState){
    let audio = document.createElement('audio');
 audio.src = "../3.mp3"
 //循环播放，如果不需要可注释
 audio.loop="loop"
 document.body.appendChild(audio);
 let autoplay = true;
 // play返回的是一个promise
 audio.play().then(() => {
     // 支持自动播放
     autoplay = true;
     console.log("正常播放")
 }).catch(err => {
     // 不支持自动播放
     console.log("不支持播放")
     autoplay = false;
 }).finally((e) => {
     resolve(autoplay);
 });
 playState=false
 }else{
     resolve(false)
 }

});
}

let audioInfo = {
autoplay: false,
testAutoPlay () {
 return testAutoPlay()
},
// 监听页面的点击事件，一旦点过了就能autoplay了
setAutoPlayWhenClick () {
 function setAutoPlay () {
     // 设置自动播放为true
     audioInfo.autoplay = true;
     document.removeEventListener('click', setAutoPlay);
     document.removeEventListener('touchend', setAutoPlay);
 }
 document.addEventListener('click', setAutoPlay);
 document.addEventListener('touchend', setAutoPlay);
},
init () {
 // 检测是否能自动播放
 audioInfo.testAutoPlay().then(autoplay => {
     if (!audioInfo.autoplay) {
         audioInfo.autoplay = autoplay;
     }
 });
 // 用户点击交互之后，设置成能自动播放
 audioInfo.setAutoPlayWhenClick();
}
};
 // PC端
 document.addEventListener('click', ()=>{
 audioInfo.init();
 });
 // 移动端
  document.addEventListener('touchend', ()=>{
   audioInfo.init();
  });



 })
