'use client';
import type { Influencer, Scene, LoadingStates } from '@/types';
import InfluencerEditor from './creator/influencer-editor';
import SceneEditor from './creator/scene-editor';
import ScriptGenerator from './creator/script-generator';
import React from 'react';

interface CreatorViewProps {
  influencer: Influencer;
  setInfluencer: React.Dispatch<React.SetStateAction<Influencer>>;
  currentScene: Scene;
  setCurrentScene: (scene: Scene | ((prev: Scene) => Scene)) => void;
  pastedText: string;
  setPastedText: (text: string) => void;
  outputFormat: string;
  setOutputFormat: (format: string) => void;
  generatedContent: string;
  setGeneratedContent: (content: string) => void;
  generatedSeoContent: string;
  generatedVeoPrompt: string;
  loadingStates: LoadingStates;
  isApiConfigured: boolean;
  handlers: {
    analyzeAndFillFromText: () => Promise<void>;
    analyzeInfluencerImageAndFill: () => Promise<void>;
    analyzeScenarioImageAndFill: () => Promise<void>;
    analyzeAndDescribeProduct: () => Promise<void>;
    generateSceneContent: (scene: Scene) => Promise<void>;
    generateVeoPrompt: () => Promise<void>;
    generateDialogueSeo: () => Promise<void>;
    generateSceneAction: () => Promise<void>;
    generateSceneTitle: () => Promise<void>;
    generateSceneDialogue: () => Promise<void>;
    saveOrUpdateInfluencer: () => void;
    handleAddUpdateScene: () => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'influencer' | 'scenario' | 'product') => void;
    resetInfluencer: () => void;
    resetScene: () => void;
  };
}

export default function CreatorView({
  influencer,
  setInfluencer,
  currentScene,
  setCurrentScene,
  pastedText,
  setPastedText,
  outputFormat,
  setOutputFormat,
  generatedContent,
  setGeneratedContent,
  generatedSeoContent,
  generatedVeoPrompt,
  loadingStates,
  isApiConfigured,
  handlers,
}: CreatorViewProps) {
  return (
    <div className="space-y-8">
      <InfluencerEditor
        influencer={influencer}
        setInfluencer={setInfluencer}
        pastedText={pastedText}
        setPastedText={setPastedText}
        imagePreview={influencer.imagePreview || ''}
        loadingStates={loadingStates}
        isApiConfigured={isApiConfigured}
        handlers={{
          analyzeAndFillFromText: handlers.analyzeAndFillFromText,
          analyzeInfluencerImageAndFill: handlers.analyzeInfluencerImageAndFill,
          handleImageUpload: handlers.handleImageUpload,
          saveOrUpdateInfluencer: handlers.saveOrUpdateInfluencer,
          resetInfluencer: handlers.resetInfluencer,
        }}
      />

      <SceneEditor
        currentScene={currentScene}
        setCurrentScene={setCurrentScene}
        loadingStates={loadingStates}
        isApiConfigured={isApiConfigured}
        handlers={{
          analyzeScenarioImageAndFill: handlers.analyzeScenarioImageAndFill,
          analyzeAndDescribeProduct: handlers.analyzeAndDescribeProduct,
          generateDialogueSeo: handlers.generateDialogueSeo,
          generateSceneAction: handlers.generateSceneAction,
          generateSceneTitle: handlers.generateSceneTitle,
          generateSceneDialogue: handlers.generateSceneDialogue,
          handleAddUpdateScene: handlers.handleAddUpdateScene,
          handleImageUpload: handlers.handleImageUpload,
          resetScene: handlers.resetScene,
        }}
      />
      
      <ScriptGenerator
        outputFormat={outputFormat}
        setOutputFormat={setOutputFormat}
        generatedContent={generatedContent}
        setGeneratedContent={setGeneratedContent}
        generatedSeoContent={generatedSeoContent}
        generatedVeoPrompt={generatedVeoPrompt}
        loading={loadingStates.generatingScript}
        loadingVeo={loadingStates.generatingVeoPrompt}
        isApiConfigured={isApiConfigured}
        onGenerate={() => handlers.generateSceneContent(currentScene)}
        onGenerateVeoPrompt={handlers.generateVeoPrompt}
        isGenerationDisabled={!currentScene.setting || !influencer.id}
        influencerId={influencer.id}
        sceneSetting={currentScene.setting}
      />
    </div>
  );
}
