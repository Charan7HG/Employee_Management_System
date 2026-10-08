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

        stage('Check Docker') {
            steps {
                bat 'docker --version'
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
