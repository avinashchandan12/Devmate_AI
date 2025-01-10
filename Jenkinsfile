pipeline {
    agent any
    stages {
        stage('Branch Cloning...') {
            steps {
                script {
                    echo 'Cloning main branch'
                    def branch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                    echo "Branch>>>>>>>>>>>.: ${branch}"

                    if (branch == 'main' || branch == 'master') {
                        def timestamp = new Date().format('yyyy-MM-dd_HH-mm-ss')
                        def backupBranch = "backup_${branch}_${timestamp}" // More concise string interpolation

                        try {
                            sh "git checkout -b ${backupBranch}"
                            sh "git push origin ${backupBranch}"
                            echo "Main branch backed up to: ${backupBranch}"
                        } catch (err) {
                            echo "Error creating backup: ${err.message}"
                            currentBuild.result = 'UNSTABLE'
                        } finally {
                            sh "git checkout ${branch}"
                            echo "Restored branch to ${branch}"
                        }
                    } else {
                        echo "Not main/master branch, Skipping backup."
                    }
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}
