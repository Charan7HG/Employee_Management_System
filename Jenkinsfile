pipeline {
agent any

```
stages {

    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Backend Build') {
        steps {
            dir('backend/backend') {
                bat 'mvnw.cmd clean package -DskipTests'
            }
        }
    }

    stage('Frontend Build') {
        steps {
            dir('frontend') {
                bat 'npm install'
                bat 'npm run build'
            }
        }
    }
}

post {
    success {
        echo 'Backend and Frontend build completed successfully!'
    }

    failure {
        echo 'Pipeline failed. Check the stage logs above.'
    }
}
```

}
