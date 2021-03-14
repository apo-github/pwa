// 変数定義
let isPlaying = false
let tapCount, time = 0
const tapBtn    = document.getElementById('js-tapBtn')
const startBtn  = document.getElementById('js-startBtn')
const countText = document.getElementById('js-count')
const timeText  = document.getElementById('js-time')

// ゲームの初期値設定
const setGame = () => {
  tapCount = 0
  time = 10000
  countText.innerText = tapCount
  timeText.innerHTML = time / 1000
}
setGame()

// タップした時にカウントを増やす
tapBtn.addEventListener('click', () => {
  if (!isPlaying) return false
  tapCount++
  countText.innerText = tapCount
})

// STARTボタンを押してゲームをスタートさせる
let btn = document.getElementById("startBtn");
btn.addEventListener('click', () => 
{
  if(navigator.geolocation){
    
    navigator.geolocation.getCurrentPosition(

      //現在位置取得に成功した
      function(position){
        //データ整理
        let data = position.coords; 

        //データの整理
        let lat = data.latitude; //現在位置の緯度。-180〜180で表す。
        let lng = data.longitude; //現在位置の経度。-90〜90で表す。
        let alt = data.altitude; //現在位置の高度。メートル単位で表す。
        let accLatlng = data.accuracy; //取得した緯度、経度の精度。メートル単位で表す。
        let accAlt = data.altitudeAccuracy; //取得した高度の精度。メートル単位で表す。
        let heading = data.heading; //0=北 90=東 180=南 270=西
        let speed = data.spped;

        //書き出し
        
        let resultMessage = '<dl>'
        +'<dt>緯度</dt><dd>' + lat + '</dd>'
        +'<dt>経度</dt><dd>' + lng + '</dd>'
        +'<dt>高度</dt><dd>' + alt + '</dd>'
        +'<dt>緯度、経度の精度</dt><dd>' + accLatlng + '</dd>'
        +'<dt>高度の精度</dt><dd>' + accAlt + '</dd>'
        +'<dt>方角</dt><dd>' + heading + '</dd>'
        +'<dt>速度</dt><dd>' + speed + '</dd>'
        +'</dl>' ;

        alert(resultMessage);
        document.getElementById('result').innerHTML = resultMessage;

      },

      function(error){
        //エラーコード定義
        let errorInfo = {
          0: "原因不明のエラーが発生しました…。" ,
		      1: "位置情報の取得が許可されませんでした…。" ,
		      2: "電波状況などで位置情報が取得できませんでした…。" ,
		      3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
        };

        //成形
        let errorMessage = "[エラー番号: " + error.code + "]\n" + errorInfo[error.code];
        // エラー表示
	      alert( errorMessage );
        //書き出し
        document.getElementById("result").innerHTML = errorMessage;
      }
    )
  }else{
    alert("お使いの端末は、GeoLacation APIに対応していません。" );
  }
})