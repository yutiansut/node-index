1,border-radius:(一个值表示左上、右上、右下、左下值一样，支持px rem %。二个值表示左上右下、右上左下。三个值表示左上，右上左下、右下。四个值表示左上、右上、右下、左下。 )

2,text-shadow:2px 3px 2px #000;
文字阴影的结构是按照以下顺序：X--偏移，Y--偏移，模糊，和颜色;

text-shadow:-2px -3px 2px rgba(0, 118, 160, .25);
设置为负值，X -偏移阴影转移到左侧。设置为负值偏移Y -转移阴影顶端。颜色可以用RGBA值。

text-shadow:0px 1px 0px #fff,0px -1px 0px #000；
文字阴影的列表（以逗号分隔）,1px的顶部和底部1px的阴影。

3,background:transparent; 等价 background:rgba(0,0,0,0);
color: transparent; 等价 color:rgba(0,0,0,0);

4,box-shadow:盒阴影的使用语法结构与文本阴影类似，如box-shadow: 5px 5px 5px rgba(255,15,255,0.5);
  但是，盒阴影多了个属性：外延值，inset(向盒子里面阴影，切记正负值判断的是影音的位置)，如box-shadow: 5px 5px 25px rgba(0,0,255,0.5) inset;

5,蒙版
@keyframes mask {//利用css高级运动做了一个蒙版效果  也可以用js 拖拽一个盒子 来出现相应的蒙版效果。
	0%{-webkit-mask-position:0px 0px;}
	25%{-webkit-mask-position:619px 0px;}
	50%{-webkit-mask-position:0px 0px;}
	75%{-webkit-mask-position:308px 0px;-webkit-mask-size:100%;}
	100%{-webkit-mask-size:1000%;}
}
.mask{//主要是mask蒙版知识 要是用图片的话蒙版图片一定要是透明的，不然没有效果。
	width: 720px;
	height: 715px;
	margin: 17px auto;
	background: black url(girl.png);
	-webkit-mask-image:url(mask.png);
	animation: mask 5s linear infinite forwards;
}

6,渐变
background: linear-gradient(to bottom, blue, white);//线性渐变 从一端开始 可多颜色用逗号隔开，颜色占据的范围用百分比表示
background: linear-gradient(to left, blue, white);
background: linear-gradient(to top right, blue, white);
background: linear-gradient(0deg, #f00, white);//可以用角度开始渐变 记住下面一句话 /*270deg = -90deg 记住这一个就不会搞错所有
background: linear-gradient(-90deg, #f00, white);
background: linear-gradient(180deg, #f00 30%, white 50%, blue);
background: linear-gradient(to right, rgba(255,255,255,0),rgba(255,255,255,1)),url(girl.png) center  30%;//可以利用渐变给图片加蒙版
background: radial-gradient(red,yellow,rgb(30, 144, 255));//径向渐变 默认为圆且从圆心开始 可多颜色用逗号隔开，颜色占据的范围用百分比表示
background: radial-gradient(red 5%, yellow 25%,#1e90ff 50%);
background: radial-gradient(ellipse closest-side,red,yellow 20%, #1e90ff 50%, white);//指定形状是椭圆 圆心开始的位置
background: radial-gradient(ellipse farthest-corner, red, yellow 20%,#1e90ff 50%, white);
background: repeating-radial-gradient(black, black 5px, white 5px, white 10px);//重复渐变
