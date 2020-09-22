/**
 * @description: 强制更新
 * @author: zs
 * @Date: 2020-09-19 11:34:15
 * @LastEditTime 2020-09-21 14:13:23
 * @LastEditors zs
 */
import { useState, useCallback } from 'react'
import randomString from '../utils/randomString'
function useForceUpdate() {
    const [, setValue] = useState('')
    const handleSetvalue = useCallback(() => setValue(randomString(6)), [])
    return handleSetvalue
}

export default useForceUpdate