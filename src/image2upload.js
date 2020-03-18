const http = require('./http.js')
const loading = require('./image2loading')
let fileType = 'jpeg'
let success = () => {}
let faile = () => {}
let url = ''
let fileDir = 'common'
let fileUploadAuth = 'https://third-api.wyins.net/oss/getAuthInfo'
let aliyuncs = 'https://winbrokers.oss-cn-hangzhou.aliyuncs.com'
let uploadParams = ''
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
    init: () => {
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
                console.log(pending)
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
        if (!params || !params.url || params.url.indexOf('base64') < 0) {
            console.error('请选择您要上传的base64图片源码')
            if (params && typeof params.fail === 'function') {
                params.fail(0)
            }
            return
        }
        loading.show()
        url = params.url
        fileDir = params.dir || fileDir
        fileType = params.fileType || fileType
        success = typeof params.success === 'function' ? params.success : success
        fail = typeof params.fail === 'function' ? params.fail : fail
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