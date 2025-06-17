import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function DropdownFilter({ onSelect }: { onSelect?: any }) {

    const [selected, setSelected] = useState('Buscar por');
    const contentInsets = {
        left: 12,
        right: 12,
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                    <Text className="self-start">{selected ?? 'Filtro'}</Text>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent insets={contentInsets} className='w-64'>
                <DropdownMenuItem
                    onPress={() => { setSelected('Nombre'); onSelect('name'); }}
                >
                    <Text>Nombre</Text>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onPress={() => { setSelected('Ingrediente'); onSelect('ingredient'); }}
                >
                    <Text>Ingrediente</Text>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}