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

