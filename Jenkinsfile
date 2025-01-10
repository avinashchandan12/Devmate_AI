pipeline {
    agent any
    stages {
        stage('Branch Cloning...') {
            steps {
                echo 'Branch Cloning...'
                def branch = 'main'
                if branch == 'main'{
                    echo 'Cloning main branch'
                    def time_stamp = new Date().format('yyyy-MM-dd_HH-mm-ss')
                    def backup_branch = 'backup_' + time_stamp

                    try{
                        sh "git checkout -b ${backup_branch}"
                        sh "git push origin ${backup_branch}"
                        echo "Main branch backed up to: ${backup_branch}"
                    } catch (err) {
                        echo "Error: ${err}"
                        currentBuild.result = 'Unstable'
                    }
                    finally{
                        echo 'Restoring main branch'
                        sh "git checkout ${branch}"
                    }
                }
                else{
                    echo 'No branch found, Skipping Checkout'
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
