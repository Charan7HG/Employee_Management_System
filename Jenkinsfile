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
                    string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    withEnv(['AWS_DEFAULT_REGION=us-east-1']) {
                        bat 'aws --version'
                        bat 'aws sts get-caller-identity'
                    }
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


