const fs = require("fs");

const N = 10;

const sumModuleBuf = fs.readFileSync(__dirname + "/sum.wasm");
const memory = new WebAssembly.Memory({ initial: N, maximum: 100 });
// instantiateStreaming doesn't seem to work on node v13.2.0
WebAssembly.instantiate(sumModuleBuf, {
  env: { memory }
}).then(obj => {
  // filling the array with some random stuff in js code
  const myArr = [...Array(N).keys()];
  const i32Buff = new Uint32Array(memory.buffer);
  // creating a [1, 2, ..., N] array and moving it to memory buffer
  myArr.forEach((v, i) => (i32Buff[i] = v));
  const { sum } = obj.instance.exports;
  // where 0 pointer to the memory start
  console.log(`Sum result of ${myArr}:`, sum(0, N));
});
