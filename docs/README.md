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
    // 图片url支持url路径 url地址 file类型图片
    // 如果参数为object  支持 url（链接） type（转换的类型） upload（boolean是否上传）
    // 如果选择upload  则可根据uploadType选择上传微易经纪或者微易科技 1为经纪 2为科技 默认为1（经纪）
    image2base({
      url: '',
      type: 'webp',
      upload: true,
      uploadType: 2
    }).then(res => {
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
    // 图片url支持url路径 url地址 file类型图片
    image2cut({
      url: '',
      width: 100,
      height: 100,
      limit: 100
    }).then(res => {
      // res为裁剪后的图片base64格式
      //}
    })


    // 图片上传，先初始化init，通过send方法上传
    // 需要先进行初始化 初始化接受一个boolean参数 默认为false 代表微易经纪上传  如果传true则代表微易科技上传
    // 参数必须是object 图片url支持url路径 url地址 file类型图片
    // object必须包含 url，可支持dir（文件位置, 默认common）、fileType（上传后生成的类型， 默认jpeg）、success（function）、fail（function）
    image2upload.init(true || false) // 
    image2upload({
      url: 'url', // 支持base64和file类型
      dir: 'common',
      fileType: 'webp', // 默认jpeg
      success: () => {},
      fail: () => {}
    })


    // loading小动画
    // show方法接受boolean参数 表示是否创建loading遮罩层  true为创建 默认为false 为不创建
    image2loading.show() // 显示动画
    image2loading.hide() // 隐藏动画
  }
}
```

## *API*
picture-processing 目前只支持 image2css(图片转背景) image2base(图片转base64) image2cut(图片裁剪功能) image2loading(loading动画) image2uplaod(图片上传)


---


### *image2css*

#### 示例
```js
  image2css(['url'])
```

#### 参数
  图片url数组： [url, url]

#### 返回值
  无返回值，会在head里添加一段css


---


### *image2base*

#### 示例
```js
  image2base({
    url: '', // 图片url支持url路径 url地址 file类型图片
    type: '', // 转换的类型 如果图片源是file类型 则type默认base64/png 如股票选择upload 则type有效 否则type无效
    upload: true // 是否需要上传 如果选择上传，则返回的res里包含src
    uploadType: 2 // 选择upload之后附加的uploadtype  默认为1  经纪上传  2为科技上传
  })
```

#### 参数
  图片url或者ojbect（参考示例）

#### 返回值
  返回Object 包含base64编码，图片weight,height ,如果选择上传，会增加图片src


---


### *image2cut*

#### 示例
```js
  image2cut({
    url: '', // 图片url支持url路径 url地址 file类型图片
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


---


### *image2upload*

#### 示例
```js
  image2upload.init() // 初始化 参数为boolean值 true为科技上传 默认为false 经纪上传
  image2upload({
    url: 'url', // 图片url支持base64格式 file类型图片
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


---


### *image2loading*

#### 示例
```js
  image2loading.show() // 显示loading 默认为boolean true为显示遮罩 默认为false不显示
  image2loading.hide()
```

#### 参数
  无

#### 返回值
  无

