import React, {useState, useEffect} from "react"
import hexToAscii from "../helpers/hexToAscii"
const vkRegex = /[a-z0-9]{285}/i
import ZcashLight from "../helpers/light-zcash-helpers"


export default function Thread(props: Props) {
    const [viewKey, setViewKey] = useState("")
    const [success, setSuccess] = useState(0)

    useEffect(() => {
        setViewKey("")
        // add new zaddr to thread list? Set it to active?
    }, [success])


    const handleChange = e => {
        setViewKey(e.target.value)
    }

    const addViewKey = _ => {
        ZcashLight.importViewKey(viewKey)
    }

    return (
        <div className="import-vk-form">
            <form onSubmit={addViewKey}>
                <input
                    name="viewKey"
                    value={viewKey}
                    onChange={handleChange} />
                <button type="submit">Add Thread</button>
            </form>
        </div>
    )

}