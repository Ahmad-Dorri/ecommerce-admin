'use client';
import { Copy, ServerIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ApiAlertProps {
  title: string;
  description: string;
  varient: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['varient'], string> = {
  public: 'عمومی',
  admin: 'ادمین',
};

const varientMap: Record<ApiAlertProps['varient'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  varient = 'public',
}) => {
  const onCpoy = () => {
    navigator.clipboard.writeText(description);
    toast.success('متن با موفقیت کپی شد.');
  };

  return (
    <Alert>
      <AlertTitle className="flex gap-2 items-center justify-start">
        <ServerIcon className="h-4 w-4" />
        {title}
        <Badge variant={varientMap[varient]}>{textMap[varient]}</Badge>
      </AlertTitle>
      <AlertDescription className="mr-4 mt-4 flex flex-row-reverse items-center justify-between ">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm ">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCpoy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
export default ApiAlert;
