import type { Metadata } from 'next';
import { LabPage } from '@/components/lab/LabPage';

export const metadata: Metadata = {
  title: 'Backend Lab — João Paulo Oliveira',
  description:
    'Explore um backend real em funcionamento: métricas ao vivo, simulador de incidente P1 e desafios de arquitetura.',
};

export default function Lab() {
  return <LabPage />;
}
