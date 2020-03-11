## 图片处理插件
图片处理插件，目前包括一下功能： 图片转css背景，图片转base64

### Import
```js
import { image2css, image2base } from 'picture-processing';
```

### Example

```js
import { image2css, image2base } from 'picture-processing';
export default {
  created() {
  	// 图片转背景 
  	// 接受参数： 图片url数组
  	// 生成对应图片名字css类，布局时直接添加图片名称css类即可
  	// eg： class='${图片名字}'
  	image2css(['url'])
  	// 图片转base64
  	image2css('url').then(res => {
  		// res返回格式
  		// {
  		//		base64: ${base64编码},
  		//		width: ${图片宽度}
  		//		height: ${图片高度}
  		//}
  	})
  }
}
```

## **API**
picture-processing 目前只支持 image2css(图片转背景) image2base(图片转base64)

| 属性 | 参数 | 类型 | 返回值 | 说明 |
| ------ | ------ | ------ | ------ | ------ |
| image2css | 图片url数组 | Function | 无 | head会插入一段对应图片名字类的css，类中设置对应图片为背景|
| image2base | 图片url | Function | Object | 返回Object，包含base64，width，height|


