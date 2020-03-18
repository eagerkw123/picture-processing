## 图片处理插件
图片处理插件，目前包括以下功能： 图片转css背景，图片转base（包括webp），图片裁剪功能, 图片上传，loading小动画

### Import
```js
npm i picture-processing -S
```

### Example

```js
import { image2css, image2base, image2cut, image2upload, image2loading } from 'picture-processing';
export default {
  created() {
    // 图片转背景 
    // 接受参数： 图片url数组
    // 生成对应图片名字css类，布局时直接添加图片名称css类即可
    // eg： class='${图片名字}'
    image2css(['url'])


    // 图片转base64, 支持转webp图片格式
    // 如果参数只传url 则默认为转换base64
    // 如果参数为object  支持 url（链接） type（转换的类型） upload（boolean是否上传）
    image2base('url').then(res => {
      // res返回格式
      // {
      //  src: ${图片src}， 需要选择upload
      //  base64: ${base64编码},
      //  width: ${图片宽度}
      //  height: ${图片高度}
      //}
    })


    // 图片裁剪
    // 图片裁剪接受一个参数：可为图片url， 也可以是一个object对象 对象包含图片url  裁剪框width，height，裁剪大小限制limit
    image2cut('url').then(res => {
      // res为裁剪后的图片base64格式
      //}
    })


    // 图片上传（目前支持base64格式上传）
    // 参数可以是直接的base64 也可以是object
    // object必须包含 url（base64），  可支持dir（文件位置, 默认common）、fileType（上传后生成的类型， 默认jpeg）、success（function）、fail（function）
    image2upload({
      url: 'url',
      dir: 'common',
      fileType: 'webp',
      success: () => {},
      fail: () => {}
    })


    // loading小动画
    image2loading.show() // 显示动画
    image2loading.hide() // 隐藏动画
  }
}
```

## **API**
picture-processing 目前只支持 image2css(图片转背景) image2base(图片转base64) image2cut(图片裁剪功能) image2loading(loading动画) image2uplaod(图片上传)

### **image2css**

#### 示例
```js
  image2css(['url'])
```

#### 参数
  图片url数组： [url, url]

#### 返回值
  无返回值，会在head里添加一段css



### **image2base**

#### 示例
```js
  image2base({
    url: '', // 图片url
    type: '', // 转换的类型
    upload: true // 是否需要上传 如果选择上传，则返回的res里包含src
  })
```

#### 参数
  图片url或者ojbect（参考示例）

#### 返回值
  返回Object 包含base64编码，图片weight,height ,如果选择上传，会增加图片src


### **image2cut**

#### 示例
```js
  image2cut({
    url: '', // 裁剪图片url
    width: 100, // 裁剪框宽度
    height: 100, // 裁剪框高度
    limit: 100 // 裁剪图片大小限制
  }).then(res => {
    // res为裁剪后的图片base64格式
    //}
  })
```

#### 参数
  图片url或者ojbect（参考示例）

#### 返回值
  返回值为裁剪后的图片base64编码


### **image2loading**

#### 示例
```js
  image2loading.show()
  image2loading.hide()
```

#### 参数
  无

#### 返回值
  无

### **image2upload**

#### 示例
```js
  image2upload({
    url: 'url', // 上传图片的url，只支持base64
    dir: 'common', // 上传后存放的目录 默认common
    fileType: 'webp', // 上传的图片类型 默认jpeg
    success: (src) => {}, // 成功回调 返回图片上传后的url
    fail: (code) => {} // 失败回调 返回0，1，2  0代表url格式错误 1代表获取阿里云签名失败 2代表上传失败
  })
```

#### 参数
  图片url或者ojbect（参考示例）

#### 返回值
  无