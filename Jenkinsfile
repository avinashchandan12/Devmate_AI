pipeline {
    agent any
    stages {
        stage('Branch Cloning...') {
            steps {
                script {
                    echo 'Cloning main branch'
                    def branch = 'main'
                    echo "Branch>>>>>>>>>>>.: ${branch}"

                    if (branch == 'main' || branch == 'master') {
                        input message: "Do you want to backup the main branch?", ok: 'Yes'
                        def timestamp = new Date().format('yyyy-MM-dd_HH-mm-ss')
                        def backupBranch = "backup_${branch}_${timestamp}" // More concise string interpolation
                        input {
                            parameters: {
                                string(name: "av", defaultValue: "Master")
                            }
                        }
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
                        def environment = input message: 'Select environment to deploy to:', parameters: [
                            choice(name: 'ENV', choices: ['dev', 'qa', 'staging'], description: 'Environment')
                        ]
                        echo "Deploying to ${environment}"
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
