/**
 * Generates a random GUID
 * @returns a random GUID
 */
export default function generateGUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const DEFAULT_GUID = "00000000-0000-0000-0000-000000000000";