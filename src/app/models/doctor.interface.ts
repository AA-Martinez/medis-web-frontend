import { AppUserModel } from '../models/app.user.interface'
import { SpecialtyModel } from '../models/specialty.interface'


export interface DoctorModel {
    id?: number;
    bio?: string;
    latitude?: number;
    longitude?: number;
    appUser?: AppUserModel;
    specialty?: SpecialtyModel;
}