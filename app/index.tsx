import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { auth } from "~/constants/config";
import { AuthContext } from "~/context/AuthContext";
import { showErrorToast } from "~/hooks/toast";

export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  const { signIn, token } = useContext(AuthContext)

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken()
      signIn(token)
      router.push('/home');
    } catch (error: any) {
      const errorMessage = error.message;
      if (errorMessage.includes("auth/invalid-credential")) {
        showErrorToast("Email o contraseña incorrecta", "Por favor, ingresa credenciales correctas");
        return
      }
      console.log(error);
      showErrorToast("Error desconocido", "Hubo un error, intente de nuevo mas tarde");
      return
    }
  }

  useEffect(() => {
    console.log("token");
    console.log(token);

    if (token) {
      router.replace('/home');
    }
  }, [])

  return (
    <View className="w-max mx-16 my-12">
      <View className="space-y-2 text-center">
        <Text className="text-3xl font-bold">Iniciar sesión</Text>
        <Text className="text-gray-500 dark:text-gray-400">Iniciar sesión con tu correo y contraseña</Text>
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
        <Button className="w-full mt-4" onPress={handleLogin}>
          <Text>Login</Text>
        </Button>
        <Link href="/register" className="inline-block w-full text-center text-sm underline" prefetch={false}>
          <Text>No tenes una cuenta? Registrate</Text>
        </Link>
      </View>
    </View>
  );
}