pipeline {
  agent any

  environment {
    CI = true
  }

  stages {
    // stage pertama
    stage ('Install Dependencies react project'){
      steps{
        echo "Start install dependencies react project"
        sh "npm install"
      }
    }

  }
}