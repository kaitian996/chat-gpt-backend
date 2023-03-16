import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
const app = express()
const port = 3000
app.use(bodyParser.json()) // 添加json解析
app.use(bodyParser.urlencoded({ extended: false }))

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", " 3.2.1")
    if (req.method == "OPTIONS") res.send(200) /*让options请求快速返回*/
    else next()
})

app.post("/api/chat/sendMessage", async (req, res) => {
    console.log(req.body.messages)
    const result = await useAPI(req.body.messages)
    console.log(result)
    res.send(result)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/**
 *
 * @param {{role:string;content:string}[]} messages
 */
export const useAPI = async (messages) => {
    let result
    //接口一
    // try {
    //     const data = await axios.post("http://www.aitoolgpt.com/api", {
    //         messages,
    //         key: "",
    //         temperature: 1,
    //         password: "ourongxing",
    //     })
    //     console.log(data.response.status)
    //     if (data.response.status === 200) {
    //         result = data.data
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
    //接口二
    try {
        const data = await axios.post(
            "https://cbjtestapi.binjie.site:7777/api/generateStream",
            {
                prompt: messages[messages.length - 1].content,
                userId: "#/chat/1678948683136",
                network: true,
            }
        )
        console.log("=>", data)
        if (data.response.status === 200) {
            result = data.data
        }
    } catch (error) {}
    return result !== undefined ? result : "服务器繁忙"
}
