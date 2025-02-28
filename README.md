Alterar o arquivo 

platforms/android/phonegap-plugin-barcodescanner/cordovareactapp-barcodescanner.gradle

de:
compile(name: 'barcodescanner-release-2.1.5', ext:'aar')

para:
implementation(name: 'barcodescanner-release-2.1.5', ext:'aar')

## NÃO MODIFIQUEI ESSE
platforms/android/app/build.gradle

android {
    compileSdkVersion 33
    buildToolsVersion "33.0.0"

    defaultConfig {
        applicationId "io.cordova.hellocordova"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
    }
    ...
}

# cordova clean android

repositories{
    jcenter()
    flatDir{
        dirs 'libs'
    }
}

dependencies {
    implementation(name: 'barcodescanner-release-2.1.5', ext:'aar')
}

android {
    packagingOptions {
        exclude 'META-INF/NOTICE'
        exclude 'META-INF/LICENSE'
    }
}


# cordova build android


/etc/apache2/sites-available/003-cibus-cordova.conf
<VirtualHost *:88>
    # ServerName seu-dominio.local
    DocumentRoot /var/www/cibus-cordova 

    <Directory /var/www/cibus-cordova>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
