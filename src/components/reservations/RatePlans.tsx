
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RatePlans() {
  const ratePlans = [
    {
      name: "Standard Rate",
      price: 10710,
      features: ["Free cancellation", "Breakfast not included", "Standard amenities"],
      popular: false,
    },
    {
      name: "Premium Package",
      price: 15687,
      features: ["Free cancellation", "Breakfast included", "Welcome drink", "Premium amenities"],
      popular: true,
    },
    {
      name: "Extended Stay",
      price: 9048,
      features: ["Min. 7 nights", "Weekly cleaning", "Kitchen access", "10% discount"],
      popular: false,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {ratePlans.map((plan, index) => (
            <div key={index} className="border rounded-lg p-4 relative">
              {plan.popular && (
                <Badge className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-secondary">
                  Popular
                </Badge>
              )}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{plan.name}</h4>
                  <ul className="mt-2 space-y-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">₹{plan.price.toLocaleString('en-IN')}</div>
                  <div className="text-sm text-muted-foreground">per night</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
