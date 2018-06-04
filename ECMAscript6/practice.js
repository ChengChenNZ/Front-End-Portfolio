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


