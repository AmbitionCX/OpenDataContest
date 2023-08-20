<template>
  <div class="title3">
    <img src="@/assets/introduction/title2.svg" class="image" />
  </div>
  <div class="Shijing2" ><a>上古音 · 诗经</a></div>
  
  <div class="txt4-container"></div>
  <div class="txt4">
    <p>这种押韵产生的语言美感追溯到《诗经》时代。</p>
    <br>
    <p>上古幽部“洲”“逑”“流”“求”在今天汉语普通话读起来押韵，但是上古之部“采”“友”在今天汉语普通话读起来却相差甚远。《诗经》作为中国古代最早的一部诗歌总集，记录上古先民劳作时的歌咏，从而可以归纳出上古音的韵部。</p>
  </div>

  <div class="pic4">
            <img src="@/assets/introduction/pic4.png" class="image"/>
    </div>

<div class="shijing-kuang">
    <img src="@/assets/introduction/shijing-kuang.svg" class="image" />
  </div>

  <div class="txt5">
    <p>《关雎》</p> <br>
    <p>关关雎鸠，在河之洲。</p>
    <p>窈窕淑女，君子好逑。</p> <br>
    <p>参差荇菜，左右流之。</p>
    <p>窈窕淑女，寤寐求之。</p> <br>
    <p>求之不得，寤寐思服。</p>
    <p>悠哉悠哉，辗转反侧。</p> <br>
    <p>参差荇菜，左右采之。</p>
    <p>窈窕淑女，琴瑟友之。</p> <br>
    <p>参差荇菜，左右芼之。</p>
    <p>窈窕淑女，钟鼓乐之。</p>
  </div>

  <div class="title4">
    <img src="@/assets/introduction/title2.svg" class="image" />
  </div>
  <div class="shijing3" ><a>中古音 · 广韵</a></div>

  <div class="txt6-container"></div>
  <div class="txt6">
    <p>再到唐宋诗人作诗押韵，留下无数光辉灿烂的诗词瑰宝。</p>
    <br>
    <p>唐·柳宗元《江雪》中，“绝”“灭”“雪”押中古薛韵，入声字从听感上加重了清峭兀傲之感，正好与雪境的冷峻氛围相合。</p>
  </div>

  <div class="guangyun-kuang">
    <img src="@/assets/introduction/guangyun-kuang.svg" class="image" />
  </div>

  <div class="txt7">
    <p>《江雪》</p> <br>
    <p>唐·柳宗元</p>
    <p>千山鸟飞绝，万径人踪灭。</p>
    <p>孤舟蓑笠翁，独钓寒江雪。</p>
  </div>

  <div class="pic5">
            <img src="@/assets/introduction/pic5.png" class="image"/>
    </div>

    <div class="guangyun-bottom">
    <img src="@/assets/introduction/guangyun-bottom.svg" class="image" />
  </div>

  <div class="txt8">
    &nbsp; &nbsp; &nbsp; 研究中古音，主要研究《切韵》系韵书的集大成者——《广韵》。《广韵》是北宋陈彭年、丘雍为增广《切韵》而编撰的官修韵书，全书分5卷，分206韵，平声57韵（上平28韵，下平29韵），上声55韵，去声60韵，入声34韵。《广韵》是《切韵》最重要的增订本，它使已经亡佚的《切韵》音系得以完整地流传了下来，成为研究中古汉语语音的重要资料。
  </div>

  <div class="title5">
    <img src="@/assets/introduction/title2.svg" class="image" />
  </div>
  <div class="shijing4" ><a>近代音 · 中原音韵</a></div>

  <div class="zhongyuan-kuang">
    <img src="@/assets/introduction/zhongyuan-kuang.svg" class="image" />
  </div>

  <div class="txt9">
    <p>《天净沙·秋思》</p> <br>
    <p>元·马致远</p>
    <p>枯藤老树昏鸦，小桥流水人家，</p>
    <p>古道西风瘦马。</p>
    <p>夕阳西下，断肠人在天涯。</p>
  </div>

  <div class="txt10-container"></div>
  <div class="txt10">
    <p>到近代音，元曲各具声情，音乐韵律皆可从中显现。</p>
    <br>
    <p>“鸦”“家”“马”“下”“涯”都押近代家麻韵。研究近代音，主要材料是元代周德清创作的曲韵著作——《中原音韵》。它以辽、金以来北方语音变化发展为依据，废入声，又把平声分为阴、阳两类，归并旧韵为东钟、江阳、支思、齐微等19部，已接近于今北京音。</p>
  </div>

  <div class="pic6">
            <img src="@/assets/introduction/pic6.png" class="image"/>
    </div>

 </template>
        
    <script>
    export default {
    data() {
      return {
      };
    },
    components:{

    },
    methods: {},
  };
    </script>
        
    <style>
  * {
    /* 内外边距为0 */
    margin: 0;
    padding: 0;
    overflow: hidden;
    box-sizing: border-box;
    /* 各种列表样式为空 */
    text-decoration: none;
    list-style: none;
    /* background-color: #f9f5f2;
    z-index: -1; */
  }
  .title3 {
  position: absolute;
  z-index: 99;
  top: 250vh;
  left: 10vw;
  width: 15vw;
  height: 50vh;
  transform: scaleX(1) scaleY(1.2); /* 水平缩放50%，垂直缩放70% */
}
.Shijing2 {
    position: absolute;
      z-index: 999;
      top: 257.5vh;
      left: 16vw;
}
.Shijing2 a {
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.txt4-container {
position: absolute;
  z-index: 999999;
  top: 250vh;
  left: 25vw;
 width: 5vw;
  height: 20vh;
  background-image: linear-gradient(to right, rgba(198, 145, 14, 1),
      rgba(252, 237, 227, 0.1));
}
.txt4-container:hover {
    width: 60vw;
}
.txt4 {
    position: absolute;
  z-index: 999999;
  top: 252vh;
  left: 27vw;
 width: 55vw;
  height: 20vh;
  text-align: left;
}
.txt4 p {
    color: #000;
  font-size: 20px;
}
.pic4 {
    position: absolute;
    z-index: 9;
    top: 250vh;
    left: 17vw;
    transform: scaleX(0.6) scaleY(0.5); /* 水平缩放50%，垂直缩放70% */
  }
  .shijing-kuang {
    position: absolute;
  z-index: 99;
  top: 277.5vh;
  left: 57vw;
  width: 35vw;
  /* height: 50vh; */
  }
  .txt5 {
    position: absolute;
  z-index: 999999;
  top: 280vh;
  left: 51vw;
 width: 35vw;
  height: 55vh;
  text-align: center;
  font-size: 1.1rem;
}
.title4 {
  position: absolute;
  z-index: 99;
  top: 350vh;
  left: 10vw;
  width: 15vw;
  height: 50vh;
  transform: scaleX(1) scaleY(1.2); /* 水平缩放50%，垂直缩放70% */
}
.shijing3 {
    position: absolute;
      z-index: 999;
      top: 357.5vh;
      left: 16vw;
}
.shijing3 a {
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 23px;
  color: black;
}
.txt6-container {
position: absolute;
  z-index: 999999;
  top: 350vh;
  left: 75vw;
 width: 5vw;
  height: 20vh;
  background-image: linear-gradient(to left, rgba(198, 145, 14, 1),
      rgba(252, 237, 227, 0.1));
}
.txt6-container:hover {
    width: 60vw;
}
.txt6 {
    position: absolute;
  z-index: 999999;
  top: 352vh;
  left: 27vw;
 width: 50vw;
  height: 20vh;
  text-align: left;
  font-size: 1.3rem;
}
.guangyun-kuang {
    position: absolute;
  z-index: 99;
  top: 375vh;
  left: 40vw;
  width: 20vw;
  /* height: 50vh; */
}
.txt7 {
    position: absolute;
  z-index: 999999;
  top: 377vh;
  left: 25.5vw;
 width: 50vw;
  height: 20vh;
  text-align: center;
  font-size: 1.1rem;
}
.pic5 {
    position: absolute;
    z-index: 9;
    top: 365vh;
    left: 25vw;
    transform: scaleX(0.8) scaleY(0.5); /* 水平缩放50%，垂直缩放70% */
  }
  .guangyun-bottom {
    position: absolute;
  z-index: 99;
  top: 420vh;
  left: 20vw;
  width: 60vw;
  /* height: 50vh; */
}
.txt8 {
    position: absolute;
  z-index: 999999;
  top: 455vh;
  left: 26.5vw;
 width: 48vw;
  height: 20vh;
  text-align: left;
  font-size: 1.1rem;
}
.title5 {
  position: absolute;
  z-index: 99;
  top: 480vh;
  left: 10vw;
  width: 15vw;
  height: 50vh;
  transform: scaleX(1) scaleY(1.2); /* 水平缩放50%，垂直缩放70% */
}
.shijing4 {
    position: absolute;
      z-index: 999;
      top: 486vh;
      left: 16vw;
}
.shijing4 a {
  writing-mode: vertical-lr;
  letter-spacing: 0.3em;
  font-size: 19px;
  color: black;
}
.zhongyuan-kuang {
    position: absolute;
  z-index: 99;
  top: 485vh;
  left: 25vw;
  width: 20vw;
  }
  .txt9 {
    position: absolute;
  z-index: 999999;
  top: 486vh;
  left: 11vw;
 width: 48vw;
  height: 20vh;
  text-align: center;
  font-size: 1.1rem;
}
.txt10-container {
position: absolute;
  z-index: 999999;
  top: 510vh;
  left: 25vw;
 width: 5vw;
  height: 40vh;
  background-image: linear-gradient(to right, rgba(198, 145, 14, 1),
      rgba(252, 237, 227, 0.1));
}
.txt10-container:hover {
    width: 17vw;
}
.txt10 {
    position: absolute;
  z-index: 999999;
  top: 512vh;
  left: 27vw;
 width: 15vw;
  height: 40vh;
  text-align: left;
}
.pic6 {
    position: absolute;
    z-index: 9;
    top: 458vh;
    left: 40vw;
    transform: scaleX(0.6) scaleY(0.6); /* 水平缩放50%，垂直缩放70% */
  }
    </style>