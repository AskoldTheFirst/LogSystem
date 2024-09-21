import { UserDto } from "../../DTOs/UserDto";

export interface AppState {
    user: UserDto | null;
    setUser: ((user: UserDto | null) => void) | null;
}