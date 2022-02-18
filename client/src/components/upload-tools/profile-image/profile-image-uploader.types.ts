import { DroppedFile } from "../../../redux/onboarding/onboarding.types";

export interface ProfileImageUploaderProps {
    profileImage: DroppedFile | null;
    addProfileImageAction: (data: DroppedFile) => void;
}