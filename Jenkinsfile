// pipeline {
//     agent any
//     stages {
//         stage('Build') {
//             steps {
//                 echo 'Building...'
//             }
//         }
//         stage('Test') {
//             steps {
//                 echo 'Testing...'
//             }
//         }
//         stage('Deploy') {
//             steps {
//                 echo 'Deploying...'
//             }
//         }
//     }
// }

pipeline {
    agent any // Run on any available agent
    stages {
        stage('Checkout') {
            steps {
                // Check out the code from Git (this is usually handled automatically by Jenkins)
                // However, if you need more control, you can use the 'checkout' step explicitly
                checkout scm // Use the configured SCM in the Jenkins job
            }
        }
        stage('Build') {
            steps {
                // Use a Docker container for a consistent build environment (recommended)
                // Replace 'maven:3.8.6-jdk-11' with your desired Maven Docker image
                docker.image('maven:3.8.6-jdk-11').inside {
                    sh 'mvn clean package' // Build the project
                }
                // If you don't want to use docker:
                // sh 'mvn clean package'
            }
        }
        stage('Test') {
            steps {
                docker.image('maven:3.8.6-jdk-11').inside {
                    sh 'mvn test' // Run unit tests
                }
            }
        }
        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'target/*.jar', allowEmptyArchive: true // Archive the JAR file
            }
        }
        stage('Publish to Nexus (Optional)') {
            when {
                expression { env.BRANCH_NAME == 'main' } // Only publish from the main branch
            }
            steps {
                docker.image('maven:3.8.6-jdk-11').inside {
                    sh 'mvn deploy' // Deploy to Nexus (requires Nexus configuration in pom.xml)
                }
            }
        }
    }
    post {
        always {
            // Clean up the workspace after the build (optional but recommended)
            cleanWs()
        }
        failure {
            // Send notification on failure
            echo "Build failed!"
            // You can add more complex notifications here (e.g., email, Slack)
        }
    }
}
