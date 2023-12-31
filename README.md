# Gerando um APK no React Native com Expo

Após executar `npx expo prebuild`, siga estes passos para gerar um APK:

## Atualize o Expo CLI

```bash
npm install -g expo-cli
```

# Execute o Prebuild

```bash
npx expo prebuild
```

# Navegue até a Pasta Android

```bash
cd android
```

## Gerar o APK

# APK de Desenvolvimento (Debug)

```bash
./gradlew assembleDebug
```

# Isso gerará um APK de debug em android/app/build/outputs/apk/debug/.

# APK de Lançamento (Release)

# Primeiro, configure suas chaves de assinatura. Depois, execute:

```bash
./gradlew assembleRelease
```

#### Atualize o Gradle para Gerar .aab

```bash
android {
    bundle {
        enable true
    }
}
```

# O .aab será gerado em android/app/build/outputs/bundle/release/app-release.aab.

# isso gerará um APK de release em android/app/build/outputs/apk/release/.

# Build com o EAS

# Volte ao diretório raiz e execute:

```bash
eas build --platform android
```

## Criar uma Chave de Assinatura para APK de Lançamento

# Criar a Keystore

```bash
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

# Colocar a Keystore no Projeto

# Mova my-release-key.keystore para android/app.

# Configurar as Chaves no gradle.properties

```bash
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

# Editar o arquivo build.gradle

```bash
signingConfigs {
    release {
        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
}

```

# Dentro de android, configure buildTypes para usar signingConfig:

```bash
buildTypes {
    release {
        ...
        signingConfig signingConfigs.release
    }
}
```

# Gerar o APK de Lançamento

```bash
./gradlew assembleRelease
```

# O APK estará em android/app/build/outputs/apk/release/app-release.apk.

### COMO INSTALAR A VERSÂO NO EMULADOR

```bash
adb devices
adb install C:\Users\jojoj\Documents\projeto\ponto-eletronico\ponto-eletronico\android\app\build\outputs\apk\debug\app-debug.apk
```

```bash
adb install C:\Users\jojoj\Documents\projeto\ponto-eletronico\ponto-eletronico\android\app\build\outputs\apk\release\app-release.apk
```

# Gerar um arquivo IPA para Apple Store

## Preparação para iOS (Requer macOS)

- Instale o Xcode e as ferramentas de linha de comando do Xcode.
- Execute `npx expo prebuild` para iOS.

## Arquivo de Assinatura para iOS

- Crie um perfil de provisionamento e um certificado de assinatura na Apple Developer Console.
- Configure-os no Xcode.

## Gerar o IPA

- No Xcode, selecione "Any iOS Device" e vá em "Product" > "Archive".
- Use o Organizer do Xcode para exportar o .ipa.

# set latitude emulador android studio

```bash
 adb emu geo fix -43.14544686908492 -22.452144288418214
```
