const map = new Map();
map.set('first', 'hello');
map.set('second','world');

for (let [key, value] of map) {
	console.log(key + "is" + value);
}

//部署一个安全检查函数

 function  withinErrorMargin (left, right) {
 	return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
 }

 0.1 + 0.2 === 0.3;

 withinErrorMargin(0.1 + 0.2, 0.3)

1.1 + 1.3 === 2.4
withinErrorMargin(1.1 + 1.3, 2.4)

// 函数参数的默认值
function log(x, y = 'world'){
	console.log(x, y);
}

log('Hello')
log('Hello', 'China')
log('Hello', '')

//函数参数默认值与解构函数默认值结合使用

function foo({x, y = 5}) = {} {
	console.log(x, y);
}
foo()

// rest 参数的写法
fuction add(...values) {
	let sum = 0;
	for (var val of values){
		sum += val;
	}
	return sum;
}

add(2,5,3);

//一个rest 参数替代arguments变量的例子
function sortNumbers () {
	return Array.prototype.slice.call(arguments).sort();
}

cost sortNumbers = (...numbers) => numbers.sort();


//箭头函数

var f = v => v;

//equals
var f = function(v) {
	return v;
}

//如果箭头函数不需要参数或者多个参数 用一个圆括号代表参数
var f = () => 5;

var f  = function () {return 5};

//在箭头函数里 this 对象的指向是可变的但在箭头函数里他是固定的

function foo () {
	setTimeout(() => {
		console.log('id',this.id);
	}, 100);
}

var id = 21;

foo.call({id: 42})

//尾递归调用

function factorial(n) {
	if (n === 1) return 1;
	return n * factorial(n - 1);
}

factorial(5);

//改为尾递归 机智
function fatorial(n, total) {
	if (n === 1) return total;
	return factorial(n-1, n * total);
}

//扩展运算替代函数apply方法
function f(x, y, z){
	//..
}
let args = [0, 1, 2];
f(...args);

//call, apply 的作用 定义一个构造函数然后改变指向
function Fn() {
	Fn.prototype = {
		color: 'red',
		say:function(){
			alert(this.color);
		}
	};
	var Fn = new Fn();
	Fn.say();	
}

var Fn1 = {
	color:'yellow'
};

var fn = new Fn();
fn.say.call(Fn1);
fn.say.apply(Fn1);

// 如何克隆一个数组
const a1 = [1, 2];

const a2 = [...a1];

const [...a2] = a1;

//扩张运算符可以字符串转为真正的数组
[...'hello']

// for of 循环一个生成器
function fibonacci() {
	let [prev, curr] = [0, 1];
	while(ture){
		[prev, curr] = [curr, prev + curr];
		yield curr;
	}
}

for (let n of fibonacci()) {
	console.log(n);
	// truncate the sequence at 1000
	if(n >= 1000)
		break;
}

//作为属性名的Symbol
let sym = Symbol();
let a = {};
a[sym] = "hello";
alert(a[sym]);




