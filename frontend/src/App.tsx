import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

export const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Minimal React App</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Count: {count}</p>
                    <Button onClick={() => setCount(count + 1)} className="w-full">
                        Click me!
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};
