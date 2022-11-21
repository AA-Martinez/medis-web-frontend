import { AppUserModel } from "./app.user.interface";

export interface RegisterInternModel {
    id?: number;
    appUser?: AppUserModel;
    hospital_id?: number;
}