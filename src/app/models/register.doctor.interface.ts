import { AppUserModel } from "./app.user.interface";

export interface RegisterDoctorModel {
    id?: number;
    bio?: string;
    latitude?: number;
    longitude?: number;
    appUser?: AppUserModel;
    specialty?: number;
}