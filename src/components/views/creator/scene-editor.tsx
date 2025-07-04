'use client';
import type { Scene, LoadingStates } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AiButton } from '@/components/ai-button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Film, UploadCloud, Bot, Package, Save, Plus, File as FileIcon, Type } from 'lucide-react';

interface SceneEditorProps {
  currentScene: Scene;
  setCurrentScene: (scene: Scene | ((prev: Scene) => Scene)) => void;
  loadingStates: LoadingStates;
  isApiConfigured: boolean;
  handlers: {
    analyzeScenarioImageAndFill: () => Promise<void>;
    analyzeAndDescribeProduct: () => Promise<void>;
    generateDialogueSeo: () => Promise<void>;
    generateSceneAction: () => Promise<void>;
    generateSceneTitle: () => Promise<void>;
    generateSceneDialogue: () => Promise<void>;
    handleAddUpdateScene: () => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'scenario' | 'product') => void;
    resetScene: () => void;
  };
}

export default function SceneEditor({
  currentScene, setCurrentScene, loadingStates, isApiConfigured, handlers
}: SceneEditorProps) {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setCurrentScene(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSelectChange = (name: keyof Scene, value: string | boolean) => {
    setCurrentScene(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-2xl">
          <Film className="text-primary" />
          2. Crie ou Edite uma Cena
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <Label>Título da Cena</Label>
            <Input name="title" value={currentScene.title} onChange={handleInputChange} placeholder="Ex: Unboxing do Produto X" />
            <AiButton
                onClick={handlers.generateSceneTitle}
                loading={loadingStates.generatingTitle}
                isApiConfigured={isApiConfigured}
                disabled={!currentScene.setting.trim() || !currentScene.action.trim()}
                className="mt-2"
                variant="secondary"
            >
                <Bot className="mr-2 h-4 w-4" />
                Gerar Título com IA
            </AiButton>
        </div>
        
        <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <Label className="flex items-center gap-2 font-medium"><UploadCloud />Referência de Cenário (Opcional)</Label>
            <div className="flex items-center gap-4">
                <input id="scenario-image-upload" type="file" className="hidden" onChange={(e) => handlers.handleImageUpload(e, 'scenario')} />
                <Button asChild variant="outline"><Label htmlFor="scenario-image-upload" className="cursor-pointer gap-2"><FileIcon className="h-4 w-4"/> Escolher ficheiro</Label></Button>
                {currentScene.scenarioImagePreview && <Image src={currentScene.scenarioImagePreview} alt="Prévia do cenário" width={40} height={40} className="h-10 w-10 rounded-md object-cover" />}
            </div>
            {currentScene.scenarioImagePreview && <AiButton onClick={handlers.analyzeScenarioImageAndFill} loading={loadingStates.analyzingScenario} isApiConfigured={isApiConfigured} className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"><Bot className="mr-2 h-5 w-5"/>Analisar Cenário</AiButton>}
        </div>

        <div>
            <Label>Cenário</Label>
            <Textarea name="setting" value={currentScene.setting} onChange={handleInputChange} placeholder="Descreva o ambiente em detalhes - iluminação, cores, objetos, atmosfera..." />
            <p className="mt-2 rounded-lg border bg-blue-50 p-2 text-xs text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">Dica: Seja específico sobre iluminação, cores dominantes, materiais, e atmosfera. Quanto mais detalhes, melhor o resultado.</p>
        </div>
        <div>
            <Label>Ação Principal</Label>
            <Textarea name="action" value={currentScene.action} onChange={handleInputChange} placeholder="O que o influenciador está a fazer..." />
             <AiButton
                onClick={handlers.generateSceneAction}
                loading={loadingStates.generatingAction}
                isApiConfigured={isApiConfigured}
                disabled={!currentScene.setting.trim()}
                className="mt-2"
                variant="secondary"
            >
                <Bot className="mr-2 h-4 w-4" />
                Gerar Ação com IA
            </AiButton>
        </div>
        <div>
            <Label>Diálogo</Label>
            <Textarea name="dialogue" value={currentScene.dialogue} onChange={handleInputChange} placeholder="O que o influenciador diz (em Português do Brasil)..." />
            <div className="mt-2 flex flex-wrap gap-2">
                <AiButton
                    onClick={handlers.generateSceneDialogue}
                    loading={loadingStates.generatingDialogue}
                    isApiConfigured={isApiConfigured}
                    disabled={!currentScene.setting.trim() || !currentScene.action.trim()}
                    variant="secondary"
                >
                    <Bot className="mr-2 h-4 w-4" />
                    Gerar Diálogo
                </AiButton>
                <AiButton
                    onClick={handlers.generateDialogueSeo}
                    loading={loadingStates.generatingSeo}
                    isApiConfigured={isApiConfigured}
                    disabled={!currentScene.dialogue.trim()}
                    variant="secondary"
                >
                    <Bot className="mr-2 h-4 w-4" />
                    Gerar SEO
                </AiButton>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <Label>Ângulo da Câmara</Label>
              <Select value={currentScene.cameraAngle} onValueChange={(v) => handleSelectChange('cameraAngle', v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Câmera Dinâmica (Criatividade da IA)">Câmera Dinâmica (Criatividade da IA)</SelectItem>
                    <SelectItem value="Vlog (Conversacional)">Vlog (Conversacional)</SelectItem>
                    <SelectItem value="Selfie (Plano próximo, filmado pelo próprio)">Selfie</SelectItem>
                    <SelectItem value="Ponto de Vista (Influenciador)">Ponto de Vista</SelectItem>
                    <SelectItem value="Médio (Da cintura para cima)">Médio</SelectItem>
                    <SelectItem value="Plano Geral (Corpo inteiro)">Plano Geral</SelectItem>
                  </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Duração</Label>
              <Select value={currentScene.duration} onValueChange={(v) => handleSelectChange('duration', v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5 seg">5 seg</SelectItem>
                    <SelectItem value="8 seg">8 seg</SelectItem>
                    <SelectItem value="10 seg">10 seg</SelectItem>
                    <SelectItem value="20 seg">20 seg</SelectItem>
                    <SelectItem value="30 seg">30 seg</SelectItem>
                  </SelectContent>
              </Select>
            </div>
             <div>
              <Label>Formato do Vídeo</Label>
              <Select value={currentScene.videoFormat} onValueChange={(v) => handleSelectChange('videoFormat', v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:16 (Vertical)">9:16 (Vertical)</SelectItem>
                    <SelectItem value="16:9 (Horizontal)">16:9 (Horizontal)</SelectItem>
                    <SelectItem value="1:1 (Quadrado)">1:1 (Quadrado)</SelectItem>
                  </SelectContent>
              </Select>
            </div>
        </div>
        
        <div className="space-y-4 rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-red-800 dark:text-red-300"><Type className="h-5 w-5"/>Controlo de Texto no Ecrã</h3>
            
            <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Label htmlFor="allowDigitalText-group">Permite textos digitais na tela?</Label>
                <RadioGroup
                    id="allowDigitalText-group"
                    value={currentScene.allowDigitalText ? 'yes' : 'no'}
                    onValueChange={(value) => handleSelectChange('allowDigitalText', value === 'yes')}
                    className="flex"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="digital-yes" />
                        <Label htmlFor="digital-yes">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="digital-no" />
                        <Label htmlFor="digital-no">Não</Label>
                    </div>
                </RadioGroup>
            </div>
            
            <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Label htmlFor="onlyPhysicalText-group">Apenas textos físicos como rótulos e placas reais?</Label>
                <RadioGroup
                    id="onlyPhysicalText-group"
                    value={currentScene.onlyPhysicalText ? 'yes' : 'no'}
                    onValueChange={(value) => handleSelectChange('onlyPhysicalText', value === 'yes')}
                    className="flex"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="physical-yes" />
                        <Label htmlFor="physical-yes">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="physical-no" />
                        <Label htmlFor="physical-no">Não</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>

        <div className="space-y-4 rounded-lg border border-green-200 bg-green-50/50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-green-800 dark:text-green-300"><Package className="h-5 w-5"/>Integração de Produto (Opcional)</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div><Label>Nome do Produto</Label><Input name="productName" value={currentScene.productName} onChange={handleInputChange} /></div>
                <div><Label>Marca Parceira</Label><Input name="productBrand" value={currentScene.productBrand} onChange={handleInputChange} /></div>
            </div>
            <div>
                <Label className="mb-2 block font-medium">Imagem do Produto</Label>
                 <div className="flex items-center gap-4">
                    <input id="product-image-upload" type="file" className="hidden" onChange={(e) => handlers.handleImageUpload(e, 'product')} />
                    <Button asChild variant="outline"><Label htmlFor="product-image-upload" className="cursor-pointer gap-2"><FileIcon className="h-4 w-4"/>Escolher ficheiro</Label></Button>
                    {currentScene.productImagePreview && <Image src={currentScene.productImagePreview} alt="Prévia do produto" width={40} height={40} className="h-10 w-10 rounded-md object-cover" />}
                 </div>
                {currentScene.productImagePreview && <div className="mt-4"><AiButton onClick={handlers.analyzeAndDescribeProduct} loading={loadingStates.analyzingProduct} isApiConfigured={isApiConfigured} className="bg-green-600 hover:bg-green-700 text-white"><Bot className="mr-2 h-5 w-5"/>Analisar Produto</AiButton></div>}
            </div>
            <div><Label>Descrição do Produto</Label><Textarea name="productDescription" value={currentScene.productDescription} onChange={handleInputChange} placeholder="Descrição detalhada do produto..."/></div>
            <div className="flex items-center space-x-2"><Checkbox id="isPartnership" name="isPartnership" checked={currentScene.isPartnership} onCheckedChange={(checked) => setCurrentScene(p => ({...p, isPartnership: !!checked}))} /><Label htmlFor="isPartnership">É uma parceria / conteúdo patrocinado.</Label></div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 border-t-2 pt-6">
            <Button variant="outline" onClick={handlers.resetScene}><Plus className="mr-2 h-4 w-4"/>Nova Cena</Button>
            <Button onClick={handlers.handleAddUpdateScene} disabled={loadingStates.savingScene}>
                <Save className="mr-2 h-4 w-4"/>{loadingStates.savingScene ? 'A guardar...' : (currentScene.id ? 'Atualizar Cena' : 'Guardar Cena')}
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}
