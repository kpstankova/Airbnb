export interface VerificationModalProps {
    toggleVerificationModal: boolean;
    resetTogglesModalAction: () => void;
}

export interface VerificationPageProps {
    userUid?: string;
    routeParams: any;
}