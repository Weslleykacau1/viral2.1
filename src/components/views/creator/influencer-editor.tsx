'use client';
import type { Influencer, LoadingStates } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AiButton } from '@/components/ai-button';
import Image from 'next/image';
import { User, UploadCloud, ClipboardPaste, Bot, Plus, Save, File as FileIcon, RefreshCw } from 'lucide-react';
import React from 'react';

interface InfluencerEditorProps {
  influencer: Influencer;
  setInfluencer: React.Dispatch<React.SetStateAction<Influencer>>;
  pastedText: string;
  setPastedText: (text: string) => void;
  imagePreview: string;
  loadingStates: LoadingStates;
  isApiConfigured: boolean;
  handlers: {
    analyzeAndFillFromText: () => Promise<void>;
    analyzeInfluencerImageAndFill: () => Promise<void>;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'influencer') => void;
    saveOrUpdateInfluencer: () => void;
    resetInfluencer: () => void;
  };
}

export default function InfluencerEditor({
  influencer, setInfluencer, pastedText, setPastedText, imagePreview, loadingStates, isApiConfigured, handlers
}: InfluencerEditorProps) {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfluencer(prev => ({ 
      ...prev, 
      [name]: name === 'seed' ? parseInt(value, 10) || 0 : value 
    }));
  };

  const handleSelectChange = (name: keyof Influencer, value: string) => {
    setInfluencer(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-2xl">
          <User className="text-primary" />
          1. Defina o seu Influenciador
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-xl border bg-secondary/30 p-4">
            <Label className="flex items-center gap-2 font-medium"><UploadCloud /> Carregar Foto de Referência</Label>
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <div className="w-full space-y-2 sm:w-1/3">
                <input type="file" id="imageUpload" accept="image/*" onChange={(e) => handlers.handleImageUpload(e, 'influencer')} className="hidden" />
                <Button asChild variant="outline" className="w-full">
                    <Label htmlFor="imageUpload" className="cursor-pointer gap-2"><FileIcon className="h-4 w-4"/>Escolher</Label>
                </Button>
                 {imagePreview ? (
                    <Image src={imagePreview} alt="Prévia" width={100} height={100} className="h-24 w-full rounded-lg object-cover shadow-md" />
                 ) : (
                    <div className="flex h-24 w-full items-center justify-center rounded-lg bg-muted text-muted-foreground">Prévia</div>
                 )}
              </div>
              <div className="w-full space-y-2 sm:w-2/3">
                 <AiButton onClick={handlers.analyzeInfluencerImageAndFill} loading={loadingStates.analyzingInfluencer} isApiConfigured={isApiConfigured} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Bot className="mr-2 h-5 w-5" /> Analisar Imagem
                 </AiButton>
                 <p className="text-xs text-muted-foreground">Dica: A análise será detalhada, incluindo características faciais, cabelo, estilo e personalidade.</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 rounded-xl border border-dashed p-4">
             <Label htmlFor="pastedText" className="flex items-center gap-2 font-medium"><ClipboardPaste /> Cole as Características</Label>
             <Textarea id="pastedText" value={pastedText} onChange={(e) => setPastedText(e.target.value)} placeholder="Cole aqui um texto com as características do influenciador..." className="h-24" />
             <AiButton onClick={handlers.analyzeAndFillFromText} loading={loadingStates.analyzingFromText} isApiConfigured={isApiConfigured} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Analisar Texto e Preencher</AiButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            <div><Label>Nome</Label><Input name="name" value={influencer.name} onChange={handleInputChange} placeholder="Ex: Luna Silva" /></div>
            <div><Label>Nicho</Label><Input name="niche" value={influencer.niche} onChange={handleInputChange} placeholder="Ex: Moda, Jogos" /></div>
            <div className="md:col-span-2"><Label>Traços de Personalidade</Label><Textarea name="personality" value={influencer.personality} onChange={handleInputChange} /></div>
            <div className="md:col-span-2">
                <Label>Detalhes de Aparência</Label>
                <Textarea name="appearance" value={influencer.appearance} onChange={handleInputChange} placeholder="Descreva a aparência física em detalhe extremo..." />
                <p className="mt-2 rounded-lg border bg-blue-50 p-2 text-xs text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">Dica: Seja detalhado - formato do rosto, cor dos olhos, textura do cabelo, etc. para melhor geração de vídeo.</p>
            </div>
            <div className="md:col-span-2"><Label>Biografia Curta</Label><Input name="bio" value={influencer.bio} onChange={handleInputChange} /></div>
            <div className="md:col-span-2"><Label>Traço Único/Peculiar</Label><Input name="uniqueTrait" value={influencer.uniqueTrait} onChange={handleInputChange} /></div>
            <div><Label>Idade</Label><Input name="age" type="number" value={influencer.age} onChange={handleInputChange} /></div>
            <div>
              <Label>Género</Label>
              <Select value={influencer.gender} onValueChange={(v) => handleSelectChange('gender', v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                      <SelectItem value="Male">Masculino</SelectItem>
                      <SelectItem value="Female">Feminino</SelectItem>
                      <SelectItem value="Non-Binary">Não Binário</SelectItem>
                  </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Seed de Geração</Label>
              <div className="flex items-center gap-2">
                <Input name="seed" type="number" value={influencer.seed || 0} onChange={handleInputChange} />
                <Button variant="outline" size="icon" onClick={() => setInfluencer(prev => ({ ...prev, seed: Math.floor(Math.random() * 1000000) }))} aria-label="Gerar nova seed">
                  <RefreshCw className="h-4 w-4"/>
                </Button>
              </div>
            </div>
            <div>
              <Label>Sotaque (Português do Brasil)</Label>
              <Select value={influencer.accent} onValueChange={(v) => handleSelectChange('accent', v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                      <SelectItem value="Standard Brazilian Portuguese">Padrão</SelectItem>
                      <SelectItem value="Paulistano">Paulistano</SelectItem>
                      <SelectItem value="Carioca">Carioca</SelectItem>
                      <SelectItem value="Mineiro">Mineiro</SelectItem>
                      <SelectItem value="Nordestino">Nordestino</SelectItem>
                  </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2"><Label>Prompt Negativo (o que evitar)</Label><Textarea name="negativePrompt" value={influencer.negativePrompt} onChange={handleInputChange} /></div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="outline" onClick={handlers.resetInfluencer}><Plus className="mr-2 h-4 w-4"/>Novo Influenciador</Button>
            <Button onClick={handlers.saveOrUpdateInfluencer} disabled={loadingStates.savingInfluencer}>
                <Save className="mr-2 h-4 w-4"/> {loadingStates.savingInfluencer ? 'A guardar...' : (influencer.id ? 'Atualizar na Galeria' : 'Adicionar à Galeria')}
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}
