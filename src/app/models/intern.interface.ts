import { AppUserModel } from "./app.user.interface";
import { HospitalModel } from "./hospital.interface";

export interface InternModel {
    id?:       number;
    appUser?:  AppUserModel;
    hospital?: HospitalModel;
}