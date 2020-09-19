/**
 * @description: 随机生成任意字符串
 * @author: zs
 * @Date: 2020-09-19 11:17:22
 * @LastEditTime: 2020-09-19 11:33:37
 * @LastEditors: zs
 */
function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default randomString