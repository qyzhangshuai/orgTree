/**
 * @description: 强制更新
 * @author: zs
 * @Date: 2020-09-19 11:34:15
 * @LastEditTime: 2020-09-19 11:36:54
 * @LastEditors: zs
 */
import { useState } from 'react'
import randomString from '../utils/randomString'
function useForceUpdate() {
    const [, setValue] = useState('')
    setValue(randomString(6))
}

export default useForceUpdate