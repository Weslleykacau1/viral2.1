'use client';
import { Button } from './ui/button';
import { Loader2, XCircle, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import Link from 'next/link';


interface AppHeaderProps {
  isApiConfigured: boolean;
  isCheckingApi: boolean;
}

export function AppHeader({ isApiConfigured, isCheckingApi }: AppHeaderProps) {
  
  return (
    <header className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12">
            <svg
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <rect width="52" height="52" rx="14" fill="url(#logo-gradient)" />
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0"
                  y1="0"
                  x2="52"
                  y2="52"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#A855F7" />
                  <stop offset="1" stopColor="#E934C3" />
                </linearGradient>
              </defs>
              <g fill="white">
                <path d="M26 13L29.29 22.71L39 26L29.29 29.29L26 39L22.71 29.29L13 26L22.71 22.71L26 13Z" />
                <path d="M37 15L38 17L40 18L38 19L37 21L36 19L34 18L36 17L37 15Z" />
                <path d="M15 31L16 33L18 34L16 35L15 37L14 35L12 34L14 33L15 31Z" />
              </g>
            </svg>
        </div>
        <div>
          <h1 className="font-headline text-2xl font-bold text-primary sm:text-3xl">
            Scriptify Studio 2.1
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Crie influenciadores e gere roteiros para vídeo.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isCheckingApi ? (
          <Badge variant="outline" className="text-muted-foreground py-1.5 px-3">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verificando API...
          </Badge>
        ) : isApiConfigured ? (
           <Badge variant="outline" className="border-green-600 bg-green-50 text-green-700 py-1.5 px-3">
              <CheckCircle className="mr-2 h-4 w-4" />
              API Configurada
            </Badge>
        ) : (
          <Button variant="destructive" asChild>
            <Link href="https://vercel.com/docs/projects/environment-variables" target="_blank">
              <XCircle className="mr-2 h-4 w-4" /> Configurar Chave API
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
