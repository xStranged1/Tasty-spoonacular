import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { auth } from "~/constants/config";
import { showErrorToast } from "~/hooks/toast";


export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("user");
                console.log(user);
                router.replace('/')
            })
            .catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorMessage");
                console.log(errorMessage);
                showErrorToast("Hubo un error en el registro", "Por favor, intentelo de nuevo mas tarde");

                // ..
            });
    }

    return (
        <View className="w-max mx-16 my-12">
            <View className="space-y-2 text-center">
                <Text className="text-3xl font-bold">Registro</Text>
                <Text className="text-gray-500 dark:text-gray-400">Registrate con correo y contraseña</Text>
            </View>
            <View className="space-y-4 mt-8">
                <View className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="m@example.com" value={email} onChangeText={(text) => setEmail(text)} />
                </View>
                <View className="space-y-2 mt-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
                </View>
                <Button className="w-full mt-4 bg-green-600" onPress={handleRegister}>
                    <Text>Crear cuenta</Text>
                </Button>
                <Link href="/register" className="inline-block w-full text-center text-sm underline" prefetch={false}>
                    <Text>No tenes una cuenta? Registrate</Text>
                </Link>
            </View>
        </View>
    );
}