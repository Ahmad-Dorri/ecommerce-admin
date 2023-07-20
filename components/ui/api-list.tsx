'use client';
import React from 'react';
import { useParams } from 'next/navigation';

import UseOrigin from '@/hooks/use-origin';
import ApiAlert from '@/components/ui/api-alert';

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export default function ApiList({ entityName, entityIdName }: ApiListProps) {
  const params = useParams();
  const origin = UseOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        varient="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        varient="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        varient="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        varient="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        varient="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
}
