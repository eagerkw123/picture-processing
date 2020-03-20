const http = require('./http.js')
const loading = require('./image2loading')
let fileType = 'jpeg'
let success = () => {}
let fail = () => {}
let url = ''
let fileDir = 'common'
let fileUploadAuth = 'https://third-api.wyins.net/oss/getAuthInfo'
let aliyuncs = 'https://winbrokers.oss-cn-hangzhou.aliyuncs.com'
let uploadParams
let parmas = {}
let pending = false

// base64转blob
const base64ToBlob = (str) => {
    const arr = str.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1]); let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

const chunk = () => {
    return 'abcdefghjiklmnopqrstuvwxyz'.charAt(parseInt((Math.random() * 26))) + Date.now().toString() + 'abcdefghjiklmnopqrstuvwxyz'.charAt(parseInt((Math.random() * 26)))
}

const loadImage = (src) => {
    const image = new Image()
    image.src = src + '?x-oss-process=image/crop,x_0,y_0,w_1,h_1,g_se'
    image.onload = function() {
        success(src)
        loading.hide()
    }
    image.error = function() {
        fail(2)
        loading.hide()
    }
}

const upload = () => {
    const blob = base64ToBlob(url)
    const fileName = uploadParams.expire + '_' + chunk()
    const _formData = new FormData()
    _formData.append('success_action_status', 200)
    _formData.append('signature', uploadParams.signature)
    _formData.append('policy', uploadParams.policy)
    _formData.append('OSSAccessKeyId', uploadParams.accessid)
    _formData.append('key', uploadParams.dir + fileName + '.' + fileType)
    _formData.append('file', blob)
    const result = 'https:' + uploadParams.cdnMediaHost + uploadParams.dir + fileName + '.' + fileType
    http.ajax({
        url: aliyuncs,
        type: 'POST',
        data: _formData,
        success: () => {
           loadImage(result)
        },
        error: () => {
           loadImage(result)
        }
    })
}

module.exports = {
    init: (b) => {
        uploadParams = ''
        fileUploadAuth = b ? 'https://management.winbaoxian.com/oss/getAuthInfo' : fileUploadAuth
        aliyuncs = b ? 'https://wyjhs.oss-cn-hangzhou.aliyuncs.com' : aliyuncs
        http.ajax({
            url: fileUploadAuth,
            data: {
                fileDir
            },
            success: (res) => {
                uploadParams = null
                if (res && res.data) {
                    uploadParams = res.data
                }
                if (pending) {
                    upload()
                    pending = false
                }
            },
            error: () => {
                uploadParams = null
                fail(1)
            }
        })
    },
    send: (params) => {
        if (!params || typeof params !== 'object' || !params.url) {
            console.error('参数错误，请选择您要上传的图片')
            if (params && typeof params.fail === 'function') {
                params.fail(0)
            }
            return
        }
        loading.show()
        url = params.url
        console.log(params.url)
        fileDir = params.dir || fileDir
        fileType = params.fileType || fileType
        success = typeof params.success === 'function' ? params.success : success
        fail = typeof params.fail === 'function' ? params.fail : fail
        // 如果是file类型
        if (typeof url === 'object' && url.name && url.type && url.type.indexOf('image') > -1) {
            var reader = new FileReader()
            reader.onload = function(e) {
                url = e.target.result
                if (typeof uploadParams !== 'object') {
                    pending = true
                    return
                } else if (!uploadParams) {
                    fail(1)
                    return
                }
                upload()
            }
            reader.readAsDataURL(url)
            return
        }
        if (typeof uploadParams !== 'object') {
            pending = true
            return
        } else if (!uploadParams) {
            fail(1)
            return
        }
        upload()
    }
}