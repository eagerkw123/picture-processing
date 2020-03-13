## 图片处理插件
图片处理插件，目前包括以下功能： 图片转css背景，图片转base64，图片裁剪功能

### Import
```js
npm i picture-processing -S
```

### Example

```js
import { image2css, image2base, image2cut } from 'picture-processing';
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
      //    base64: ${base64编码},
      //    width: ${图片宽度}
      //    height: ${图片高度}
      //}
    })
    // 图片裁剪
    // 图片裁剪接受一个参数：可为图片url， 也可以是一个object对象 对象包含图片url  裁剪框width，height
    image2css('url').then(res => {
      // res为裁剪后的图片base64格式
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
| image2cut | 图片url或包含url和裁剪框宽高的ojbect | Function | string |返回值为裁剪后的图片base64编码|


