import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function DropdownUnits({ units, onSelect }: { units: string[], onSelect?: any }) {

    const [selected, setSelected] = useState('Unidad');
    const contentInsets = {
        left: 12,
        right: 12,
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                    <Text className="self-start">{selected ?? 'Unidad'}</Text>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent insets={contentInsets} className='w-64'>
                {units.map((unit) => (
                    <DropdownMenuItem
                        key={unit}
                        onPress={() => { setSelected(unit); onSelect(unit); }}
                    >
                        <Text>{unit}</Text>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}