import { UserDto } from "../DTOs/UserDto";

export class Helper {

    static AdaptTextToRowLenthLimit(text: string | null | undefined, rowLimit: number, entireTextLimit: number): string {
        if (text === undefined || text === null || text.length < rowLimit)
        {
            return text ? text : '';
        }

        for(let i = 0, lineLength = 0; i < text.length; ++i)
        {
            if (i === entireTextLimit)
            {
                return text.substring(0, i) + ' ...';
            }

            const c = text[i];
            if (c === ' ' || c === '\n')
            {
                lineLength = 0;
            }
            else
            {
                ++lineLength;
            }

            if (lineLength == rowLimit)
            {
                text = text.slice(0, i) + ' ' + text.slice(i);
                ++i;
                lineLength = 0;
            }
        }

        return text;
    }

    static GetCurrentUser(): UserDto | null {
        const stringUser = localStorage.getItem(this.UserKey);
        if (stringUser) {
            return JSON.parse(stringUser);
        }
    
        return null;
    }

    static get UserKey() : string {
        return 'user';
    }
}