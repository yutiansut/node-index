// const buf = Buffer.from("hello world","ascii");
// console.log(buf.toString("hex"));//十六进制
// console.log(buf.toString("base64"));


// const arr = new Uint16Array(2);
// arr[0] = 5000;
// arr[1] = 4000;

// const buf1 = Buffer.from(arr);
// const buf2 = Buffer.from(arr.buffer);
// console.log(buf1);
// console.log(buf2);

// arr[1] = 6000;
// console.log(buf1);
// console.log(buf2);

// const  buf = Buffer.from([1,2,3]);
// for (const  b of buf) {//用 for  .. of 遍历buf 
// 	console.log(b);
// }

// const buf3 = Buffer.from([0x62,0x75,0x66,0x65,0x72]);

// const ab = new ArrayBuffer(10);
// const buf4 = Buffer.from(ab,0,2);//第一个参数为buffer数组 或者数组的属性 第二参数为开始拷贝的索引值 第三个为 数组的length- 索引
// console.log(buf4.length);

/*拷贝一个已经存在的buffer*/

// const buf1 = Buffer.from("buffer");
// const buf2= Buffer.from(buf1);
// buf1[0] = 0x61;
// console.log(buf1.toString());
// console.log(buf2.toString());

/*buffer string*/

// const buf1 = Buffer.from("this is  a těst");
// console.log(buf1.toString());

// console.log(buf1.toString("ascii"));

// const buf2 = Buffer.from("7468697320697320612074c3a97374","hex");

// console.log(buf2.toString());
// 
/*对象 buffer*/

// const  buf1 = Buffer.from(new String("this is a test"));

// console.log(buf1);

// class Foo {
// 	[Symbol.toPrimitive]() {
// 		return "this is a test";
// 	}
// }
// const buf = Buffer.from(new Foo(),"utf8");
// console.log(buf);
/*判断是不是buffer*/ 
var buf =  Buffer.from("new Date()");
console.log(Buffer.isBuffer(buf));