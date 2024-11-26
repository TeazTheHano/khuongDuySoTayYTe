export interface StorageItem {
    user: UserFormat,
    profile: UserFormat[],
}

export interface UserFormat {
    synced?: boolean;
    name: string;
    age?: number;
    email?: string;
    address?: string;
    vaccineShots: VaccineShot[];
}

export interface VaccineShot {
    name: string;
    detail: { time: Date, place: string }[];
    nextShot?: Date;
}