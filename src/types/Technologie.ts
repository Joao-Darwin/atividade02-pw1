import { UUID } from "crypto"

export type Technologie = {
    id: UUID,
    title: String,
    studied: Boolean,
    deadline: Date
}