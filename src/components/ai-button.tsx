'use client';
import { Button, type ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AiButtonProps extends ButtonProps {
  isApiConfigured: boolean;
  loading?: boolean;
}

export function AiButton({ isApiConfigured, loading, children, className, disabled, ...props }: AiButtonProps) {
  const isEffectivelyDisabled = disabled || loading || !isApiConfigured;

  const buttonContent = (
    <>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </>
  );

  const button = (
    <Button disabled={isEffectivelyDisabled} className={cn("w-full justify-center", loading && "animate-pulse", className)} {...props}>
      {buttonContent}
    </Button>
  );

  if (isApiConfigured) {
    return button;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full">{button}</div> 
        </TooltipTrigger>
        <TooltipContent>
          <p>Configure sua chave de API nas variáveis de ambiente do seu projeto.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
