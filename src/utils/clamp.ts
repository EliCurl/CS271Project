/**
 * Clamp a number between a minimum and maximum value
 * @param value - The number to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 */
export default function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}