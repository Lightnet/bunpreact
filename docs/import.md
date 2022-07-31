

```js
fs.readdirSync(apiPathName).forEach(async function(file) {
	//console.log(file)
	//console.log(file.endsWith('.js'))
	if(file.endsWith('.js')){
		const fileName = join("/api/",file);
		//console.log("fileName", fileName);
		let urlName = fileName.replace(".js","");//remove .js to blank
		console.log(urlName);
		//console.log(join(import.meta.dir, fileName))

		const loadFun = await loadHandle(fileName);
		// set up url and handler request
		APIFiles.set(urlName,{
			handler:loadFun
		});
	}
});

await sleep(100);

console.log(APIFiles.get("/api/test"))
console.log(await APIFiles.get("/api/test").handler());

const typefun = await APIFiles.get("/api/test").handler;
console.log(typefun.constructor.name)
console.log(typefun)
//console.log(await typefun())
//console.log("AWAIT S")
//const typefun1 = APIFiles.get("/api/stest").handler;
//console.log(typefun1.constructor.name)
//console.log(typefun1)
//console.log(await typefun1())

//let testURL = "/sdf/api/test"
//testURL = "/as/api/test"
//testURL = "/test"
//console.log("MATCH > /api/")
//console.log(testURL.search("/api/")) // 0 == match pass
```