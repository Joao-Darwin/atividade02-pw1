import { UUID } from "crypto"
import { Technologie } from "./Technologie"

export type User = {
    id: UUID,
    name: String,
    username: String
    technologies: Technologie[]
}