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


        stage('Push Docker Image to ECR') {
    steps {
        withCredentials([
            string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
            string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
        ]) {
            withEnv(['AWS_DEFAULT_REGION=ap-south-1']) {
                bat '''
                    aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 088891618710.dkr.ecr.ap-south-1.amazonaws.com

                    docker tag employeehub-backend:latest 088891618710.dkr.ecr.ap-south-1.amazonaws.com/employeehub-backend:latest

                    docker tag employeehub-backend:latest 088891618710.dkr.ecr.ap-south-1.amazonaws.com/employeehub-backend:%BUILD_NUMBER%

                    docker push 088891618710.dkr.ecr.ap-south-1.amazonaws.com/employeehub-backend:latest

                    docker push 088891618710.dkr.ecr.ap-south-1.amazonaws.com/employeehub-backend:%BUILD_NUMBER%
                '''
            }
        }
    }
}



stage('Deploy Backend to ECS') {
    steps {
        withCredentials([
            string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
            string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
        ]) {
            withEnv(['AWS_DEFAULT_REGION=ap-south-1']) {
                bat '''
                    aws ecs update-service ^
                        --cluster employeehub-cluster ^
                        --service employeehub-backend-service-npgbcuc1 ^
                        --force-new-deployment
                '''
            }
        }
    }
}



        stage('Wait for ECS Deployment') {
    steps {
        withCredentials([
            string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
            string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
        ]) {
            withEnv(['AWS_DEFAULT_REGION=ap-south-1']) {
                bat '''
                    aws ecs wait services-stable ^
                        --cluster employeehub-cluster ^
                        --services employeehub-backend-service-npgbcuc1
                '''
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


