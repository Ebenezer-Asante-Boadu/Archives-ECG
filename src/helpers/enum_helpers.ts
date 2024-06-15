
export function getEnumValue<T>(enumValue: string, enumObject: T): T[keyof T] | null {
    const enumValues = Object.values(enumObject as ArrayLike<string>) as string[];
    if (enumValues.includes(enumValue)) {
        return (enumObject as any)[enumValue];
    }
    return null;
}
