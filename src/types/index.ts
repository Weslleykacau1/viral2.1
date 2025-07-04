export interface Influencer {
    id: string | null;
    name: string;
    niche: string;
    personality: string;
    appearance: string;
    bio: string;
    uniqueTrait: string;
    negativePrompt: string;
    age: string;
    gender: string;
    accent: string;
    seed: number;
    imagePreview?: string;
}

export interface Scene {
    id: string | null;
    title: string;
    setting: string;
    action: string;
    dialogue: string;
    cameraAngle: string;
    duration: string;
    videoFormat: string;
    productName: string;
    productBrand: string;
    productDescription: string;
    productImagePreview: string;
    productImageType: string;
    isPartnership: boolean;
    scenarioImagePreview: string;
    scenarioImageType: string;
    allowDigitalText: boolean;
    onlyPhysicalText: boolean;
}

export interface ThumbnailIdeas {
    title: string;
    overlayText: string;
    styleDescription: string;
    emoji: string;
    generatedImage1DataUri: string;
    generatedImage2DataUri: string;
}

export type ActiveView = 'creator' | 'influencerGallery' | 'sceneGallery' | 'viralVideo';

export type LoadingStates = {
    savingInfluencer: boolean;
    savingScene: boolean;
    analyzingInfluencer: boolean;
    analyzingScenario: boolean;
    analyzingProduct: boolean;
    generatingScript: boolean;
    analyzingFromText: boolean;
    generatingSeo: boolean;
    generatingAction: boolean;
    generatingTitle: boolean;
    generatingDialogue: boolean;
    generatingQuickScene: boolean;
    generatingVeoPrompt: boolean;
    analyzingYouTube: boolean;
    generatingThumbnail: boolean;
    generatingViralScript: boolean;
};
