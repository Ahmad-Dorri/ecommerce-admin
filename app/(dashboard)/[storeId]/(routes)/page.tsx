import { CreditCard, DollarSign, Package } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { formatter } from '@/lib/utils';
import getTotalRevenue from '@/actions/get-total-revenue';
import getSalesCount from '@/actions/get-sales-count';
import getStockCount from '@/actions/get-stock-count';
import { Overview } from '@/components/overview';
import { getGraphRevenue } from '@/actions/get-graph-revenue';

interface DashboardProps {
  params: { storeId: string };
}

export default async function DashboardPage({ params }: DashboardProps) {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphData = await getGraphRevenue(params.storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <Heading title="داشبورد" description="خلاصه ای از فروشگاه شما" />
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 ">
              <CardTitle className="font-medium text-sm">درآمد کلی</CardTitle>
              <DollarSign className="h-4 w-4  text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(Number(totalRevenue))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 ">
              <CardTitle className="font-medium text-sm">تعداد فروش</CardTitle>
              <CreditCard className="h-4 w-4  text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 ">
              <CardTitle className="font-medium text-sm">
                تعداد محصولات در انبار
              </CardTitle>
              <Package className="h-4 w-4  text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>بازبینی</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
