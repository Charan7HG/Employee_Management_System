pipeline {
    agent any

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

        stage('Docker Build') {
    steps {
        dir('backend/backend') {
            bat 'docker build -t employeehub-backend:latest .'
        }
    }
}
       stage('AWS Authentication') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'aws-employeehub',
                usernameVariable: 'AWS_ACCESS_KEY_ID',
                passwordVariable: 'AWS_SECRET_ACCESS_KEY'
            )
        ]) {
            bat 'aws --version'
            bat 'aws sts get-caller-identity'
        }
    }
}

    }
    post {
        success {
            echo 'CI build completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the stage logs above.'
        }
    }
}


