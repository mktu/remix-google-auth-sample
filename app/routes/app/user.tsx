import { useContext } from "react"
import UserContext from "~/UserContext"

const User: React.FC = () => {
    const { name } = useContext(UserContext)
    return (
        <div>Hi, I am {name}</div>
    )
}

export default User